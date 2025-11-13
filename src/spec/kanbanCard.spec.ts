import { it, expect, describe } from "vitest";
import Kanban from "../Kanban";
import KanbanCard from "../KanbanCard";
import Button from "../Button";
import Field from "../Field";

const XML_VIEW_KANBAN = `<?xml version="1.0"?>
<kanban string="Tasks" column_field="state" drag="1">
  <field name="name"/>
  <field name="user_id" widget="avatar"/>
  <field name="state"/>
  <button name="do_open" type="object" string="Start" states="draft"/>
  <button name="do_done" type="object" string="Complete" states="open,pending"/>
  <button name="action_always" type="object" string="Always Visible"/>
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
};

describe("A KanbanCard", () => {
  it("should parse and create a Container", () => {
    const kanbanDef = new Kanban(FIELDS);
    kanbanDef.parse(XML_VIEW_KANBAN);

    const record = {
      id: 1,
      name: "Test Task",
      user_id: [1, "John Doe"],
      state: "draft",
    };

    const container = new KanbanCard(kanbanDef).parse(record);

    expect(container).toBeDefined();
    expect(container.rows).toBeDefined();
    expect(container.rows.length).toBeGreaterThan(0);
  });

  it("should show button when record state matches button states", () => {
    const kanbanDef = new Kanban(FIELDS);
    kanbanDef.parse(XML_VIEW_KANBAN);

    const record = {
      id: 1,
      name: "Test Task",
      state: "draft", // Matches states="draft" in do_open button
    };

    const container = new KanbanCard(kanbanDef).parse(record);

    // Find all buttons in the container
    const buttons = container.rows.flat().filter((w) => w instanceof Button);

    // Find the "do_open" button
    const doOpenButton = buttons.find((b) => b.id === "do_open");
    expect(doOpenButton).toBeDefined();
    expect(doOpenButton!.invisible).toBe(false);
  });

  it("should hide button when record state doesn't match button states", () => {
    const kanbanDef = new Kanban(FIELDS);
    kanbanDef.parse(XML_VIEW_KANBAN);

    const record = {
      id: 1,
      name: "Test Task",
      state: "open", // Does NOT match states="draft" in do_open button
    };

    const container = new KanbanCard(kanbanDef).parse(record);

    // Find all buttons in the container
    const buttons = container.rows.flat().filter((w) => w instanceof Button);

    // Find the "do_open" button
    const doOpenButton = buttons.find((b) => b.id === "do_open");
    expect(doOpenButton).toBeDefined();
    expect(doOpenButton!.invisible).toBe(true);
  });

  it("should always show button without states attribute", () => {
    const kanbanDef = new Kanban(FIELDS);
    kanbanDef.parse(XML_VIEW_KANBAN);

    const record = {
      id: 1,
      name: "Test Task",
      state: "done", // Any state
    };

    const container = new KanbanCard(kanbanDef).parse(record);

    // Find all buttons in the container
    const buttons = container.rows.flat().filter((w) => w instanceof Button);

    // Find the "action_always" button (has no states attribute)
    const alwaysButton = buttons.find((b) => b.id === "action_always");
    expect(alwaysButton).toBeDefined();
    expect(alwaysButton!.invisible).toBe(false);
  });

  it("should show button when state matches one of multiple comma-separated states", () => {
    const kanbanDef = new Kanban(FIELDS);
    kanbanDef.parse(XML_VIEW_KANBAN);

    const record = {
      id: 1,
      name: "Test Task",
      state: "pending", // Matches one of states="open,pending" in do_done button
    };

    const container = new KanbanCard(kanbanDef).parse(record);

    const buttons = container.rows.flat().filter((w) => w instanceof Button);
    const doDoneButton = buttons.find((b) => b.id === "do_done");
    expect(doDoneButton).toBeDefined();
    expect(doDoneButton!.invisible).toBe(false);
  });

  it("should add fields to container", () => {
    const kanbanDef = new Kanban(FIELDS);
    kanbanDef.parse(XML_VIEW_KANBAN);

    const record = {
      id: 1,
      name: "Test Task",
      user_id: [1, "John Doe"],
      state: "draft",
    };

    const container = new KanbanCard(kanbanDef).parse(record);

    // Find all fields in the container
    const fields = container.rows.flat().filter((w) => w instanceof Field);

    expect(fields.length).toBeGreaterThan(0);

    // Check that the name field exists
    const nameField = fields.find((f) => f.id === "name");
    expect(nameField).toBeDefined();
  });

  it("should respect readOnly option", () => {
    const kanbanDef = new Kanban(FIELDS);
    kanbanDef.parse(XML_VIEW_KANBAN);

    const record = {
      id: 1,
      name: "Test Task",
      state: "draft",
    };

    const container = new KanbanCard(kanbanDef).parse(record, {
      readOnly: true,
    });

    expect(container.readOnly).toBe(true);

    // Check that buttons inherit readOnly
    const buttons = container.rows.flat().filter((w) => w instanceof Button);
    buttons.forEach((button) => {
      expect(button.readOnly).toBe(true);
    });
  });

  it("should handle record without state field gracefully", () => {
    const kanbanDef = new Kanban(FIELDS);
    kanbanDef.parse(XML_VIEW_KANBAN);

    const record = {
      id: 1,
      name: "Test Task",
      // state field is missing
    };

    const container = new KanbanCard(kanbanDef).parse(record);

    // Should not throw error and should create container
    expect(container).toBeDefined();

    // Buttons should handle undefined state gracefully
    const buttons = container.rows.flat().filter((w) => w instanceof Button);
    expect(buttons.length).toBeGreaterThan(0);
  });
});
