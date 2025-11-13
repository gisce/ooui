import { it, expect, describe } from "vitest";
import Kanban from "../Kanban";
import Field from "../Field";
import Button from "../Button";

const XML_VIEW_KANBAN = `<?xml version="1.0"?>
<kanban string="Tasks" column_field="state" drag="1" sort="sequence" set_max_cards="1" colors="blue:state=='draft';green:state=='done'">
  <field name="name"/>
  <field name="user_id" widget="avatar"/>
  <field name="planned_hours" sum="Total hours" widget="float_time"/>
  <field name="state"/>
  <button name="do_open" type="object" string="Start" states="draft"/>
  <button name="do_done" type="object" string="Complete" states="open,pending"/>
</kanban>
`;

const XML_VIEW_KANBAN_MINIMAL = `<?xml version="1.0"?>
<kanban column_field="status">
  <field name="name"/>
</kanban>
`;

const XML_VIEW_KANBAN_NO_DRAG = `<?xml version="1.0"?>
<kanban column_field="state" drag="0">
  <field name="name"/>
  <field name="priority"/>
</kanban>
`;

const FIELDS = {
  name: {
    required: true,
    size: 128,
    string: "Task Summary",
    type: "char",
    views: {},
  },
  user_id: {
    context: "",
    domain: [],
    relation: "res.users",
    size: 64,
    string: "Assigned to",
    type: "many2one",
    views: {},
    widget: "avatar",
  },
  planned_hours: {
    help: "Estimated time to complete the task",
    string: "Planned Hours",
    type: "float",
    views: {},
    widget: "float_time",
  },
  state: {
    required: true,
    readonly: true,
    selection: [
      ["draft", "Draft"],
      ["open", "In Progress"],
      ["pending", "Pending"],
      ["cancelled", "Cancelled"],
      ["done", "Done"],
    ],
    string: "State",
    type: "selection",
    views: {},
  },
  status: {
    selection: [
      ["new", "New"],
      ["active", "Active"],
      ["completed", "Completed"],
    ],
    string: "Status",
    type: "selection",
    views: {},
  },
  priority: {
    selection: [
      ["0", "Low"],
      ["1", "Normal"],
      ["2", "High"],
    ],
    string: "Priority",
    type: "selection",
    views: {},
  },
};

describe("A Kanban", () => {
  it("should parse xml with all attributes", () => {
    const tree = new Kanban(FIELDS);
    tree.parse(XML_VIEW_KANBAN);

    expect(tree.type).toBe("kanban");
    expect(tree.string).toBe("Tasks");
    expect(tree.column_field).toBe("state");
    expect(tree.drag).toBe(true);
    expect(tree.sort).toBe("sequence");
    expect(tree.set_max_cards).toBe(true);
    expect(tree.colors).toBe("blue:state=='draft';green:state=='done'");
  });

  it("should parse minimal kanban xml", () => {
    const tree = new Kanban(FIELDS);
    tree.parse(XML_VIEW_KANBAN_MINIMAL);

    expect(tree.type).toBe("kanban");
    expect(tree.string).toBe(null);
    expect(tree.column_field).toBe("status");
    expect(tree.drag).toBe(true); // Default value
    expect(tree.sort).toBeUndefined(); // No sort field specified
    expect(tree.set_max_cards).toBe(false); // Default value
  });

  it("should parse drag as false", () => {
    const tree = new Kanban(FIELDS);
    tree.parse(XML_VIEW_KANBAN_NO_DRAG);

    expect(tree.drag).toBe(false);
    expect(tree.sort).toBeUndefined();
  });

  it("should fallback to 'state' when column_field is missing", () => {
    const tree = new Kanban(FIELDS);
    const xmlWithoutColumnField = `<?xml version="1.0"?>
<kanban string="Tasks">
  <field name="name"/>
</kanban>
`;

    tree.parse(xmlWithoutColumnField);
    expect(tree.column_field).toBe("state");
  });

  it("should parse fields correctly", () => {
    const tree = new Kanban(FIELDS);
    tree.parse(XML_VIEW_KANBAN);

    expect(tree.card_fields).toHaveLength(4);
    expect(tree.card_fields[0].id).toBe("name");
    expect(tree.card_fields[1].id).toBe("user_id");
    expect(tree.card_fields[2].id).toBe("planned_hours");
    expect(tree.card_fields[3].id).toBe("state");
  });

  it("should parse field with sum aggregation", () => {
    const tree = new Kanban(FIELDS);
    tree.parse(XML_VIEW_KANBAN);

    const hoursField = tree.card_fields.find((f) => f.id === "planned_hours");
    expect(hoursField).toBeDefined();
    expect((hoursField as any).sum).toBe("Total hours");

    expect(tree.aggregations).toHaveProperty("planned_hours");
    expect(tree.aggregations.planned_hours).toBe("Total hours");
  });

  it("should preserve field widget attribute", () => {
    const tree = new Kanban(FIELDS);
    tree.parse(XML_VIEW_KANBAN);

    const avatarField = tree.card_fields.find((f) => f.id === "user_id");
    expect(avatarField).toBeDefined();
    expect((avatarField as any).raw_props?.widget).toBe("avatar");

    const hoursField = tree.card_fields.find((f) => f.id === "planned_hours");
    expect(hoursField).toBeDefined();
    expect((hoursField as any).raw_props?.widget).toBe("float_time");
  });

  it("should parse buttons correctly", () => {
    const tree = new Kanban(FIELDS);
    tree.parse(XML_VIEW_KANBAN);

    expect(tree.buttons).toHaveLength(2);

    const startButton = tree.buttons[0];
    expect(startButton.id).toBe("do_open");
    expect(startButton.buttonType).toBe("object");
    expect(startButton.caption).toBe("Start");
    expect((startButton as any).states).toBe("draft");

    const completeButton = tree.buttons[1];
    expect(completeButton.id).toBe("do_done");
    expect(completeButton.buttonType).toBe("object");
    expect(completeButton.caption).toBe("Complete");
    expect((completeButton as any).states).toBe("open,pending");
  });

  it("should handle button without states attribute", () => {
    const xmlWithButton = `<?xml version="1.0"?>
<kanban column_field="state">
  <field name="name"/>
  <button name="action_test" type="object" string="Test"/>
</kanban>
`;
    const tree = new Kanban(FIELDS);
    tree.parse(xmlWithButton);

    expect(tree.buttons).toHaveLength(1);
    const button = tree.buttons[0];
    expect(button.id).toBe("action_test");
    expect((button as any).states).toBeUndefined();
  });

  it("should merge field attributes correctly", () => {
    const tree = new Kanban(FIELDS);
    tree.parse(XML_VIEW_KANBAN);

    const nameField = tree.card_fields.find((f) => f.id === "name");
    expect(nameField).toBeDefined();
    expect(nameField?.type).toBe("char");
    expect((nameField as any).required).toBe(true);
    expect((nameField as any).size).toBe(128);
  });

  it("should handle context for fields", () => {
    const xmlWithContext = `<?xml version="1.0"?>
<kanban column_field="state">
  <field name="user_id" context="{'show_all': True}"/>
</kanban>
`;
    const tree = new Kanban(FIELDS);
    tree.parse(xmlWithContext);

    expect(tree.contextForFields).toHaveProperty("user_id");
    expect(tree.contextForFields.user_id).toBeDefined();
  });

  it("should throw error for non-existent field", () => {
    const xmlWithInvalidField = `<?xml version="1.0"?>
<kanban column_field="state">
  <field name="nonexistent_field"/>
</kanban>
`;
    const tree = new Kanban(FIELDS);

    expect(() => tree.parse(xmlWithInvalidField)).toThrow(
      "Field nonexistent_field doesn't exist in fields definition",
    );
  });

  it("should find field by id", () => {
    const tree = new Kanban(FIELDS);
    tree.parse(XML_VIEW_KANBAN);

    const nameField = tree.findById("name");
    expect(nameField).toBeDefined();
    expect(nameField?.id).toBe("name");
  });

  it("should find button by id", () => {
    const tree = new Kanban(FIELDS);
    tree.parse(XML_VIEW_KANBAN);

    const button = tree.findById("do_open");
    expect(button).toBeDefined();
    expect(button?.id).toBe("do_open");
  });

  it("should return null for non-existent id", () => {
    const tree = new Kanban(FIELDS);
    tree.parse(XML_VIEW_KANBAN);

    const result = tree.findById("nonexistent");
    expect(result).toBeNull();
  });

  it("should handle empty kanban (only column_field)", () => {
    const emptyXml = `<?xml version="1.0"?>
<kanban column_field="state"></kanban>
`;
    const tree = new Kanban(FIELDS);
    tree.parse(emptyXml);

    expect(tree.card_fields).toHaveLength(0);
    expect(tree.buttons).toHaveLength(0);
    expect(tree.column_field).toBe("state");
  });

  it("should handle HTML entities in string attribute", () => {
    const xmlWithEntities = `<?xml version="1.0"?>
<kanban string="Tasks &amp; Projects" column_field="state">
  <field name="name"/>
</kanban>
`;
    const tree = new Kanban(FIELDS);
    tree.parse(xmlWithEntities);

    expect(tree.string).toBe("Tasks & Projects");
  });

  it("should handle HTML entities in colors attribute", () => {
    const xmlWithEntities = `<?xml version="1.0"?>
<kanban column_field="state" colors="red:priority&gt;1;blue:priority&lt;1">
  <field name="name"/>
  <field name="priority"/>
</kanban>
`;
    const tree = new Kanban(FIELDS);
    tree.parse(xmlWithEntities);

    expect(tree.colors).toBe("red:priority>1;blue:priority<1");
  });

  it("should skip invisible fields", () => {
    const xmlWithInvisible = `<?xml version="1.0"?>
<kanban column_field="state">
  <field name="name"/>
  <field name="priority" invisible="1"/>
</kanban>
`;
    const tree = new Kanban(FIELDS);
    tree.parse(xmlWithInvisible);

    expect(tree.card_fields).toHaveLength(1);
    expect(tree.card_fields[0].id).toBe("name");
  });

  it("should handle buttons without name (skip them)", () => {
    const xmlWithUnnamedButton = `<?xml version="1.0"?>
<kanban column_field="state">
  <field name="name"/>
  <button type="object" string="Test"/>
</kanban>
`;
    const tree = new Kanban(FIELDS);
    tree.parse(xmlWithUnnamedButton);

    expect(tree.buttons).toHaveLength(0);
  });

  it("should handle fields without name (skip them)", () => {
    const xmlWithUnnamedField = `<?xml version="1.0"?>
<kanban column_field="state">
  <field name="name"/>
  <field widget="custom"/>
</kanban>
`;
    const tree = new Kanban(FIELDS);
    tree.parse(xmlWithUnnamedField);

    expect(tree.card_fields).toHaveLength(1);
    expect(tree.card_fields[0].id).toBe("name");
  });

  it("should store multiple aggregations", () => {
    const xmlWithMultipleAggs = `<?xml version="1.0"?>
<kanban column_field="state">
  <field name="planned_hours" sum="Total Planned"/>
  <field name="priority" sum="Total Priority"/>
</kanban>
`;
    const tree = new Kanban(FIELDS);
    tree.parse(xmlWithMultipleAggs);

    expect(Object.keys(tree.aggregations)).toHaveLength(2);
    expect(tree.aggregations.planned_hours).toBe("Total Planned");
    expect(tree.aggregations.priority).toBe("Total Priority");
  });

  it("should parse on_change_column attribute with simple method name", () => {
    const xmlWithOnChange = `<?xml version="1.0"?>
<kanban column_field="state" on_change_column="handle_state_change">
  <field name="name"/>
</kanban>
`;
    const tree = new Kanban(FIELDS);
    tree.parse(xmlWithOnChange);

    expect(tree.on_change_column).toBeDefined();
    expect(tree.on_change_column?.method).toBe("handle_state_change");
    expect(tree.on_change_column?.args).toHaveLength(0);
  });

  it("should parse on_change_column attribute with method and arguments", () => {
    const xmlWithOnChangeArgs = `<?xml version="1.0"?>
<kanban column_field="state" on_change_column="handle_column_change(field, from_column, to_column, context)">
  <field name="name"/>
</kanban>
`;
    const tree = new Kanban(FIELDS);
    tree.parse(xmlWithOnChangeArgs);

    expect(tree.on_change_column).toBeDefined();
    expect(tree.on_change_column?.method).toBe("handle_column_change");
    expect(tree.on_change_column?.args).toHaveLength(4);
    expect(tree.on_change_column?.args[0]).toBe("field");
    expect(tree.on_change_column?.args[1]).toBe("from_column");
    expect(tree.on_change_column?.args[2]).toBe("to_column");
    expect(tree.on_change_column?.args[3]).toBe("context");
  });

  it("should return null for on_change_column when not defined", () => {
    const tree = new Kanban(FIELDS);
    tree.parse(XML_VIEW_KANBAN_MINIMAL);

    expect(tree.on_change_column).toBeNull();
  });
});
