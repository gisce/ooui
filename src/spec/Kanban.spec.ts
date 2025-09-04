import Kanban from "../Kanban";
import Group from "../Group";
import Notebook from "../Notebook";
import Page from "../Page";
import Char from "../Char";
import Email from "../Email";
import Label from "../Label";
import Field from "../Field";
import Reference from "../Reference";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import { it, expect, describe } from "vitest";
import One2many from "../One2many";

const XML_VIEW_KANBAN = `<?xml version="1.0"?>
<kanban string="Partner Kanban" default_group_by="stage_id" quick_create="true">
    <field name="id"/>
    <field name="name"/>
    <field name="email" widget="email"/>
    <field name="stage_id"/>
    <field name="priority"/>
    <templates>
        <t name="kanban-box">
            <div class="oe_kanban_card">
                <div class="oe_kanban_content">
                    <div class="oe_kanban_title">
                        <field name="name"/>
                    </div>
                    <div class="oe_kanban_details">
                        <field name="email" widget="email"/>
                    </div>
                </div>
            </div>
        </t>
    </templates>
</kanban>
`;

const SIMPLE_KANBAN_XML = `<?xml version="1.0"?>
<kanban string="Simple Kanban">
    <field name="name"/>
    <field name="email"/>
</kanban>
`;

const KANBAN_WITH_BUTTON = `<?xml version="1.0"?>
<kanban string="Kanban with Button">
    <field name="name"/>
    <button name="action_test" string="Test Action" type="object"/>
</kanban>
`;

const FIELDS = {
  id: {
    readonly: true,
    string: "ID",
    type: "integer",
  },
  name: {
    size: 128,
    string: "Name",
    type: "char",
    views: {},
  },
  email: {
    size: 240,
    string: "E-Mail",
    type: "char",
    views: {},
  },
  stage_id: {
    context: "",
    domain: [],
    relation: "project.task.stage",
    size: 64,
    string: "Stage",
    type: "many2one",
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
  partner_id: {
    context: "",
    domain: [],
    relation: "res.partner",
    size: 64,
    string: "Partner",
    type: "many2one",
    views: {},
  },
  description: {
    string: "Description",
    type: "text",
    views: {},
  },
};

describe("A Kanban", () => {
  it("should parse xml", () => {
    const kanban = new Kanban(FIELDS);
    kanban.parse(XML_VIEW_KANBAN);
    expect(kanban.fields).toBeDefined();
    expect(kanban.container.rows.length).toBeGreaterThan(0);
  });

  it("should return the correct type", () => {
    const kanban = new Kanban(FIELDS);
    kanban.parse(XML_VIEW_KANBAN);
    expect(kanban.type).toBe("kanban");
  });

  it("should parse kanban string title properly", () => {
    const kanban = new Kanban(FIELDS);
    kanban.parse(XML_VIEW_KANBAN);
    const kanbanTitle = kanban.string;
    expect(kanbanTitle).toBe("Partner Kanban");
  });

  it("should parse default_group_by attribute", () => {
    const kanban = new Kanban(FIELDS);
    kanban.parse(XML_VIEW_KANBAN);
    expect(kanban.defaultGroupBy).toBe("stage_id");
  });

  it("should parse quick_create attribute as true by default", () => {
    const kanban = new Kanban(FIELDS);
    kanban.parse(SIMPLE_KANBAN_XML);
    expect(kanban.quickCreate).toBe(true);
  });

  it("should parse quick_create attribute when explicitly set", () => {
    const kanban = new Kanban(FIELDS);
    kanban.parse(XML_VIEW_KANBAN);
    expect(kanban.quickCreate).toBe(true);
  });

  it("should parse quick_create as false when set to false", () => {
    const xmlWithQuickCreateFalse = `<?xml version="1.0"?>
<kanban string="Kanban" quick_create="false">
    <field name="name"/>
</kanban>`;
    const kanban = new Kanban(FIELDS);
    kanban.parse(xmlWithQuickCreateFalse);
    expect(kanban.quickCreate).toBe(false);
  });

  it("should parse templates", () => {
    const kanban = new Kanban(FIELDS);
    kanban.parse(XML_VIEW_KANBAN);
    expect(kanban.templates).toBeDefined();
    expect(kanban.templates["kanban-box"]).toBeDefined();
  });

  it("should be able to find a widget by id", () => {
    const kanban = new Kanban(FIELDS);
    kanban.parse(SIMPLE_KANBAN_XML);
    expect(kanban.findById("name")).toBeInstanceOf(Char);
  });

  it("should return the type when the widget is defined", () => {
    const kanban = new Kanban(FIELDS);
    kanban.parse(XML_VIEW_KANBAN);
    const emailField = kanban.findById("email") as Field;
    expect(emailField.type).toBe("email");
    expect(emailField).toBeInstanceOf(Email);
    expect(emailField.fieldType).toBe("char");
  });

  it("should return null when a widget is not found by id", () => {
    const kanban = new Kanban(FIELDS);
    kanban.parse(SIMPLE_KANBAN_XML);
    expect(kanban.findById("non_existent_widget")).toBeNull();
  });

  it("should parse kanban string title as null if we don't pass it", () => {
    const xmlWithoutTitle = `<?xml version="1.0"?>
<kanban>
    <field name="name"/>
</kanban>`;
    const kanban = new Kanban(FIELDS);
    kanban.parse(xmlWithoutTitle);
    const kanbanTitle = kanban.string;
    expect(kanbanTitle).toBeNull();
  });

  it("should parse a readonly kanban with its children set to readonly too", () => {
    const kanban = new Kanban(FIELDS);
    kanban.parse(SIMPLE_KANBAN_XML, { readOnly: true });
    const field1 = kanban.findById("name")!;
    expect(field1.readOnly).toBeTruthy();
    const field2 = kanban.findById("email")!;
    expect(field2.readOnly).toBeTruthy();
  });

  it("should be able to parse a button", () => {
    const kanban = new Kanban(FIELDS);
    kanban.parse(KANBAN_WITH_BUTTON);
    const button = kanban.findById("action_test") as Button;
    expect(button).toBeInstanceOf(Button);
    expect(button.buttonType).toBe("object");
  });

  it("should properly parse a field with invisible parameter", () => {
    const arch = '<kanban><field name="name" invisible="1"/></kanban>';
    const fields = {
      name: {
        type: "char",
      },
    };
    const kanban = new Kanban(fields);
    kanban.parse(arch);
    const widget = kanban.findById("name");
    expect(widget).toBeTruthy();
    expect(widget!.invisible).toBeTruthy();
  });

  it("should properly parse invisible parameter to false by default", () => {
    const arch = '<kanban><field name="name"/></kanban>';
    const fields = {
      name: {
        type: "char",
      },
    };
    const kanban = new Kanban(fields);
    kanban.parse(arch);
    const widget = kanban.findById("name");
    expect(widget).toBeTruthy();
    expect(widget!.invisible).toBeFalsy();
  });

  it("Must throw an error if a field isn't present in field definitions", () => {
    const parseInvalidKanban = () => {
      const arch = '<kanban><field name="example" /></kanban>';
      const fields = {};
      const kanban = new Kanban(fields);
      kanban.parse(arch);
    };

    expect(parseInvalidKanban).toThrow(
      "Field example doesn't exist in fields defintion",
    );
  });

  it("should be able to parse a kanban with context", () => {
    const fields = {
      field_char: {
        type: "char",
      },
      field_id: {
        type: "integer",
      },
      button: {
        type: "button",
      },
      tarifa: {
        type: "many2one",
      },
      potencia: {
        type: "float",
      },
    };
    const xmlViewKanban = `<?xml version="1.0"?>
    <kanban string="Kanban1">
      <field name="field_id" colspan="4" nolabel="1" context="{'cups_id': active_id}"/>
      <field name="field_char" colspan="4" nolabel="1" context="{'test_string': 'test'}"/>
      <button name="button" string="Test Action" context="{'power': potencia, 'tarifa_id': tarifa}"/>
    </kanban>`;
    const kanban = new Kanban(fields);
    kanban.parse(xmlViewKanban, {
      values: {
        id: 99,
        potencia: 45,
        tarifa: [1, "2.0A"],
      },
    });
    expect(kanban.context).toBeDefined();
    expect(kanban.context.active_id).toBe(99);
    expect(Array.isArray(kanban.context.active_ids)).toBeTruthy();
    expect(kanban.context.active_ids[0]).toBe(99);

    const button = kanban.findById("button") as Button;
    expect(button.context).toBeDefined();
    expect(button.context!["tarifa_id"]).toBe(1);
    expect(button.context!["power"]).toBe(45);
  });

  it("should be able to parse a kanban with on_change field", () => {
    const fields = {
      field_char: {
        type: "char",
      },
      field_other: {
        type: "many2one",
      },
      partner_address_id: {
        type: "many2one",
      },
    };
    const xmlViewKanban = `<?xml version="1.0"?>
    <kanban string="Kanban1">
      <field name="field_char" on_change="on_change_partner_address_id(partner_address_id, 'foo', context)" />
      <field name="field_other" on_change="product_id_change(parent.pricelist_id,product_id,product_uom_qty)" />
    </kanban>`;
    const kanban = new Kanban(fields);
    kanban.parse(xmlViewKanban, {
      values: {
        partner_address_id: 29,
      },
    });

    const field = kanban.findById("field_char") as Field;
    expect(field).toBeDefined();

    expect(kanban.onChangeFields).toBeDefined();
    expect(kanban.onChangeFields!["field_char"].method).toBe(
      "on_change_partner_address_id",
    );
    expect(kanban.onChangeFields!["field_char"].args).toBeDefined();
    expect(kanban.onChangeFields!["field_char"].args[0]).toBe(
      "partner_address_id",
    );
    expect(kanban.onChangeFields!["field_char"].args[1]).toBe("'foo'");
    expect(kanban.onChangeFields!["field_char"].args[2]).toBe("context");

    const fieldOther = kanban.findById("field_other") as Field;
    expect(fieldOther).toBeDefined();

    expect(kanban.onChangeFields!["field_other"].method).toBe(
      "product_id_change",
    );
    expect(kanban.onChangeFields!["field_other"].args[0]).toBe(
      "parent.pricelist_id",
    );
  });

  it("should be able to parse domain for the kanban", () => {
    const fields = {
      field_char: {
        type: "char",
      },
      field_id: {
        type: "integer",
        domain: "[('field_id', '=', active_id)]",
      },
      tarifa: {
        type: "many2one",
      },
    };
    const xmlViewKanban = `<?xml version="1.0"?>
    <kanban string="Kanban1">
      <field name="field_id" colspan="4" nolabel="1" />
      <field name="field_char" colspan="4" nolabel="1" domain="[('bar', '=', tarifa)]"/>
      <field name="tarifa" colspan="4" nolabel="1" />
    </kanban>`;
    const kanban = new Kanban(fields);
    kanban.parse(xmlViewKanban, {
      values: {
        field_char: "test",
        field_id: 45,
        tarifa: [1, "2.0A"],
        active_id: 43,
      },
    });

    const field_id = kanban.findById("field_id");
    const field_char = kanban.findById("field_char");

    expect(field_id!.domain!).toBe("[('field_id', '=', active_id)]");
    expect(field_char!.domain!).toBe("[('bar', '=', tarifa)]");
  });

  it("should be able to get all the context for all fields of a Kanban", () => {
    const fields = {
      name: {
        type: "char",
        context: "{'active_test': false}",
      },
      email: {
        type: "char",
      },
    };
    const xmlViewKanban = `<?xml version="1.0"?>
    <kanban>
      <field name="name"/>
      <field name="email"/>
    </kanban>`;
    const kanban = new Kanban(fields);
    kanban.parse(xmlViewKanban);
    expect(kanban.contextForFields).toBeDefined();
    expect(Object.keys(kanban.contextForFields).length).toBeGreaterThan(0);
    expect(kanban.contextForFields.name).toBeDefined();
    expect(kanban.contextForFields.name).toEqual({ active_test: false });
  });

  it("should parse attributes", () => {
    const arch =
      "<kanban><group><button name=\"field1\" attrs=\"{'invisible':[('per_enviar', '=', 'postal')]}\"/><field name=\"field2\"/></group></kanban>";
    const fields = {
      field1: {
        type: "button",
      },
      field2: {
        type: "char",
      },
      per_enviar: {
        type: "char",
      },
    };
    const kanban = new Kanban(fields);
    kanban.parse(arch, { values: { per_enviar: "postal" } });
    expect(kanban.type).toBe("kanban");
    const field1 = kanban.findById("field1")!;
    expect(field1.invisible).toBeTruthy();
  });

  it("should be able to parse states - unmet condition with previous value", () => {
    const arch = '<kanban><group><field name="data_final" /></group></kanban>';
    const values = { state: "random_state" };
    const fields = {
      data_final: {
        readonly: true,
        states: {
          draft: [["readonly", false]],
        },
        string: "Final Date",
        type: "date",
        views: {},
      },
    };
    const kanban = new Kanban(fields);
    kanban.parse(arch, { values });
    expect(kanban.type).toBe("kanban");
    const field1 = kanban.findById("data_final")!;
    expect(field1.readOnly).toBeTruthy();
  });

  it("should be able to parse states - matched condition", () => {
    const arch = '<kanban><group><field name="data_final" /></group></kanban>';
    const values = { state: "draft" };
    const fields = {
      data_final: {
        readonly: true,
        states: {
          draft: [["readonly", false]],
        },
        string: "Final Date",
        type: "date",
        views: {},
      },
    };
    const kanban = new Kanban(fields);
    kanban.parse(arch, { values });
    expect(kanban.type).toBe("kanban");
    const field1 = kanban.findById("data_final")!;
    expect(field1.readOnly).toBeFalsy();
  });

  it("should be able to parse a field with inline label string attribute", () => {
    const fields = {
      char1: {
        size: 128,
        string: "Name",
        type: "char",
        help: "tooltip string",
      },
    };
    const xmlViewKanban = `<?xml version="1.0"?>
    <kanban string="Kanban1">
        <group name="group">
            <field colspan="1" name="char1" string="Label override" />
        </group>
    </kanban>`;
    const kanban = new Kanban(fields);
    kanban.parse(xmlViewKanban);

    const field = kanban.findById("char1") as Char;
    expect(field.label).toBe("Label override");
  });

  it("should be able to parse a Reference widget", () => {
    const fields = {
      ref: {
        selection: [
          ["product.product", "Product"],
          ["purchase.order", "Purchase Order"],
          ["account.invoice", "Invoice"],
        ],
        size: 128,
        string: "Reference",
        type: "reference",
        views: {},
      },
    };
    const xmlViewKanban = `<?xml version="1.0"?>
    <kanban string="Kanban1">
        <group name="group">
            <field colspan="1" name="ref" />
        </group>
    </kanban>`;
    const kanban = new Kanban(fields);
    kanban.parse(xmlViewKanban);

    const field = kanban.findById("ref") as Reference;
    expect(field.selectionValues.size).toBe(3);
  });

  it("a field with autorefresh evaluated in attrs should be present in kanban autorefreshable fields property", () => {
    const fields = {
      field_char: {
        string: "Stage",
        type: "char",
      },
      state: {
        readonly: true,
        required: true,
        selection: [
          ["draft", "Draft"],
          ["running", "Running"],
          ["done", "Done"],
        ],
        string: "State",
        type: "selection",
        views: {},
      },
    };

    const xmlViewKanban = `<?xml version="1.0"?>
    <kanban string="Kanban1">
      <field name="field_char" colspan="4" nolabel="1" attrs="{'autorefresh':[('state', '=', 'running')]}" />
    </kanban>`;

    const kanban = new Kanban(fields);
    kanban.parse(xmlViewKanban, {
      values: {
        field_char: "test",
        state: "running",
      },
    });

    const field_char = kanban.findById("field_char") as Field;
    expect(field_char).toBeDefined();
    expect(field_char?.autoRefresh).toBeTruthy();
    expect(kanban.autorefreshableFields.length).toBe(1);
    expect(kanban.autorefreshableFields[0]).toBe("field_char");
  });

  it("a domain defined in the xml should have priority over the domain defined in the fields", () => {
    const fields = {
      field_char: {
        type: "char",
        domain: "[('value', '=', 'field')]",
      },
    };
    const xmlViewKanban = `<?xml version="1.0"?>
    <kanban string="Kanban1">
      <field name="field_char" colspan="4" nolabel="1" domain="[('value', '=', 'kanban')]"/>
    </kanban>`;
    const kanban = new Kanban(fields);
    kanban.parse(xmlViewKanban, {
      values: {
        field_char: "test",
      },
    });

    const field_char = kanban.findById("field_char");
    expect(field_char!.domain!).toBe("[('value', '=', 'kanban')]");
  });

  describe("If the field has widget_props", () => {
    it("should merge widget_props from fields definition and xml", () => {
      const fields = {
        field_integer: {
          readonly: 1,
          string: "Power",
          type: "integer",
          widget_props: {
            suffix: "kW",
          },
        },
      };

      const xmlViewKanban = `<?xml version="1.0"?>
    <kanban string="Kanban1">
      <field name="field_integer" widget_props="{'prefix': 'Wow'}" />
    </kanban>`;

      const kanban = new Kanban(fields);
      kanban.parse(xmlViewKanban, {
        values: {
          field_integer: 10,
        },
      });
      const field = kanban.findById("field_integer") as Field;
      expect(field).toBeDefined();
      expect(field.suffix).toBe("kW");
      expect(field.prefix).toBe("Wow");
    });
  });
});
