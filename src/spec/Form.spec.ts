import Form from "../Form";
import Group from "../Group";
import Notebook from "../Notebook";
import Page from "../Page";
import Char from "../Char";
import Label from "../Label";
import Field from "../Field";
import Reference from "../Reference";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import { it, expect, describe } from "vitest";
import One2many from "../One2many";

const XML_VIEW_FORM = `<?xml version="1.0"?>
<form string="Partner Address">
    <notebook>
        <page string="General">
            <field colspan="4" name="partner_id" select="1"/>
            <newline/>
            <field name="name" select="1" required="True"/>
            <field domain="[('domain', '=', 'contact')]" name="title"/>
            <field name="function"/>
            <field name="type" select="2"/>
            <separator string="Street" colspan="4"/>
            <field name="street" select="2" colspan="4" width="200" context="{'active_test': False}"/>
            <group colspan="2" col="4">
              <field name="tv" select="2"/>
              <newline/>
              <field name="nv" colspan="4"/>
            </group>
            <group colspan="2" col="8">
                <field name="pnp"/>
                <field name="es"/>
                <field name="pt"/>
                <field name="pu"/>
                <field name="bq" colspan="1"/>
                <field name="aclarador" colspan="5"/>
            </group>
            <field name="street2"/>
            <newline/>
            <field name="zip" select="2"/>
            <field name="apartat_correus"/>
            <newline/>
            <newline/>
            <field name="id_municipi" on_change="onchange_municipi_id(id_municipi,context)"/>
            <field name="id_poblacio" domain="[('municipi_id','=',id_municipi)]"/>
            <field name="state_id" select="2"/>
            <field completion="1" name="country_id" select="1"/>
            <newline/>
            <separator string="Catastre" colspan="4"/>
            <field name="ref_catastral"/>
            <separator string="Comunication channels" colspan="4"/>
            <label string="Phone : " align="1.0"/>
            <group colspan="1" col="5">
            <field name="phone" nolabel="1" colspan="4"/>
            <button name="action_dial_phone" string="Dial" type="object"/>
            </group>
            <field name="fax"/>
                        <newline/>
                        <label string="Mobile : " align="1.0"/>
            <group colspan="1" col="5">
            <field name="mobile" nolabel="1" colspan="4"/>
            <button name="action_dial_mobile" string="Dial" type="object"/>
            </group>
            <field name="email" select="2" widget="email"/>
                    </page>
                    <page string="Notes">
                        <field name="notes" nolabel="1" colspan="4"/>
                    </page>
                </notebook>
</form>
`;

const FIELDS = {
  aclarador: {
    size: 256,
    string: "Aclarador",
    type: "char",
    views: {},
  },
  apartat_correus: {
    size: 5,
    string: "Apartat de Correus",
    type: "char",
    views: {},
  },
  bq: { size: 4, string: "Bloc", type: "char", views: {} },
  country_id: {
    context: "",
    domain: [],
    relation: "res.country",
    size: 64,
    string: "Country",
    type: "many2one",
    views: {},
  },
  email: { size: 240, string: "E-Mail", type: "char", views: {} },
  es: { size: 10, string: "Escala", type: "char", views: {} },
  fax: { size: 64, string: "Fax", type: "char", views: {} },
  function: {
    context: "",
    domain: [],
    relation: "res.partner.function",
    size: 64,
    string: "Function",
    type: "many2one",
    views: {},
  },
  id_municipi: {
    context: "",
    domain: [],
    relation: "res.municipi",
    size: 64,
    string: "Municipi",
    type: "many2one",
    views: {},
  },
  id_poblacio: {
    context: "",
    domain: [],
    relation: "res.poblacio",
    size: 64,
    string: "Població",
    type: "many2one",
    views: {},
  },
  mobile: { size: 64, string: "Mobile", type: "char", views: {} },
  name: { size: 128, string: "Contact Name", type: "char", views: {} },
  notes: { string: "Notes", type: "text", views: {} },
  nv: { size: 256, string: "Carrer", type: "char", views: {} },
  partner_id: {
    context: "",
    domain: [],
    help: "Keep empty for a private address, not related to partner.",
    relation: "res.partner",
    select: true,
    size: 64,
    string: "Partner",
    type: "many2one",
    views: {},
  },
  phone: { size: 64, string: "Phone", type: "char", views: {} },
  pnp: { size: 10, string: "Número", type: "char", views: {} },
  pt: { size: 10, string: "Planta", type: "char", views: {} },
  pu: { size: 10, string: "Porta", type: "char", views: {} },
  ref_catastral: {
    size: 20,
    string: "Ref Catastral (c)",
    type: "char",
    views: {},
  },
  state_id: {
    context: "",
    domain: "[('country_id','=',country_id)]",
    relation: "res.country.state",
    size: 64,
    string: "Fed. State",
    type: "many2one",
    views: {},
  },
  street: {
    digits: [16, 2],
    readonly: 1,
    size: 128,
    string: "Street",
    type: "char",
    views: {},
  },
  street2: { size: 128, string: "Street2", type: "char", views: {} },
  title: {
    selection: [
      ["Ms.", "Madam"],
      ["Mss", "Miss"],
      ["M.", "Sir"],
      ["", ""],
    ],
    size: 32,
    string: "Title",
    type: "selection",
    views: {},
  },
  tv: {
    context: "",
    domain: [],
    relation: "res.tipovia",
    size: 64,
    string: "Tipus Via",
    type: "many2one",
    views: {},
  },
  type: {
    help: "Used to select automatically the right address according to the context in sales and purchases documents.",
    selection: [
      ["default", "Default"],
      ["invoice", "Invoice"],
      ["delivery", "Delivery"],
      ["contact", "Contact"],
      ["other", "Other"],
      ["ov", "Oficina Virtual"],
    ],
    string: "Address Type",
    type: "selection",
    views: {},
  },
  zip: {
    change_default: true,
    size: 24,
    string: "Zip",
    type: "char",
    views: {},
  },
};

describe("A Form", () => {
  it("should parse xml", () => {
    const form = new Form(FIELDS);
    form.parse(XML_VIEW_FORM);
    //form.container.rows.forEach(row => {
    //    printRow(row, 0);
    //});
    expect(form.fields).toBeDefined();
    expect(form.container.rows.length).toBeGreaterThan(0);
  });

  it("should be able to fit a widget with greater colspan than page container columns", () => {
    const fields = {
      char1: { size: 128, string: "Name", type: "char", views: {} },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
        <notebook>
            <page string="Page1" col="8">
                <field colspan="16" name="char1" />
            </page>
            <page string="Page2">
            </page>
            <page string="Page3">
            </page>
        </notebook>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);

    const notebook = form.container.rows[0][0] as Notebook;
    expect(notebook).toBeInstanceOf(Notebook);
    const page = notebook.container.rows[0][0] as Page;
    expect(page).toBeInstanceOf(Page);
    expect(notebook.pages).toHaveLength(3);
    const labelField = page.container.rows[0][0];
    expect(labelField).toBeInstanceOf(Label);
    const charField = page.container.rows[0][1];
    expect(charField).toBeInstanceOf(Char);

    // Should match the container's col
    expect(charField.colspan + labelField.colspan).toBe(8);
  });

  it("should be able to find a widget by id", () => {
    const fields = {
      char1: { size: 128, string: "Name", type: "char", views: {} },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
        <notebook>
            <page string="Page1" col="8">
                <field colspan="8" name="char1" />
            </page>
        </notebook>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);

    expect(form.findById("char1")).toBeInstanceOf(Char);
  });

  it("should return undefined when a widget is not found by id", () => {
    const fields = {
      char1: { size: 128, string: "Name", type: "char", views: {} },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
        <notebook>
            <page string="Page1" col="8">
                <field colspan="8" name="char1" />
            </page>
        </notebook>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);

    expect(form.findById("non_existent_widget")).toBeNull();
  });

  it("should be able to find the first widget with matching id", () => {
    const fields = {
      char1: { size: 128, string: "Name", type: "char", views: {} },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
        <notebook>
            <page string="Page1" col="8">
                <field colspan="1" name="char1" />
                <field colspan="2" name="char1" />
            </page>
        </notebook>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);

    const field = form.findById("char1");
    expect(field).not.toBeNull();
    if (field) {
      expect(field).toBeInstanceOf(Char);
      expect(field.colspan).toBe(1);
    }
  });

  it("should be able to find a group widget with matching id", () => {
    const fields = {
      char1: { size: 128, string: "Name", type: "char", views: {} },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
        <group name="group">
            <field colspan="1" name="char1" />
            <field colspan="2" name="char1" />
        </group>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);

    const field = form.findById("group");
    expect(field).not.toBeNull();
    if (field) {
      expect(field).toBeInstanceOf(Group);
    }
  });

  describe("If field has a help message", () => {
    it("should be able to parse a field with tooltip", () => {
      const fields = {
        char1: {
          size: 128,
          string: "Name",
          type: "char",
          help: "tooltip string",
        },
      };
      const xmlViewForm = `<?xml version="1.0"?>
      <form string="Form1">
          <group name="group">
              <field colspan="1" name="char1" />
          </group>
      </form>`;
      const form = new Form(fields);
      form.parse(xmlViewForm);

      const field = form.findById("char1") as Char;
      expect(field).not.toBeNull();
      expect(field.tooltip).toBe("tooltip string");
      expect(field.tooltipInline).toBeFalsy();
    });
    it("should be inline if attribute help_inline is set", () => {
      const fields = {
        char1: {
          size: 128,
          string: "Name",
          type: "char",
          help: "tooltip string",
        },
      };
      const xmlViewForm = `<?xml version="1.0"?>
      <form string="Form1">
          <group name="group">
              <field colspan="1" name="char1" help_inline="1"/>
          </group>
      </form>`;
      const form = new Form(fields);
      form.parse(xmlViewForm);

      const field = form.findById("char1") as Char;
      expect(field).not.toBeNull();
      expect(field.tooltip).toBe("tooltip string");
      expect(field.tooltipInline).toBeTruthy();
    });
  });
  it("should properly parse a password field", () => {
    const arch =
      '<form><group><field name="password" password="True" readonly="0"/></group></form>';
    const fields = {
      password: {
        help: "Keep empty if you don't want the user to be able to connect on the system.",
        invisible: true,
        size: 64,
        string: "Password",
        type: "char",
        views: {},
      },
    };
    const form = new Form(fields);
    form.parse(arch);

    const field = form.findById("password") as Char;
    expect(field.isPassword).toBeTruthy();
  });

  it("should properly parse a normal char field without password flag", () => {
    const arch =
      '<form><group><field name="password" readonly="0"/></group></form>';
    const fields = {
      password: {
        help: "Keep empty if you don't want the user to be able to connect on the system.",
        invisible: true,
        size: 64,
        string: "Password",
        type: "char",
        views: {},
      },
    };
    const form = new Form(fields);
    form.parse(arch);

    const field = form.findById("password") as Char;
    expect(field.isPassword).toBeFalsy();
  });

  it("should properly parse a newline and reflect proper rows for it", () => {
    const arch =
      '<form><field name="field"/><newline /><field name="field" readonly="0"/></form>';
    const fields = {
      field: {
        type: "char",
      },
    };
    const form = new Form(fields);
    form.parse(arch);
    expect(form.container.rows.length).toBe(2);
  });

  it("should properly parse a field with invisible parameter", () => {
    const arch = '<form><field name="field" invisible="1"/></form>';
    const fields = {
      field: {
        type: "char",
      },
    };
    const form = new Form(fields);
    form.parse(arch);
    const widget = form.findById("field");
    expect(widget).toBeTruthy();
    expect(widget!.invisible).toBeTruthy();
  });

  it("should properly parse invisible parameter to false by default", () => {
    const arch = '<form><field name="field"/></form>';
    const fields = {
      field: {
        type: "char",
      },
    };
    const form = new Form(fields);
    form.parse(arch);
    const widget = form.findById("field");
    expect(widget).toBeTruthy();
    expect(widget!.invisible).toBeFalsy();
  });

  it("should add a widget that doesn't fit in a new line with label", () => {
    const arch =
      '<form><field name="field" colspan="6" /><field name="newlinefield" colspan="4" /></form>';
    const fields = {
      field: {
        type: "char",
      },
      newlinefield: {
        type: "char",
      },
    };
    const form = new Form(fields);
    form.parse(arch);
    expect(form.container.rows.length).toBe(2);
    expect(form.container.rows[0].length).toBe(2);
    expect(form.container.rows[1].length).toBe(2);
  });

  it("should add a label with tooltip for a field with tooltip", () => {
    const arch = '<form><field name="field" help="Tooltip" /></form>';
    const fields = {
      field: {
        type: "char",
      },
    };
    const form = new Form(fields);
    form.parse(arch);
    expect(form.container.rows[0].length).toBe(2);
    const row = form.container.rows[0];
    const label = row[0] as Label;
    const char = row[1] as Char;
    expect(label.tooltip).toBe(char.tooltip);
  });

  it("Must throw an error if a field isn't present in field definitions", () => {
    const parseInvalidForm = () => {
      const arch = '<form><field name="example" help="Tooltip" /></form>';
      const fields = {};
      const form = new Form(fields);
      form.parse(arch);
    };

    expect(parseInvalidForm).toThrow(
      "Field example doesn't exist in fields defintion",
    );
  });

  it("Should parse form string title properly", () => {
    const fields = {
      char1: { size: 128, string: "Name", type: "char", views: {} },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
        <notebook>
            <page string="Page1" col="8">
                <field colspan="8" name="char1" />
            </page>
        </notebook>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);

    const formTitle = form.string;
    expect(formTitle).toBe("Form1");
  });

  it("Should parse form string title as null if we don't pass it", () => {
    const arch =
      '<form><field name="field"/><newline /><field name="field" readonly="0"/></form>';
    const fields = {
      field: {
        type: "char",
      },
    };
    const form = new Form(fields);
    form.parse(arch);
    const formTitle = form.string;
    expect(formTitle).toBeNull();
  });

  it("Should parse a readonly group with its children set to readonly too", () => {
    const arch =
      '<form><group readonly="1"><field name="field1"/><newline /><field name="field2" readonly="0"/></group></form>';
    const fields = {
      field1: {
        type: "char",
      },
      field2: {
        type: "char",
      },
    };
    const form = new Form(fields);
    form.parse(arch);
    const field1 = form.findById("field1")!;
    expect(field1.readOnly).toBeTruthy();
    const field2 = form.findById("field2")!;
    expect(field2.readOnly).toBeTruthy();
  });

  it("Should parse a readonly form with its children set to readonly too", () => {
    const arch =
      '<form><group><field name="field1"/><newline /><field name="field2" readonly="0"/></group></form>';
    const fields = {
      field1: {
        type: "char",
      },
      field2: {
        type: "char",
      },
    };
    const form = new Form(fields);
    form.parse(arch, { readOnly: true });
    const field1 = form.findById("field1")!;
    expect(field1.readOnly).toBeTruthy();
    const field2 = form.findById("field2")!;
    expect(field2.readOnly).toBeTruthy();
  });

  it("Should be able to retrieve type from From instance", () => {
    const arch =
      '<form><group><field name="field1"/><newline /><field name="field2" readonly="0"/></group></form>';
    const fields = {
      field1: {
        type: "char",
      },
      field2: {
        type: "char",
      },
    };
    const form = new Form(fields);
    form.parse(arch);
    expect(form.type).toBe("form");
  });

  it("Should be able to parse attributes", () => {
    const arch =
      "<form><group><button name=\"field1\" attrs=\"{'invisible':[('per_enviar', '=', 'postal')]}\"/><newline /><field name=\"field2\" readonly=\"0\"/></group></form>";
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
    const form = new Form(fields);
    form.parse(arch, { values: { per_enviar: "postal" } });
    expect(form.type).toBe("form");
    const field1 = form.findById("field1")!;
    expect(field1.invisible).toBeTruthy();
  });

  it("Should be able to parse states - unmet condition with previous value", () => {
    const arch = '<form><group><field name="data_final" /></group></form>';
    const values = { state: "random_state" };
    const fields = {
      data_final: {
        readonly: true,
        states: {
          draft: [["readonly", false]],
        },
        string: "Data final",
        type: "date",
        views: {},
      },
    };
    const form = new Form(fields);
    form.parse(arch, { values });
    expect(form.type).toBe("form");
    const field1 = form.findById("data_final")!;
    expect(field1.readOnly).toBeTruthy();
  });

  it("Should be able to parse states - matched condition", () => {
    const arch = '<form><group><field name="data_final" /></group></form>';
    const values = { state: "draft" };
    const fields = {
      data_final: {
        readonly: true,
        states: {
          draft: [["readonly", false]],
        },
        string: "Data final",
        type: "date",
        views: {},
      },
    };
    const form = new Form(fields);
    form.parse(arch, { values });
    expect(form.type).toBe("form");
    const field1 = form.findById("data_final")!;
    expect(field1.readOnly).toBeFalsy();
  });

  it("Should be able to parse a button states - unmatched condition => invisible button", () => {
    const arch =
      '<form><group><button name="button" states="draft,pending,complete" /></group></form>';
    const values = { state: "draft" };
    const fields = {
      button: {
        type: "button",
      },
    };
    const form = new Form(fields);
    form.parse(arch, { values });
    expect(form.type).toBe("form");
    const field1 = form.findById("button")!;
    expect(field1.invisible).toBeFalsy();
  });

  it("Should be able to parse a button states - matched condition => visible button", () => {
    const arch =
      '<form><button name="button" states="draft,pending,complete" /></form>';
    const values = { state: "other_state" };
    const fields = {
      button: {
        type: "button",
      },
    };
    const form = new Form(fields);
    form.parse(arch, { values });
    expect(form.type).toBe("form");
    const field1 = form.findById("button")!;
    expect(field1.invisible).toBeTruthy();
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
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
        <group name="group">
            <field colspan="1" name="char1" string="Label override" />
        </group>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);

    const field = form.findById("char1") as Char;
    expect(field.label).toBe("Label override");
  });

  it("should be able to parse a Reference widget", () => {
    const fields = {
      ref: {
        selection: [
          ["product.product", "Product"],
          ["purchase.order", "Purchase Order"],
          ["account.invoice", "Invoice"],
          ["stock.production.lot", "Production Lot"],
          ["giscedata.polissa", "Pòlissa"],
          ["giscegas.polissa", "Contrato"],
          ["giscedata.signatura.process", "Firma"],
          ["giscedata.crm.lead", "Oferta/Oportunidad"],
          ["crm.case", "Case"],
          ["giscedata.switching", "Caso ATR"],
        ],
        size: 128,
        string: "Reference",
        type: "reference",
        views: {},
      },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
        <group name="group">
            <field colspan="1" name="ref" />
        </group>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);

    const field = form.findById("ref") as Reference;
    expect(field.selectionValues.size).toBe(10);
  });

  it("should be able to parse a Button with the specific action attributes", () => {
    const fields = {
      button: {
        type: "button",
      },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
      <button name="button" string="Generar periodes" type="object" confirm="Text modal" />
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);

    const field = form.findById("button") as Button;
    expect(field.confirmMessage).toBe("Text modal");
    expect(field.buttonType).toBe("object");
  });

  describe("A ButtonGroup", () => {
    it("should be able to parse a ButtonGroup", () => {
      const fields = {};
      const xmlViewForm = `<?xml version="1.0"?>
      <form string="Form1">
        <buttonGroup name="aButtonGroup" default="main">
          <button name="main" type="object" string="Main action" />
          <button name="secondary" type="object" string="Secondary action" />
        </buttonGroup>
      </form>`;
      const form = new Form(fields);
      form.parse(xmlViewForm);

      const buttonGroup = form.container.rows[0][0] as ButtonGroup;
      expect(buttonGroup).toBeInstanceOf(ButtonGroup);
      expect(buttonGroup.buttons).toHaveLength(2);
      buttonGroup.buttons.forEach((button) => {
        expect(button).toBeInstanceOf(Button);
      });
    });
    it("should be able to parse a ButtonGroup with colspan", () => {
      const fields = {};
      const xmlViewForm = `<?xml version="1.0"?>
      <form string="Form1">
        <buttonGroup name="aButtonGroup" default="main">
          <button name="main" type="object" string="Main action" colspan="4" />
          <button name="secondary" type="object" string="Secondary action" />
        </buttonGroup>
      </form>`;
      const form = new Form(fields);
      form.parse(xmlViewForm);

      const buttonGroup = form.container.rows[0][0] as ButtonGroup;
      expect(buttonGroup).toBeInstanceOf(ButtonGroup);
      expect(buttonGroup.buttons).toHaveLength(2);
      buttonGroup.buttons.forEach((button) => {
        expect(button).toBeInstanceOf(Button);
      });
      expect(buttonGroup.colspan).toBe(4);
    });
  });

  it("should be able to parse a Button by default to type workflow", () => {
    const fields = {
      button: {
        type: "button",
      },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
      <button name="button" string="Generar periodes" confirm="Text modal" />
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);

    const field = form.findById("button") as Button;
    expect(field.confirmMessage).toBe("Text modal");
    expect(field.buttonType).toBe("workflow");
  });

  it("should be able to parse a Button with special cancel case", () => {
    const fields = {
      button: {
        type: "button",
      },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
      <button name="button" string="Generar periodes" special="cancel" />
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);

    const field = form.findById("button") as Button;
    expect(field.buttonType).toBe("cancel");
  });

  it("should be able to parse a Button with context", () => {
    const fields = {
      button: {
        type: "button",
      },
      potencia: {
        type: "float",
      },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
      <button name="button" string="Generar periodes" special="cancel" context="{'power': potencia, 'tarifa_id': tarifa, 'tensio_id': tensio_normalitzada, 'model': 'giscedata.polissa', 'field': 'potencia'}"/>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm, {
      values: {
        potencia: 45,
      },
    });

    const field = form.findById("button") as Button;
    expect(field.context).toBeDefined();
    expect(field.context!["power"]).toBe(45);
  });

  it("should be able to parse a Button with context with a many2one value", () => {
    const fields = {
      button: {
        type: "button",
      },
      tarifa: {
        type: "many2one",
      },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
      <button name="button" string="Generar periodes" special="cancel" context="{'power': potencia, 'tarifa_id': tarifa, 'tensio_id': tensio_normalitzada, 'model': 'giscedata.polissa', 'field': 'potencia'}"/>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm, {
      values: {
        potencia: 45,
        tarifa: [1, "2.0A"],
      },
    });

    const field = form.findById("button") as Button;
    expect(field.context).toBeDefined();
    expect(field.context!["tarifa_id"]).toBe(1);
  });

  it("should be able to parse a Form with fields contexts", () => {
    const fields = {
      field_char: {
        type: "char",
      },
      field_id: {
        type: "integer",
      },
      field_num: {
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
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
      <field name="field_id" colspan="4" nolabel="1" context="{'cups_id': active_id}"/>
      <field name="field_char" colspan="4" nolabel="1" context="{'test_string': 'test'}"/>
      <button name="button" string="Generar periodes" special="cancel" context="{'power': potencia, 'tarifa_id': tarifa, 'tensio_id': tensio_normalitzada, 'model': 'giscedata.polissa', 'field': 'potencia'}"/>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm, {
      values: {
        id: 99,
        potencia: 45,
        tarifa: [1, "2.0A"],
      },
    });
    expect(form.context).toBeDefined();
    expect(form.context.active_id).toBe(99);
    expect(Array.isArray(form.context.active_ids)).toBeTruthy();
    expect(form.context.active_ids[0]).toBe(99);

    const field = form.findById("button") as Button;
    expect(field.context).toBeDefined();
    expect(field.context!["tarifa_id"]).toBe(1);
    expect(field.context!["power"]).toBe(45);
  });

  it("should be able to parse a on_change field", () => {
    const fields = {
      field_char: {
        type: "char",
      },
      field_id: {
        type: "integer",
      },
      field_num: {
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
      field_other: {
        type: "many2one",
      },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
      <field name="field_id" colspan="4" nolabel="1" />
      <field name="field_char" on_change="on_change_partner_address_id(partner_address_id, 'foo', context)" colspan="4" nolabel="1"  />
      <field name="field_other" on_change="product_id_change(parent.pricelist_id,product_id,product_uom_qty,product_uom,product_uos_qty,product_uos,name,parent.partner_id, 'lang' in context and context['lang'], False, parent.date_order, product_packaging, parent.fiscal_position, True)" />
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm, {
      values: {
        partner_address_id: 29,
      },
    });

    const field = form.findById("field_char") as Field;
    expect(field).toBeDefined();

    expect(form.onChangeFields).toBeDefined();
    expect(form.onChangeFields!["field_char"].method).toBe(
      "on_change_partner_address_id",
    );
    expect(form.onChangeFields!["field_char"].args).toBeDefined();
    expect(form.onChangeFields!["field_char"].args[0]).toBe(
      "partner_address_id",
    );
    expect(form.onChangeFields!["field_char"].args[1]).toBe("'foo'");
    expect(form.onChangeFields!["field_char"].args[2]).toBe("context");

    const fieldOther = form.findById("field_other") as Field;
    expect(fieldOther).toBeDefined();

    expect(form.onChangeFields!["field_other"].method).toBe(
      "product_id_change",
    );
    expect(form.onChangeFields!["field_other"].args[0]).toBe(
      "parent.pricelist_id",
    );
    expect(form.onChangeFields!["field_other"].args[8]).toBe(
      "'lang' in context and context['lang']",
    );
  });

  it("should be able to parse domain for the whole form", () => {
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
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1" domain="[('x', '=', 'y')]">
      <field name="field_id" colspan="4" nolabel="1" />
      <field name="field_char" colspan="4" nolabel="1" domain="[('bar', '=', tarifa)]"/>
      <field name="tarifa" colspan="4" nolabel="1" />
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm, {
      values: {
        field_char: "test",
        field_id: 45,
        tarifa: [1, "2.0A"],
        active_id: 43,
      },
    });

    const field_id = form.findById("field_id");
    const field_char = form.findById("field_char");

    expect(field_id!.domain!).toBe("[('field_id', '=', active_id)]");
    expect(field_char!.domain!).toBe("[('bar', '=', tarifa)]");
  });

  it("should be able to parse a notebook", () => {
    const fields = {
      ac_state: {
        digits: [16, 2],
        readonly: 1,
        size: 30,
        string: "Estado del AC",
        type: "char",
        views: {},
      },
      active: {
        readonly: true,
        required: true,
        string: "Activa",
        type: "boolean",
        views: {},
      },
      agree_dh: {
        digits: [16, 2],
        readonly: 1,
        size: 2,
        string: "Código DH",
        type: "char",
        views: {},
      },
      agree_tarifa: {
        digits: [16, 2],
        readonly: 1,
        size: 2,
        string: "Código Tarifa",
        type: "char",
        views: {},
      },
      agree_tensio: {
        digits: [16, 2],
        readonly: 1,
        size: 2,
        string: "Código Tensión",
        type: "char",
        views: {},
      },
      agree_tipus: {
        digits: [16, 2],
        readonly: 1,
        size: 2,
        string: "Tipo Punto",
        type: "char",
        views: {},
      },
      altre_p: {
        context: "",
        domain: [],
        readonly: true,
        relation: "res.partner",
        size: 40,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Contacto alternativo",
        type: "many2one",
        views: {},
      },
      article_560: {
        readonly: true,
        selection: [
          ["sin", "Sin exención o reducción"],
          ["94.1", "Exento artículo 94.1 LIE"],
          ["94.2", "Exento artículo 94.2 LIE"],
          ["94.3", "Exento artículo 94.3 LIE"],
          ["94.4", "Exento artículo 94.4 LIE"],
          ["94.5", "Exento artículo 94.5 LIE"],
          ["94.6", "Exento artículo 94.6 LIE"],
          ["94.7", "Exento artículo 94.7 LIE"],
          ["94.8", "Exento artículo 94.8 LIE"],
          ["94.9", "Exento artículo 94.9 LIE"],
          ["98.1A", "Con reducción artículo 98.1a) LIE"],
          ["98.1B", "Con reducción artículo 98.1b) LIE"],
          ["98.1C", "Con reducción artículo 98.1c) LIE"],
          ["98.1D", "Con reducción artículo 98.1d) LIE"],
          ["98.1E", "Con reducción artículo 98.1e) LIE"],
          ["98.1F", "Con reducción artículo 98.1f) LIE"],
          ["98.2", "Con reducción artículo 98.2 LIE"],
          ["98.3", "Con reducción artículo 98.3 LIE"],
        ],
        size: 10,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Artículo CIE",
        type: "selection",
        views: {},
      },
      autoconsum_id: {
        context: "",
        digits: [16, 2],
        domain: [],
        readonly: 1,
        relation: "giscedata.autoconsum",
        string: "Autoconsumo",
        type: "many2one",
        views: {},
      },
      autoconsumo: {
        help: "Tipo de autoconsumo del contrato según RD. 900/2015",
        readonly: true,
        selection: [
          ["00", "[00] - Sin Autoconsumo"],
          ["01", "[01] - Autoconsumo Tipo 1"],
          [
            "2A",
            "[2A] - Autoconsumo tipo 2 (según el Art. 13. 2. a) RD 900/2015)",
          ],
          [
            "2B",
            "[2B] - Autoconsumo tipo 2 (según el Art. 13. 2. b) RD 900/2015)",
          ],
          [
            "2G",
            "[2G] - Servicios auxiliares de generación ligada a un autoconsumo tipo 2",
          ],
          ["31", "[31] - Sin Excedentes Individual – Consumo"],
          ["32", "[32] - Sin Excedentes Colectivo – Consumo"],
          [
            "33",
            "[33] - Sin Excedentes Colectivo con acuerdo de compensación – Consumo",
          ],
          ["41", "[41] - Con excedentes y compensación Individual - Consumo"],
          ["42", "[42] - Con excedentes y compensación Colectivo– Consumo"],
          [
            "43",
            "[43] - Con excedentes y compensación Colectivo a través de red– Consumo",
          ],
          [
            "51",
            "[51] - Con excedentes sin compensación Individual sin cto de SSAA en Red Interior– Consumo",
          ],
          [
            "52",
            "[52] - Con excedentes sin compensación Colectivo sin cto de SSAA en Red Interior– Consumo",
          ],
          [
            "53",
            "[53] - Con excedentes sin compensación Individual con cto SSAA en Red Interior– Consumo",
          ],
          [
            "54",
            "[54] - Con excedentes sin compensación individual con cto SSAA en Red Interior– SSAA",
          ],
          [
            "55",
            "[55] - Con excedentes sin compensación Colectivo/en Red Interior– Consumo",
          ],
          [
            "56",
            "[56] - Con excedentes sin compensación Colectivo/en Red Interior - SSAA",
          ],
          [
            "57",
            "[57] - Con excedentes sin compensación Colectivo sin cto de SSAA (despreciable) en red interior – Consumo",
          ],
          [
            "58",
            "[58] - Con excedentes sin compensación Colectivo sin cto de SSAA a través de red - Consumo",
          ],
          [
            "61",
            "[61] - Con excedentes sin compensación Individual con cto SSAA a través de red – Consumo",
          ],
          [
            "62",
            "[62] - Con excedentes sin compensación individual con cto SSAA a través de red – SSAA",
          ],
          [
            "63",
            "[63] - Con excedentes sin compensación Colectivo a través de red – Consumo",
          ],
          [
            "64",
            "[64] - Con excedentes sin compensación Colectivo a través de red - SSAA",
          ],
          [
            "71",
            "[71] - Con excedentes sin compensación Individual con cto SSAA a través de red y red interior – Consumo",
          ],
          [
            "72",
            "[72] - Con excedentes sin compensación individual con cto SSAA a través de red y red interior – SSAA",
          ],
          [
            "73",
            "[73] - Con excedentes sin compensación Colectivo con cto de SSAA  a través de red y red interior – Consumo",
          ],
          [
            "74",
            "[74] - Con excedentes sin compensación Colectivo con cto de SSAA a través de red y red interior - SSAA",
          ],
        ],
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Autoconsumo",
        type: "selection",
        views: {},
      },
      bank: {
        context: "",
        domain: [],
        readonly: true,
        relation: "res.partner.bank",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Cuenta bancaria",
        type: "many2one",
        views: {},
      },
      bono_social_disponible: {
        digits: [16, 2],
        readonly: 1,
        string: "Bono social disponible",
        type: "boolean",
        views: {},
      },
      butlletins: {
        context: "",
        digits: [16, 2],
        domain: [],
        relation: "giscedata.butlleti",
        string: "Boletines",
        type: "one2many",
        views: {},
      },
      category_id: {
        context: "",
        domain: [],
        relation: "giscedata.polissa.category",
        select: true,
        string: "Categorías",
        type: "many2many",
        views: {},
      },
      cie: {
        readonly: true,
        size: 30,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "CIE",
        type: "char",
        views: {},
      },
      cnae: {
        context: "",
        domain: [],
        readonly: true,
        relation: "giscemisc.cnae",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "CNAE",
        type: "many2one",
        views: {},
      },
      coef_repartiment: {
        digits: [12, 2],
        readonly: true,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Coeficiente de reparto [%]",
        type: "float",
        views: {},
      },
      coef_repercusio_gas: {
        digits: [5, 2],
        string: "Coef. repercussió ajust gas",
        type: "float",
        views: {},
      },
      coeficient_d: {
        digits: [4, 2],
        help: "Coste del desvío",
        readonly: true,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Coeficiente CDSVh €/MWh",
        type: "float",
        views: {},
      },
      coeficient_d_renovacio: {
        digits: [4, 2],
        help: "Coste de Desvíos",
        string: "Coeficiente D €/MWh Renovación",
        type: "float",
        views: {},
      },
      coeficient_k: {
        digits: [4, 2],
        help: "Coste Operativo de Comercialización",
        readonly: true,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Coeficiente CO €/MWh",
        type: "float",
        views: {},
      },
      coeficient_k_renovacio: {
        digits: [4, 2],
        help: "Coste de Operación",
        string: "Coeficiente K €/MWh Renovación",
        type: "float",
        views: {},
      },
      colaborador_ids: {
        context: "",
        digits: [16, 2],
        domain: [],
        readonly: 1,
        relation: "hr.colaborador",
        select: 2,
        string: "Col.laboradors",
        type: "one2many",
        views: {},
      },
      comercial_id: {
        context: "",
        domain: [],
        relation: "hr.employee",
        size: 64,
        string: "Comercial",
        type: "many2one",
        views: {},
      },
      comptador: {
        digits: [16, 2],
        readonly: 1,
        select: true,
        size: 64,
        string: "Contador",
        type: "char",
        views: {},
      },
      comptadors: {
        context: {
          active_test: false,
        },
        domain: [],
        inv_field: "polissa",
        relation: "giscedata.lectures.comptador",
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [["readonly", false]],
        },
        string: "Contadores",
        type: "one2many",
        views: {},
      },
      condicions_generals_id: {
        context: "",
        domain: [],
        relation: "giscedata.polissa.condicions.generals",
        size: 64,
        string: "Condiciones generales",
        type: "many2one",
        views: {},
      },
      consum_anual: {
        digits: [12, 3],
        string: "Consum anual",
        type: "float",
        views: {},
      },
      contract_type: {
        help: "Distintos tipos de contratos. Ver REAL DECRETO 1164/2001",
        readonly: true,
        selection: [
          ["01", "Anual"],
          ["02", "Eventual medido"],
          ["03", "Temporada"],
          ["05", "RECORE"],
          ["07", "Suministro de Obras"],
          ["08", "Suministro de socorro"],
          ["09", "Eventual a tanto alzado"],
          ["10", "Pruebas"],
          ["11", "Duplicado"],
          ["12", "De reserva"],
        ],
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Tipo de contrato",
        type: "selection",
        views: {},
      },
      cups: {
        context: "",
        domain: [],
        readonly: true,
        relation: "giscedata.cups.ps",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "CUPS",
        type: "many2one",
        views: {},
      },
      cups_cp: {
        digits: [16, 2],
        readonly: 1,
        string: "Código Postal",
        type: "char",
        views: {},
      },
      cups_direccio: {
        digits: [16, 2],
        readonly: true,
        size: 256,
        string: "Dirección CUPS",
        type: "char",
        views: {},
      },
      cups_poblacio: {
        digits: [16, 2],
        readonly: 1,
        string: "Población",
        type: "char",
        views: {},
      },
      data_alta: {
        readonly: true,
        states: {
          esborrany: [["readonly", false]],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Fecha Alta",
        type: "date",
        views: {},
      },
      data_baixa: {
        string: "Fecha baja",
        type: "date",
        views: {},
      },
      data_comunicada: {
        string: "Data Comunicació Renovació",
        type: "date",
        views: {},
      },
      data_firma_contracte: {
        readonly: true,
        states: {
          esborrany: [["readonly", false]],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Fecha firma contrato",
        type: "datetime",
        views: {},
      },
      data_renovacio: {
        string: "Data Pròxima Renovació de Preus",
        type: "date",
        views: {},
      },
      data_tall: {
        digits: [16, 2],
        readonly: 1,
        string: "Fecha corte prevista",
        type: "date",
        views: {},
      },
      data_ultima_lectura: {
        digits: [16, 2],
        string: "Última fecha real facturada",
        type: "date",
        views: {},
      },
      data_ultima_lectura_estimada: {
        string: "Fecha última estimada facturada",
        type: "date",
        views: {},
      },
      data_ultima_lectura_f1: {
        string: "Data última lectura cargada de F1",
        type: "date",
        views: {},
      },
      debt_amount: {
        digits: [16, 2],
        readonly: 1,
        string: "Cantidad de deuda",
        type: "float",
        views: {},
      },
      deposit: {
        digits: [16, 2],
        readonly: 1,
        string: "Depósito",
        type: "float",
        views: {},
      },
      direccio_notificacio: {
        context: "",
        domain: [],
        readonly: true,
        relation: "res.partner.address",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Dirección notificación",
        type: "many2one",
        views: {},
      },
      direccio_pagament: {
        context: "",
        domain: [],
        readonly: true,
        relation: "res.partner.address",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Dirección fiscal",
        type: "many2one",
        views: {},
      },
      distribuidora: {
        context: "",
        domain: [
          ["supplier", "=", 1],
          ["energy_sector", "in", ["electric", "elegas"]],
        ],
        readonly: true,
        relation: "res.partner",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Distribuidora",
        type: "many2one",
        views: {},
      },
      enviament: {
        readonly: true,
        selection: [
          ["postal", "Correo postal"],
          ["email", "E-mail"],
          ["postal+email", "Correo postal y e-mail"],
        ],
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [["readonly", false]],
        },
        string: "Enviar factura vía",
        type: "selection",
        views: {},
      },
      expected_consumption: {
        help: "Este campo calcula el consumo total pactado para contratos eventuales sin contador",
        readonly: true,
        string: "Consumo pactado",
        type: "float",
        views: {},
      },
      facturacio: {
        readonly: true,
        selection: [
          [1, "Mensual"],
          [2, "Bimestral"],
        ],
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Facturación",
        type: "selection",
        views: {},
      },
      facturacio_distri: {
        help: "Periodicidad de facturación de distribuidora",
        readonly: true,
        selection: [
          [1, "Mensual"],
          [2, "Bimestral"],
        ],
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Facturación de distribuidora",
        type: "selection",
        views: {},
      },
      facturacio_potencia: {
        readonly: true,
        selection: [
          ["max", "Maxímetro"],
          ["icp", "ICP"],
          ["recarrec", "Recargo NO_ICP"],
        ],
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Facturación Potencia",
        type: "selection",
        views: {},
      },
      facturacio_suspesa: {
        string: "Facturación Suspendida",
        type: "boolean",
        views: {},
      },
      facturae_filereference: {
        help: "Referencia expediente para indicar dentro del XML",
        readonly: true,
        size: 20,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Referencia expediente facturae ",
        type: "char",
        views: {},
      },
      firmat: {
        digits: [16, 2],
        readonly: 1,
        string: "Contrato Firmado",
        type: "boolean",
        views: {},
      },
      fiscal_position_id: {
        context: "",
        domain: [],
        readonly: true,
        relation: "account.fiscal.position",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Posición fiscal",
        type: "many2one",
        views: {},
      },
      is_autoconsum_collectiu: {
        digits: [16, 2],
        readonly: 1,
        string: "Es colectivo",
        type: "boolean",
        views: {},
      },
      lectura_en_baja: {
        readonly: true,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [["readonly", false]],
        },
        string: "Lectura en baja",
        type: "boolean",
        views: {},
      },
      llista_preu: {
        context: "",
        domain: [["type", "=", "sale"]],
        readonly: true,
        relation: "product.pricelist",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Tarifa Comercializadora",
        type: "many2one",
        views: {},
      },
      log_ids: {
        context: "",
        domain: [],
        inv_field: "polissa_id",
        readonly: true,
        relation: "giscedata.polissa.log",
        string: "Histórico",
        type: "one2many",
        views: {},
      },
      lot_facturacio: {
        context: "",
        domain: [],
        relation: "giscedata.facturacio.lot",
        size: 64,
        string: "Lote de facturación",
        type: "many2one",
        views: {},
      },
      modcontractual_activa: {
        context: "",
        domain: [],
        readonly: true,
        relation: "giscedata.polissa.modcontractual",
        size: 64,
        string: "Modificación contractual actual",
        type: "many2one",
        views: {},
      },
      modcontractuals_ids: {
        context: {
          active_test: false,
        },
        domain: [],
        inv_field: "polissa_id",
        readonly: true,
        relation: "giscedata.polissa.modcontractual",
        string: "Modificaciones contractuales",
        type: "one2many",
        views: {},
      },
      mode_facturacio: {
        readonly: true,
        selection: [
          ["atr", "ATR"],
          ["index", "Indexada"],
          ["tplana", "Tarifa Plana"],
        ],
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Mode facturación",
        type: "selection",
        views: {},
      },
      mode_facturacio_generacio: {
        readonly: true,
        selection: [
          ["atr", "ATR"],
          ["index", "Indexada"],
          ["tplana", "Tarifa Plana"],
        ],
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Modo facturación generación (autoconsumo)",
        type: "selection",
        views: {},
      },
      motiu_560: {
        readonly: true,
        selection: [
          ["sin", "Sin exención o reducción"],
          ["R", "Comunicada por el beneficiario"],
          ["D", "Comunicada por el operador del mercado"],
        ],
        size: 10,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Motivo CIE",
        type: "selection",
        views: {},
      },
      multipunt_id: {
        context: "",
        domain: [],
        relation: "giscedata.polissa.multipunt",
        select: 1,
        size: 64,
        string: "Multipunto",
        type: "many2one",
        views: {},
      },
      name: {
        readonly: true,
        select: true,
        size: 60,
        states: {
          esborrany: [["readonly", false]],
        },
        string: "Contrato",
        type: "char",
        views: {},
      },
      name_auto: {
        string: "Auto",
        type: "boolean",
        views: {},
      },
      next_pricelist_id: {
        context: "",
        domain: [],
        relation: "product.pricelist",
        size: 64,
        string: "Preus de renovació",
        type: "many2one",
        views: {},
      },
      no_cessio_sips: {
        help: "Nota: si el campo está activo significa que el cliente ha firmado la no cesión de los datos personales por motivos de privacidad en todos los contratos acogidos. Esta condición aplica a los SIPS u otros procesos como el P0.",
        readonly: true,
        selection: [
          ["unactive", "Desactivado"],
          ["requested", "Solicitado"],
          ["active", "Activado"],
        ],
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "No cesión de SIPS",
        type: "selection",
        views: {},
      },
      no_cessio_sips_data: {
        readonly: true,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Fecha solicitud",
        type: "date",
        views: {},
      },
      no_penalitzar: {
        string: "No aplicar penalización por baja anticipada",
        type: "boolean",
        views: {},
      },
      nocutoff: {
        context: "",
        domain: [],
        readonly: true,
        relation: "giscedata.polissa.nocutoff",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Suministro no cortable",
        type: "many2one",
        views: {},
      },
      notificacio: {
        readonly: true,
        selection: [
          ["titular", "Titular"],
          ["pagador", "Fiscal"],
          ["altre_p", "Otra"],
        ],
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Persona notificación",
        type: "selection",
        views: {},
      },
      notificacio_email: {
        digits: [16, 2],
        readonly: 1,
        size: 240,
        string: "Email dir. notif.",
        type: "char",
        views: {},
      },
      observacio_suspesa: {
        size: 170,
        string: "Observaciones f. suspendida",
        type: "char",
        views: {},
      },
      observacions: {
        string: "Observaciones",
        type: "text",
        views: {},
      },
      ordre_carta: {
        select: true,
        size: 60,
        string: "Orden carta",
        type: "char",
        views: {},
      },
      pagador: {
        context: "",
        domain: [],
        readonly: true,
        relation: "res.partner",
        select: true,
        size: 40,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Razón fiscal",
        type: "many2one",
        views: {},
      },
      pagador_email: {
        digits: [16, 2],
        readonly: 1,
        size: 240,
        string: "Email dir. fiscal",
        type: "char",
        views: {},
      },
      pagador_nif: {
        digits: [16, 2],
        readonly: true,
        string: "NIF fiscal",
        type: "char",
        views: {},
      },
      pagador_sel: {
        readonly: true,
        selection: [
          ["titular", "Titular"],
          ["altre_p", "Otro"],
        ],
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Persona fiscal",
        type: "selection",
        views: {},
      },
      payment_mode_id: {
        context: "",
        domain: [],
        readonly: true,
        relation: "payment.mode",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Grupo de pago",
        type: "many2one",
        views: {},
      },
      payment_term: {
        context: "",
        domain: [],
        readonly: true,
        relation: "account.payment.term",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", false],
          ],
          validar: [
            ["readonly", false],
            ["required", false],
          ],
        },
        string: "Plazo de pago",
        type: "many2one",
        views: {},
      },
      peatge_directe: {
        readonly: true,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [["readonly", false]],
        },
        string: "Peaje directo",
        type: "boolean",
        views: {},
      },
      pending_amount: {
        digits: [16, 2],
        readonly: 1,
        string: "Cantidad pendiente",
        type: "float",
        views: {},
      },
      pending_state: {
        digits: [16, 2],
        readonly: 1,
        size: 64,
        string: "Estado pendiente",
        type: "char",
        views: {},
      },
      percentatge_560: {
        digits: [5, 2],
        readonly: true,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Percentage sobre el 85%",
        type: "float",
        views: {},
      },
      persona_fisica: {
        digits: [16, 2],
        size: 2,
        string: "desconocido",
        type: "char",
        views: {},
      },
      potencia: {
        digits: [16, 3],
        readonly: true,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Potencia contratada (kW)",
        type: "float",
        views: {},
      },
      potencies_percentatge_a_descomptar: {
        string: "Potències percentatge a descomptar [0-100(%)]: ",
        type: "integer",
        views: {},
      },
      potencies_periode: {
        context: "",
        domain: [],
        inv_field: "polissa_id",
        readonly: true,
        relation: "giscedata.polissa.potencia.contractada.periode",
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Potencias contratadas per periodo",
        type: "one2many",
        views: {
          form: {
            arch: '<form string="Potencia">\n                                        <field name="periode_id" readonly="1"/>\n                                        <field name="potencia"/><field name="potencia_a_facturar"/>\n                \n                                    </form>\n                                ',
            fields: {
              periode_id: {
                context: "",
                domain: [],
                readonly: true,
                relation: "giscedata.polissa.tarifa.periodes",
                required: true,
                size: 64,
                string: "Periodo",
                type: "many2one",
                views: {},
              },
              potencia: {
                digits: [15, 3],
                required: true,
                string: "Potencia contratada",
                type: "float",
                views: {},
              },
              potencia_a_facturar: {
                digits: [15, 3],
                string: "Potències per període a facturar",
                type: "float",
                views: {},
              },
            },
          },
          tree: {
            arch: '<tree string="Potencias">\n                                        <field name="periode_id"/>\n                                        <field name="potencia"/><field name="potencia_a_facturar"/>\n                \n                                    </tree>\n                                    ',
            fields: {
              periode_id: {
                context: "",
                domain: [],
                readonly: true,
                relation: "giscedata.polissa.tarifa.periodes",
                required: true,
                size: 64,
                string: "Periodo",
                type: "many2one",
                views: {},
              },
              potencia: {
                digits: [15, 3],
                required: true,
                string: "Potencia contratada",
                type: "float",
                views: {},
              },
              potencia_a_facturar: {
                digits: [15, 3],
                string: "Potències per període a facturar",
                type: "float",
                views: {},
              },
            },
          },
        },
      },
      print_observations: {
        string: "Observaciones impresas",
        type: "text",
        views: {},
      },
      process_id: {
        context: "",
        digits: [16, 2],
        domain: [],
        readonly: true,
        relation: "account.invoice.pending.state.process",
        required: true,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Proceso de corte",
        type: "many2one",
        views: {},
      },
      property_unitat_potencia: {
        context: "",
        digits: [16, 2],
        domain: "[('category_id.name', '=', 'POT ELEC')]",
        help: "Con que unidad se quiere facturar la potencia",
        readonly: true,
        relation: "product.uom",
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Unidad de facturación potencia",
        type: "many2one",
        views: {},
      },
      propietari_bank: {
        digits: [16, 2],
        readonly: true,
        size: 128,
        string: "Propietario de la cuenta bancaria",
        type: "char",
        views: {},
      },
      quantitat_compensable: {
        digits: [16, 2],
        help: "Cantidad compensable del cliente calculada a partir de los movimientos hechos a la cuenta de compensación.",
        readonly: 1,
        string: "Cantidad Compensable",
        type: "float",
        views: {},
      },
      quota_mensual: {
        digits: [8, 2],
        help: "Quota mensual a facturar. Quan es tria el mode de facturacio tarifa plana s'aplica un descompte del 100% a totes les linies de energia de la factura i es recalcula el preu de la energia per facturar com a total la quota definida.",
        readonly: true,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Quota Mensual Tarifa Plana",
        type: "float",
        views: {},
      },
      ref_dist: {
        size: 60,
        string: "Referencia distribuidora",
        type: "char",
        views: {},
      },
      refacturacio_pendent: {
        string: "Refacturación Pendiente",
        type: "boolean",
        views: {},
      },
      related_attachments: {
        context: "",
        digits: [16, 2],
        domain: [],
        readonly: 1,
        relation: "ir.attachment",
        string: "Adjuntos relacionados",
        type: "one2many",
        views: {},
      },
      renovacio_auto: {
        string: "Renovación Automática",
        type: "boolean",
        views: {},
      },
      serveis: {
        context: "",
        domain: [],
        inv_field: "polissa_id",
        relation: "giscedata.facturacio.services",
        string: "Servicios Contratados",
        type: "one2many",
        views: {},
      },
      state: {
        readonly: true,
        required: true,
        selection: [
          ["esborrany", "Borrador"],
          ["validar", "Validar"],
          ["pendent", "Pendiente"],
          ["activa", "Activa"],
          ["cancelada", "Cancelada"],
          ["contracte", "Activación Contrato"],
          ["novapolissa", "Creación nuevo contrato"],
          ["modcontractual", "Modificación Contractual"],
          ["impagament", "Impago"],
          ["tall", "Corte"],
          ["baixa", "Baja"],
          ["facturacio", "Facturación"],
        ],
        string: "Estado",
        type: "selection",
        views: {},
      },
      tarifa: {
        context: "",
        domain: [],
        readonly: true,
        relation: "giscedata.polissa.tarifa",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Tarifa de acceso",
        type: "many2one",
        views: {},
      },
      tarifa_codi: {
        digits: [16, 2],
        string: "Código Tarifa",
        type: "char",
        views: {},
      },
      tarifa_plana_mes_natural: {
        help: "Si es marca aquesta opcio, al facturar un contracte quan es carreguen lectures del pool es crea (si no existeix) una lectura sempre a mes natural per facturar un periode estandard sempre. La lectura es crea fent una estimacio a partir de P5Ds.",
        string: "Facturar tarifa plana a mes natural",
        type: "boolean",
        views: {},
      },
      tensio: {
        digits: [16, 2],
        readonly: 1,
        string: "Tensión (v)",
        type: "integer",
        views: {},
      },
      tensio_normalitzada: {
        context: "",
        domain: [],
        readonly: true,
        relation: "giscedata.tensions.tensio",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Tensión normalizada",
        type: "many2one",
        views: {},
      },
      tg: {
        help: "Telegestión operativa con o sin curva de carga (CCH)",
        readonly: true,
        selection: [
          ["1", "Operativa con CCH"],
          ["2", "No operativa"],
          ["3", "Operativa Sin CCH"],
        ],
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Telegestión",
        type: "selection",
        views: {},
      },
      tipo_medida: {
        help: "Per defecte es marca com a tipus 05 i s'actualitzarà amb la càrrega de F1s.",
        readonly: true,
        size: 2,
        string: "Tipus de Punt de Mesura",
        type: "char",
        views: {},
      },
      tipo_pago: {
        context: "",
        domain: [],
        readonly: true,
        relation: "payment.type",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Tipo de pago",
        type: "many2one",
        views: {},
      },
      tipus_vivenda: {
        readonly: true,
        selection: [
          ["habitual", "Habitual"],
          ["no_habitual", "No habitual"],
        ],
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Tipo vivienda",
        type: "selection",
        views: {},
      },
      titular: {
        context: "",
        domain: [],
        readonly: true,
        relation: "res.partner",
        size: 40,
        states: {
          esborrany: [["readonly", false]],
          validar: [
            ["readonly", false],
            ["required", true],
          ],
        },
        string: "Titular",
        type: "many2one",
        views: {},
      },
      titular_nif: {
        digits: [16, 2],
        readonly: true,
        string: "NIF titular",
        type: "char",
        views: {},
      },
      trafo: {
        readonly: true,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", true],
          ],
          validar: [["readonly", false]],
        },
        string: "Trafo kVA",
        type: "float",
        views: {},
      },
      ultima_lectura_importacion: {
        readonly: true,
        select: true,
        string: "Ultima lectura importación",
        type: "date",
        views: {},
      },
      user_id: {
        context: "",
        domain: [],
        relation: "res.users",
        size: 64,
        string: "Comercial",
        type: "many2one",
        views: {},
      },
      versio_primera_factura: {
        context: "",
        domain: [],
        help: "Establece la versión de la lista de precios que se utilizará para la primera facturación.",
        readonly: true,
        relation: "product.pricelist.version",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [
            ["readonly", false],
            ["required", false],
          ],
          validar: [
            ["readonly", false],
            ["required", false],
          ],
        },
        string: "Versión primera facturación",
        type: "many2one",
        views: {},
      },
      zona_carta_id: {
        context: "",
        domain: [],
        relation: "giscedata.polissa.carta.zona",
        size: 64,
        string: "Zona carta",
        type: "many2one",
        views: {},
      },
    };

    const xmlViewForm = `<?xml version="1.0"?>
    <form string="polizas">
    <notebook colspan="6" cols="4">
        <page string="General">
            <separator string="CUPS" colspan="4"/>
            <field name="cups" select="1" size="25"/>
            <field name="cups_direccio" colspan="4" select="1"/>
            <field name="cups_cp" invisible="1" select="2"/>
            <field name="cups_poblacio" invisible="1" select="2"/>
            <separator string="Datos técnicos" colspan="4"/>
            <group col="2" colspan="2">
                <field name="contract_type" select="2"/>
                <group colspan="2" col="4" attrs="{'invisible':[('contract_type', '!=', '09')]}">
        <field name="expected_consumption"/>
        <button string="Calcular" name="473" states="esborrany,validar,modcontractual" type="action" readonly="0"/>
    </group>
<field name="tarifa" on_change="onchange_potencia(potencia, tarifa, context)" select="1"/>
                <group colspan="2" col="4">
                    <field name="potencia" select="1" on_change="onchange_potencia(potencia, tarifa, context)"/>
                    <field name="potencies_percentatge_a_descomptar"/>
<button name="308" type="action" string="Normalizar" context="{'power': potencia, 'tarifa_id': tarifa, 'tensio_id': tensio_normalitzada, 'model': 'giscedata.polissa', 'field': 'potencia'}" states="esborrany,validar,modcontractual" readonly="0"/>
                </group>
                <field name="tensio_normalitzada" select="2" on_change="onchange_tensio(tensio_normalitzada, tarifa, context)"/>
                <field name="tarifa_codi" invisible="1"/>
    <group colspan="4" attrs="{'invisible': [('tarifa_codi','in',['2.0TD'])]}">
        <field name="lectura_en_baja" select="2"/>
        <group colspan="2" col="2" attrs="{'invisible': [('tarifa_codi', '!=', '3.1A LB'),('lectura_en_baja','=',False)]}">
            <field name="trafo"/>
        </group>
    </group>
<field name="tensio"/>
                <field name="tg" select="2"/>
                <field name="condicions_generals_id" select="2"/>
<field name="autoconsumo" select="2"/>
                <group colspan="4">
            <field name="consum_anual" string="Consum Anual (kWh):"/>
            <button icon="gtk-execute" name="calcular_consum_anual" string="Calcular consum anual" type="object" colspan="2"/>
        </group>
    <field name="nocutoff" select="2"/><field name="peatge_directe" select="2"/>

            </group>
            <group col="2" colspan="2">
                <field name="potencies_periode" colspan="4" nolabel="1">
                    </field>
                <button name="generar_periodes_potencia" states="esborrany,validar,modcontractual" string="Generar periodos" type="object" context="{'force_genpot': True}"/>
            </group>
            <group col="4" colspan="4" attrs="{'invisible':[('persona_fisica', '=', 'CI')]}">
            <separator string="Otros datos" colspan="4"/>
            </group>
            <group col="4" colspan="2" attrs="{'invisible':[('persona_fisica', '=', 'CI')]}">
                <field name="tipus_vivenda" select="1"/>
                <field name="persona_fisica" invisible="1"/>
            </group>
        <group colspan="4">
        <separator string="Categorías" colspan="4"/>
        <field name="category_id" nolabel="1" select="2" height="150"/>
    </group>
</page>
        <page string="Autoconsumo" attrs="{'invisible':[('autoconsum_id', '=', False)]}">
        <separator string="Información del autoconsumo del CUPS asociado" colspan="6"/>
        <field name="autoconsum_id" attrs="{'required':[('autoconsumo','!=','00'), ('state','in',['validar','modcontractual'])]}" on_change="onchange_autoconsum_id(autoconsum_id)"/>
        <field name="ac_state"/>
        <field name="is_autoconsum_collectiu"/>
        <group attrs="{'invisible':[('is_autoconsum_collectiu','!=', True)]}" colspan="2" name="autoconsum_colectiu_group">
            <field name="coef_repartiment" attrs="{'required':[('autoconsumo','!=','00'), ('is_autoconsum_collectiu','=',True), ('state','in',['validar','modcontractual'])]}"/>
        </group>
    </page>
<page string="Facturació"><group col="4" colspan="4">
        <separator string="Facturación de distribuidora" colspan="4"/>
        <group colspan="2">
            <field name="facturacio_distri"/>
        </group>
    </group>
<separator string="Facturació" colspan="4"/>
    <field name="facturacio" select="1"/>
    <group col="2" colspan="2" string="Lote Facturación">
        <field name="lot_facturacio" select="1"/><field name="facturacio_suspesa" colspan="2" select="2" on_change="onchange_suspesa(facturacio_suspesa)"/>
<group colspan="2" col="2" attrs="{'invisible': [('facturacio_suspesa','=',False)]}">
        <field name="observacio_suspesa" height="50" widget="text"/>
    </group>

    </group>
    <group col="2" colspan="2">
        <field name="facturacio_potencia" select="2"/>
        <field name="mode_facturacio_generacio" select="2"/>
<field name="mode_facturacio" select="2"/>
<field name="property_unitat_potencia"/>
        <field name="fiscal_position_id" select="2"/>
<field name="cie" select="2"/>
    <field name="percentatge_560" select="2"/>
    <field name="article_560" select="2"/>
    <field name="motiu_560" select="2"/>
<field name="deposit"/>
    </group>
    <group string="Datos últimas lecturas facturadas" col="2" colspan="2" rowspan="1">
        <field string="Real" name="data_ultima_lectura" select="2"/>
        <field string="De F1" name="data_ultima_lectura_f1" select="2"/>
<field name="ultima_lectura_importacion" select="2"/>
<field string="Estimada" name="data_ultima_lectura_estimada"/><field name="refacturacio_pendent"/>

    </group>
    <newline/>
    <separator string="Tarificación" colspan="4"/>
    <field name="llista_preu" select="1" domain="[('tarifes_atr_compatibles', '=', tarifa), ('en_vigor', '=', True), ('type', '=', 'sale')]"/>
<field name="next_pricelist_id" domain="[('tarifes_atr_compatibles', '=', tarifa), ('en_vigor', '=', True), ('type', '=', 'sale')]"/>
<!-- Dos dominis, la llista de preus que tingui i que la data_end sigui > now() -->
    <field name="versio_primera_factura" domain="[('pricelist_id', '=', llista_preu), '|', ('date_end', '&gt;', data_alta), ('date_end', '=', False),]"/>
    <separator string="Pago" colspan="4"/>
    <field name="payment_term" select="2"/>
    <field name="tipo_pago" on_change="onchange_tipo_pago(tipo_pago, pagador, context)" invisible="1"/>
    <field name="payment_mode_id" select="2" on_change="onchange_modo_pago(payment_mode_id, pagador, context)"/>
    <newline/>
<field name="bank" on_change="onchange_bank(propietari_bank, bank)" attrs="{'readonly': [('tipo_pago.code', '=', 'RECIBO_CSB')]}" domain="[('partner_id', '=', pagador)]" context="{'partner_id': pagador}"/>
    <field name="propietari_bank" select="2"/>
<newline/>
    <separator string="Facturae Info" colspan="4"/>
    <field name="facturae_filereference" size="20"/>
<separator string="Multipunto" colspan="4"/>
    <field name="multipunt_id" select="2"/>
</page>
</notebook>
</form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm, {
      values: {},
    });
    expect(true).toBeTruthy();
  });
  it("Parse with bad data", () => {
    const xmlViewForm = `<form string="Casos"><group>"<field name="active"/></group></form>`;
    const fields = {
      active: {
        string: "Actiu",
        type: "boolean",
        views: {},
      },
    };
    const form = new Form(fields);
    form.parse(xmlViewForm);
  });
  it("should be able to get a list of evaluated invisible fields after a parse", () => {
    const fields = {
      char1: { size: 128, string: "Name", type: "char", views: {} },
      char2: { size: 128, string: "Name", type: "char", views: {} },
      char3: { size: 128, string: "Name", type: "char", views: {} },
      char4: { size: 128, string: "Name", type: "char", views: {} },
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
    <field name="char1" invisible="1"/>
    <field name="char2"/>
    <field name="char3" invisible="1"/>
    <field name="char4"/>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);
    expect(form.invisibleFields.length).toBe(2);
    expect(form.invisibleFields[0]).toBe("char1");
    expect(form.invisibleFields[1]).toBe("char3");
  });

  it("should be able to show fields when we have a state which is a selection and invisible fields based on this field", () => {
    const fields = {
      buscar_per: {
        selection: [
          ["data", "Fecha"],
          ["lot", "Lote"],
          ["llistat_ids", "Identificadores"],
          ["active_ids", "Filtro actual"],
        ],
        string: "Filtrar facturas por",
        type: "selection",
        views: {},
      },
      data_final: {
        string: "Fecha final",
        type: "date",
        views: {},
      },
      data_inici: {
        string: "Fecha inicio",
        type: "date",
        views: {},
      },
      diari_factures: {
        selection: [
          [16, "Facturas Energía"],
          [17, "Facturas Energía (Abono)"],
          [18, "Facturas Energía (B)"],
          [19, "Facturas Energía (BRA)"],
          [20, "Facturas Energía (Rectificadoras)"],
          [36, "Facturas contratación"],
          [46, "ENERGIA.DESVIO"],
          ["all", "Todos"],
        ],
        string: "Diario",
        type: "selection",
        views: {},
      },
      download_url: {
        size: 1000,
        string: "Descarga",
        type: "char",
        views: {},
      },
      end_invoice_number: {
        size: 128,
        string: "Factura final",
        type: "char",
        views: {},
      },
      estat_factures: {
        selection: [
          ["draft", "Borrador"],
          ["open", "Abiertas"],
          ["paid", "Realitzadas"],
          ["cancel", "Canceladas"],
          ["all", "Todas"],
        ],
        string: "Estado",
        type: "selection",
        views: {},
      },
      factures_per_pdf: {
        help: "Número máximo de facturas para cada PDF. Para evitar PDFs con muchas páginas.",
        string: "Número facturas por PDF",
        type: "integer",
        views: {},
      },
      factures_per_proces: {
        help: "Número de facturas que se imprimen en un proceso en paralelo. 1 valor por defecto y recomendado.",
        string: "Número facturas por grupo (1 valor recomendado)",
        type: "integer",
        views: {},
      },
      fitxer: {
        string: "Facturas generadas",
        type: "binary",
        views: {},
      },
      force: {
        help: "Imprimir también configurados por enviamiento mail",
        string: "Forzar impresión",
        type: "boolean",
        views: {},
      },
      forzar_numero_pagines: {
        help: "Añade las páginas en blanco necesarias a cada grupo de impresión para tener el total de páginas indicado. ",
        string:
          "Forzar total de páginas por grupo (0 no añade páginas en blanco)",
        type: "integer",
        views: {},
      },
      info: {
        string: "Información",
        type: "text",
        views: {},
      },
      llistat_ids: {
        string: "Identificador de facturas",
        type: "text",
        views: {},
      },
      lot: {
        selection: [
          [39, "02/2023"],
          [38, "01/2023"],
          [36, "12/2022"],
          [35, "11/2022"],
          [34, "10/2022"],
          [33, "09/2022"],
          [32, "08/2022"],
          [31, "07/2022"],
          [30, "06/2022"],
          [29, "05/2022"],
          [28, "04/2022"],
          [27, "03/2022"],
          [26, "02/2022"],
          [25, "01/2022"],
          [24, "12/2021"],
          [23, "11/2021"],
          [22, "10/2021"],
          [21, "09/2021"],
          [20, "08/2021"],
          [19, "07/2021"],
          [18, "06/2021"],
          [17, "05/2021"],
          [16, "04/2021"],
          [15, "03/2021"],
          [14, "02/2021"],
          [13, "01/2021"],
          [12, "12/2020"],
          [11, "11/2020"],
          [10, "10/2020"],
          [9, "09/2020"],
        ],
        string: "Lote",
        type: "selection",
        views: {},
      },
      n_factures: {
        string: "Facturas a imprimir",
        type: "integer",
        views: {},
      },
      name: {
        size: 300,
        string: "Nombre",
        type: "char",
        views: {},
      },
      pagines_per_factura: {
        help: "Comprueba que cada factura tenga el número de páginas indicado. La comprovación se hace antes de añadir páginas en blanco. 0 para ignorar la validación.",
        string: "Válidar número de páginas por factura (0 no válida)",
        type: "integer",
        views: {},
      },
      progress: {
        string: "Progreso general",
        type: "float",
        views: {},
      },
      report: {
        context: "",
        domain: [["model", "=", "giscedata.facturacio.factura"]],
        relation: "ir.actions.report.xml",
        size: 64,
        string: "Informe",
        type: "many2one",
        views: {},
      },
      start_invoice_number: {
        size: 128,
        string: "Factura inicial",
        type: "char",
        views: {},
      },
      state: {
        selection: [
          ["zona", "zona"],
          ["resum", "resumen"],
          ["working", "Trabajando"],
          ["fitxer", "Fichero"],
        ],
        string: "Estado",
        type: "selection",
        views: {},
      },
      zona: {
        required: true,
        selection: [
          ["select", "Seleccionar"],
          ["all", "Todas"],
          ["sz", "Sin zona"],
        ],
        string: "Zona",
        type: "selection",
        views: {},
      },
      "zona_SIN ZONA": {
        string: "SIN ZONA",
        type: "boolean",
      },
      zone_progress: {
        string: "Progreso zona",
        type: "float",
        views: {},
      },
    };

    const xmlViewForm = `<?xml version="1.0"?>
      <form string="Imprimir facturas por zona y orden"> <field name="state" invisible="1"/> <separator colspan="4" string="Imprimir facturas con"/> <group colspan="4" col="4" attrs="{'readonly': [('state', '=', 'resum')]}"> <field name="estat_factures"/> <field name="diari_factures"/> </group> <separator colspan="4"/> <group colspan="4" col="4" attrs="{'invisible': [('state', '!=', 'zona')]}"> <notebook> <page string="General"> <group colspan="4"> <field name="buscar_per" colspan="4"/> </group> <group col="2" colspan="4" attrs="{'invisible':[('buscar_per', '!=', 'lot')]}"> <field name="lot" attrs="{'required':[('buscar_per', '=', 'lot')]}"/> </group> <group colspan="4" col="4" attrs="{'invisible': [('buscar_per', 'not in', ('data','lot'))]}"> <field name="data_inici" attrs="{'required':[('buscar_per', '=', 'data')]}"/> <field name="data_final" attrs="{'required':[('buscar_per', '=', 'data')]}"/> </group> <group colspan="2" col="4" attrs="{'invisible': [('buscar_per', '!=', 'data')]}"> <field name="start_invoice_number"/> <field name="end_invoice_number"/> </group> <group colspan="4" col="2" attrs="{'invisible': [('buscar_per', '!=', 'llistat_ids')]}"> <separator string="Listado de ids de facturas (separados por comas)" colspan="2"/> <field name="llistat_ids" attrs="{'required':[('buscar_per', '=', 'llistat_ids')]}" nolabel="1" colspan="2"/> </group> <field name="zona" colspan="4"/> <group name="select_zones" colspan="4" col="8" string="Seleccionar" attrs="{'invisible': [('zona', '!=', 'select')]}"> <field name="zona_SIN ZONA"/></group> </page> <page string="Avanzado"> <field name="report" required="1" colspan="4"/> <field name="factures_per_pdf" colspan="4"/> <field name="factures_per_proces" colspan="4"/> <field name="pagines_per_factura" colspan="4"/> <field name="forzar_numero_pagines" colspan="4"/> </page> </notebook> <separator colspan="4"/> <field name="force"/> <newline/> <button icon="gtk-go-forward" name="get_invoices" string="Continuar" type="object"/> <group colspan="4" col="2"> <label string="" colspan="4"/> <label string="" colspan="4"/> </group> </group> <group colspan="4" col="4" attrs="{'invisible': [('state', '!=', 'resum')]}"> <field name="n_factures" readonly="True"/> <newline/> <separator colspan="4"/> <newline/> <group attrs="{'invisible': [('n_factures', '=', 0)]}"> <button icon="gtk-go-back" name="go_start" string="Atr&#225;s" type="object"/> <button icon="gtk-go-forward" name="print_invoices" string="Continuar" type="object"/> </group> <group attrs="{'invisible': [('n_factures', '!=', 0)]}"> <button icon="gtk-go-back" name="go_start" string="Atr&#225;s" type="object"/> <button icon="gtk-cancel" special="cancel" string="Cancelar" type="object"/> </group> </group> <group colspan="4" col="4" attrs="{'invisible': [('state', '!=', 'working')]}"> <field name="progress" widget="progressbar" colspan="4"/> <field name="zone_progress" widget="progressbar" colspan="4"/> <button type="object" name="read" string="Actualizar" icon="gtk-refresh"/> </group> <group colspan="4" col="4" attrs="{'invisible': [('state', '!=', 'fitxer')]}"> <group colspan="4" col="4" attrs="{'invisible': [('download_url', '!=', False)]}"> <field name="name" invisible="1"/> <field name="fitxer" editable="False" readonly="true"/> </group> <group colspan="4" col="4" attrs="{'invisible': [('download_url', '=', False)]}"> <field name="download_url" colspan="4" widget="url"/> </group> </group> <group colspan="4" col="4" attrs="{'invisible': [('state', '!=', 'fitxer')]}"> <field name="info" readonly="true" height="150"/> </group> </form>`;

    const values = {
      diari_factures: "all",
      estat_factures: ["all", "Totes"],
      factures_per_pdf: 1000,
      factures_per_proces: 1,
      n_factures: 0,
      report: 1030,
      state: ["zona", "zona"],
      zona: "select",
    };
    const form = new Form(fields);
    form.parse(xmlViewForm, { values });
  });
  it("Should be able to parse attributes with required and != False (1)", () => {
    const arch = `<form>
      <field name="consum_recarrec_perc" attrs="{'required':[('consum_recarrec_prod','!=',False)]}"/>
      <field name="consum_recarrec_prod" attrs="{'required':[('consum_recarrec_perc','!=',False)]}"/>
      </form>`;
    const fields = {
      consum_recarrec_prod: {
        type: "many2one",
      },
      consum_recarrec_perc: {
        type: "float",
      },
    };
    const form = new Form(fields);
    form.parse(arch, {
      values: { consum_recarrec_prod: undefined, consum_recarrec_perc: 0 },
    });
    const field1 = form.findById("consum_recarrec_perc") as Field;
    expect(field1.required).toBeFalsy();
    const field2 = form.findById("consum_recarrec_prod") as Field;
    expect(field2.required).toBeFalsy();
  });
  it("Should be able to parse attributes with required and != False (2)", () => {
    const arch = `<form>
        <field name="consum_recarrec_perc" attrs="{'required':[('consum_recarrec_prod','!=',False)]}"/>
        <field name="consum_recarrec_prod" attrs="{'required':[('consum_recarrec_perc','!=',False)]}"/>
        </form>`;
    const fields = {
      consum_recarrec_prod: {
        type: "many2one",
      },
      consum_recarrec_perc: {
        type: "float",
      },
    };
    const form = new Form(fields);
    form.parse(arch, {
      values: { consum_recarrec_prod: [1, "Test"], consum_recarrec_perc: 0 },
    });
    const field3 = form.findById("consum_recarrec_perc") as Field;
    expect(field3.required).toBeTruthy();
    const field4 = form.findById("consum_recarrec_prod") as Field;
    expect(field4.required).toBeFalsy();
  });
  it("Should be able to parse attributes with required and != False (3)", () => {
    const arch = `<form>
        <field name="consum_recarrec_perc" attrs="{'required':[('consum_recarrec_prod','!=',False)]}"/>
        <field name="consum_recarrec_prod" attrs="{'required':[('consum_recarrec_perc','!=',False)]}"/>
        </form>`;
    const fields = {
      consum_recarrec_prod: {
        type: "many2one",
      },
      consum_recarrec_perc: {
        type: "float",
      },
    };
    const form = new Form(fields);
    form.parse(arch, {
      values: { consum_recarrec_prod: [1, "Test"], consum_recarrec_perc: null },
    });
    const field3 = form.findById("consum_recarrec_perc") as Field;
    expect(field3.required).toBeTruthy();
    const field4 = form.findById("consum_recarrec_prod") as Field;
    expect(field4.required).toBeFalsy();
  });
  it("Should be able to parse attributes with required and != False (4)", () => {
    const arch = `<form>
        <field name="consum_recarrec_perc" attrs="{'required':[('consum_recarrec_prod','!=',False)]}"/>
        <field name="consum_recarrec_prod" attrs="{'required':[('consum_recarrec_perc','!=',False)]}"/>
        </form>`;
    const fields = {
      consum_recarrec_prod: {
        type: "many2one",
      },
      consum_recarrec_perc: {
        type: "float",
      },
    };
    const form = new Form(fields);
    form.parse(arch, {
      values: {
        consum_recarrec_prod: [undefined, ""],
        consum_recarrec_perc: 0,
      },
    });
    const field3 = form.findById("consum_recarrec_perc") as Field;
    expect(field3.required).toBeFalsy();
    const field4 = form.findById("consum_recarrec_prod") as Field;
    expect(field4.required).toBeFalsy();
  });
  it("Should be able to parse readonly attributes mixed with state", () => {
    const arch = `<form>
        <field name="bank" attrs="{'readonly':[('tipo_pago.code','=','RECIBO_CSB')]}"/>
        </form>`;
    const fields = {
      bank: {
        context: "",
        domain: [],
        is_function: false,
        readonly: true,
        relation: "res.partner.bank",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Compte bancari",
        type: "many2one",
        views: {},
      },
    };
    const form = new Form(fields);
    form.parse(arch, {
      values: {
        state: "test",
        tipo_pago: [1, "Demo payment type"],
      },
    });
    const field = form.findById("bank") as Field;
    expect(field.readOnly).toBeTruthy();
  });
  it("Should be able to parse readonly attributes mixed with state - false", () => {
    const arch = `<form>
        <field name="bank" attrs="{'readonly':[('tipo_pago.code','=','RECIBO_CSB')]}"/>
        </form>`;
    const fields = {
      bank: {
        context: "",
        domain: [],
        is_function: false,
        readonly: true,
        relation: "res.partner.bank",
        size: 64,
        states: {
          esborrany: [["readonly", false]],
          modcontractual: [["readonly", false]],
          validar: [["readonly", false]],
        },
        string: "Compte bancari",
        type: "many2one",
        views: {},
      },
    };
    const form = new Form(fields);
    form.parse(arch, {
      values: {
        state: "esborrany",
      },
    });
    const field = form.findById("bank") as Field;
    expect(field.readOnly).toBeFalsy();
  });
  it("Should be able to parse domain in array format", () => {
    const arch = `<form>
        <field name="bank" />
        </form>`;
    const fields = {
      bank: {
        type: "many2one",
        domain: [["category_id.name", "=", "ALQ ELEC"]],
      },
    };
    const form = new Form(fields);
    form.parse(arch, {
      values: {},
    });
    const field = form.findById("bank") as Field;
    expect(field.domain).toBeDefined();
  });

  it("Should be able to parse domain in XML with domain as [] in fields", () => {
    const arch = `<form>
    <field name="llista_preu" domain="[('tarifes_atr_compatibles', '=', tarifa), ('type', '=', 'sale')]"/>
        </form>`;
    const fields = {
      llista_preu: {
        type: "many2one",
        domain: [],
      },
    };
    const form = new Form(fields);
    form.parse(arch, {
      values: {},
    });
    const field = form.findById("llista_preu") as Field;
    expect(field.domain).toBeDefined();
    expect(field.domain).toBe(
      "[('tarifes_atr_compatibles', '=', tarifa), ('type', '=', 'sale')]",
    );
  });
  it("Should be able to parse a specifically enabled button even though in the form is disabled", () => {
    const arch = `<form>
      <button name="example_button" string="Example" type="object" readonly="0" />
    </form>`;
    const form = new Form({});
    form.parse(arch, {
      readOnly: true,
      values: {},
    });
    const buttonWidget = form.findById("example_button") as Button;
    expect(buttonWidget.readOnly).toBeFalsy();
  });
  it("Should be able to parse a specifically enabled button even though in the form is disabled, with attrs", () => {
    const arch = `<form>
      <button name="example_button" string="Example" type="object" attrs="{'readonly':[('state','!=','actiu')]}" />
    </form>`;
    const form = new Form({
      state: {
        selection: [
          ["esborrany", "Esborrany"],
          ["actiu", "Actiu"],
          ["pendent", "Pendent d'activació"],
          ["baixa", "Baixa"],
          ["baixa2", "Baixa per modificació"],
          ["baixa3", "Baixa per renovació"],
          ["baixa4", "Baixa per nova pòlissa"],
        ],
        string: "Estat",
        type: "selection",
        views: {},
      },
    });
    form.parse(arch, {
      readOnly: true,
      values: {
        state: "actiu",
      },
    });
    const buttonWidget = form.findById("example_button") as Button;
    expect(buttonWidget.readOnly).toBeFalsy();
  });
  it("Should be able to parse a specifically enabled button even though in the form is disabled, with json_attrs", () => {
    const arch = `<form>
      <button name="example_button" string="Example" type="object" json_attrs="{'readonly': {'condition': 'AND', 'rules': [{'field': 'state', 'operator': '!=', 'value': 'actiu'}]}}" />
    </form>`;
    const form = new Form({
      state: {
        selection: [
          ["esborrany", "Esborrany"],
          ["actiu", "Actiu"],
          ["pendent", "Pendent d'activació"],
          ["baixa", "Baixa"],
          ["baixa2", "Baixa per modificació"],
          ["baixa3", "Baixa per renovació"],
          ["baixa4", "Baixa per nova pòlissa"],
        ],
        string: "Estat",
        type: "selection",
        views: {},
      },
    });
    form.parse(arch, {
      readOnly: true,
      values: {
        state: "actiu",
      },
    });
    const buttonWidget = form.findById("example_button") as Button;
    expect(buttonWidget.readOnly).toBeFalsy();
  });
  it("Should be able to set an invisible group when attrs have a field that has not value", () => {
    const arch = `<form>
    <group name="group" colspan="4" col="4" attrs="{'invisible':[('formulari','!=','b1')]}">
      <field name="at_prefix" />
      <field name="bt_prefix" />
    </group>
    </form>`;
    const form = new Form({
      formulari: {
        type: "selection",
      },
      at_prefix: { type: "char" },
      bt_prefix: { type: "char" },
    });
    form.parse(arch);
    const groupWidget = form.findById("group") as Group;
    expect(groupWidget.invisible).toBeTruthy();
  });
  it("Should be able to parse a o2m with height ", () => {
    const arch = `<form>
    <group name="group" colspan="4" col="4" attrs="{'invisible':[('formulari','!=','b1')]}">
      <field name="o2m" height="50" />
    </group>
    </form>`;
    const form = new Form({
      formulari: {
        type: "selection",
      },
      o2m: { type: "one2many" },
    });
    form.parse(arch);
    const o2mField = form.findById("o2m") as One2many;
    expect(o2mField.height).toBe(50);
  });
  it("Should be able to parse a notebook tab with readonly attrs ", () => {
    const arch = `<?xml version="1.0"?>
    <form string="Partner Address">
        <notebook name="llibreta">
            <page string="General" attrs="{'readonly': [('state', '=', 'resum')]}">
                <field colspan="4" name="partner_id" select="1"/>
            </page>
        </notebook>
    </form>`;
    const form = new Form({
      ...FIELDS,
      state: {
        readonly: true,
        required: true,
        selection: [
          ["esborrany", "Borrador"],
          ["validar", "Validar"],
          ["pendent", "Pendiente"],
          ["activa", "Activa"],
          ["cancelada", "Cancelada"],
          ["contracte", "Activación Contrato"],
          ["novapolissa", "Creación nuevo contrato"],
          ["modcontractual", "Modificación Contractual"],
          ["impagament", "Impago"],
          ["tall", "Corte"],
          ["baixa", "Baja"],
          ["facturacio", "Facturación"],
        ],
        string: "Estado",
        type: "selection",
        views: {},
      },
    });
    form.parse(arch, {
      values: {
        state: "resum",
      },
    });
    const notebook = form.container.rows[0][0] as Notebook;
    expect(notebook).toBeInstanceOf(Notebook);
    const page = notebook.container.rows[0][0] as Page;
    expect(page).toBeInstanceOf(Page);
    expect(page.readOnly).toBeTruthy();
  });
  it("Should be able to parse a notebook tab with no readonly attrs ", () => {
    const arch = `<?xml version="1.0"?>
    <form string="Partner Address">
        <notebook name="llibreta">
            <page string="General" attrs="{'readonly': [('state', '=', 'resum')]}">
                <field colspan="4" name="partner_id" select="1"/>
            </page>
        </notebook>
    </form>`;
    const form = new Form({
      ...FIELDS,
      state: {
        readonly: true,
        required: true,
        selection: [
          ["esborrany", "Borrador"],
          ["validar", "Validar"],
          ["pendent", "Pendiente"],
          ["activa", "Activa"],
          ["cancelada", "Cancelada"],
          ["contracte", "Activación Contrato"],
          ["novapolissa", "Creación nuevo contrato"],
          ["modcontractual", "Modificación Contractual"],
          ["impagament", "Impago"],
          ["tall", "Corte"],
          ["baixa", "Baja"],
          ["facturacio", "Facturación"],
        ],
        string: "Estado",
        type: "selection",
        views: {},
      },
    });
    form.parse(arch, {
      values: {
        state: "baixa",
      },
    });
    const notebook = form.container.rows[0][0] as Notebook;
    expect(notebook).toBeInstanceOf(Notebook);
    const page = notebook.container.rows[0][0] as Page;
    expect(page).toBeInstanceOf(Page);
    expect(page.readOnly).toBeFalsy();
  });
  it("Should be able to parse a notebook tab with readonly attrs inside few containers ", () => {
    const arch = `<form string="Casos">
    <group col="7" colspan="4">
        <field name="create_uid" select="2"/>
<field colspan="4" name="section_id"/>
        <field colspan="2" name="name" select="1"/><field name="polissa_id" select="1" colspan="2"/>

    </group>
    <field name="date" select="1"/>
    <field name="date_deadline" select="2"/>
    <newline/>
    <notebook colspan="2">
        <page name="notebook-parent-page" string="Oferta/Oportunitat" attrs="{'readonly':[('state', 'in', ('cancel', 'done'))]}" json_attrs="{&quot;readonly&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;in&quot;, &quot;field&quot;: &quot;state&quot;, &quot;value&quot;: [&quot;cancel&quot;, &quot;done&quot;]}], &quot;condition&quot;: &quot;AND&quot;}}">
    <notebook name="notebook-test">
        <page name="notebook-child-page" string="Sobre el Punto de Suministro">
            <group colspan="8" col="8">
                <group col="16" colspan="4" name="comer_lead">
                    <field name="comercialitzadora" colspan="16"/>
                    <field name="comer_origen" colspan="16"/>
                </group><group col="16" colspan="4" string="Proceso de Alta">
        <field name="atr_proces_name" colspan="6"/>
        <label colspan="9" string="Si se selecciona un proceso, se generara un caso ATR cuando se genere el contrato"/>
        <newline/>
        <group col="4" colspan="16" string="Configuracion">
            <field name="change_atr"/>
            <field name="change_adm"/>
        </group>
    <group colspan="16" col="16" string="Oficina Virtual">
        <field name="create_ov_user" colspan="2"/>
        <label string="Si la firma digital esta habilitada se va a crear siempre el usuario despu&#233;s de la firma independientemente de este campo" colspan="13"/>
    </group>
<field name="digital_sign" colspan="2"/>
    <group colspan="13" col="2" attrs="{'readonly': [('digital_sign', '=', False)]}" json_attrs="{&quot;readonly&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;=&quot;, &quot;field&quot;: &quot;digital_sign&quot;, &quot;value&quot;: false}], &quot;condition&quot;: &quot;AND&quot;}}">
        <field name="delivery_type" colspan="2"/>
        <field name="digital_email" colspan="4"/>
        <field name="digital_provider" colspan="2"/>
    </group>
</group>

            </group>
            <separator string="Datos del Punto de Suministro" colspan="8"/>
            <group colspan="8" col="8">
                <group string="CUPS" col="8" colspan="4">
                    <field name="cups" colspan="6" on_change="onchange_generic('cups', cups)"/>
                </group>
                <group string="Distribuidora" col="2" colspan="4">
                    <field name="codigoEmpresaDistribuidora" on_change="onchange_generic('codigoEmpresaDistribuidora', codigoEmpresaDistribuidora)" colspan="16"/>
                    <field name="nombreEmpresaDistribuidora" colspan="16"/>
                    <field name="distribuidora_vat" on_change="onchange_generic('distribuidora_vat', distribuidora_vat)" colspan="16"/>
                </group>
            </group>
            <group string="Direcci&#243;n de suministro" col="8" colspan="8">
                <field name="tipus_vivenda" colspan="16"/>
                <field name="cups_zip" colspan="2"/>
                <field name="cups_id_municipi" on_change="onchange_generic('cups_id_municipi', cups_id_municipi)"/>
                <field name="cups_id_poblacio" domain="[('municipi_id.id', '=', cups_id_municipi)]" on_change="onchange_generic('cups_id_poblacio', cups_id_poblacio)"/>
                <field name="cups_tv" colspan="1"/>
                <field name="cups_nv" colspan="6"/>
                <field name="cups_pnp"/>
                <field name="cups_bq"/>
                <field name="cups_es"/>
                <field name="cups_pt"/>
                <field name="cups_pu"/>
                <field name="cups_cpo"/>
                <field name="cups_cpa"/>
                <field name="cups_apartat_correus"/>
                <field name="cups_aclarador"/>
                <field name="cups_ref_catastral"/>
                <group colspan="8" col="8" string="Acciones">
                    <label string=" " colspan="2"/>
                    <button string="Copiar desde direccion del Titular" name="copy_address_from_titular" icon="gtk-execute" type="object" colspan="4" readonly="0"/>
                    <label string=" " colspan="2"/>
                </group>
            </group>
        </page>

        <page string="Sobre el Cliente">
            <separator string="Datos sobre el Titular" colspan="8"/>
            <group colspan="8" col="8">
                <group string="Titular" col="4" colspan="5">
                    <field name="titular_vat" on_change="onchange_generic('titular_vat', titular_vat)"/>
                    <field name="titular_es_empresa" invisible="1"/>
                    <field name="titular_nom" colspan="8"/>
                    <group attrs="{'invisible': [('titular_es_empresa', '=', True)]}" colspan="8" json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;=&quot;, &quot;field&quot;: &quot;titular_es_empresa&quot;, &quot;value&quot;: true}], &quot;condition&quot;: &quot;AND&quot;}}">
                        <field name="titular_cognom1"/>
                        <field name="titular_cognom2"/>
                    </group>
                    <group attrs="{'invisible': [('titular_es_empresa', '=', False)]}" colspan="8" name="Persona firmant" json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;=&quot;, &quot;field&quot;: &quot;titular_es_empresa&quot;, &quot;value&quot;: false}], &quot;condition&quot;: &quot;AND&quot;}}">
                        <field name="persona_firmant_vat"/>
                        <field name="persona_nom"/>
                    </group>
                </group>
                <group string="Contacto" col="8" colspan="3">
                    <field name="titular_email" colspan="8"/>
                    <newline/>
                    <field name="titular_phone" colspan="4"/>
                    <field name="titular_mobile" colspan="4"/>
                    <newline/>
                    <field name="lang"/>
                    <group colspan="8" col="8">
                        <field name="allow_contact"/>
                        <field name="contact_time_range" colspan="5"/>
                    </group>
                </group>
            </group>
            <group string="Direccion" col="8" colspan="8">
                <field name="titular_zip"/>
                <field name="titular_id_municipi" on_change="onchange_generic('titular_id_municipi', titular_id_municipi)"/>
                <field name="titular_id_poblacio" domain="[('municipi_id.id', '=', titular_id_municipi)]" on_change="onchange_generic('titular_id_poblacio', titular_id_poblacio)"/>
                <field name="titular_tv" colspan="1"/>
                <field name="titular_nv" colspan="6"/>
                <field name="titular_pnp"/>
                <field name="titular_bq"/>
                <field name="titular_es"/>
                <field name="titular_pt"/>
                <field name="titular_pu"/>
                <field name="titular_cpo"/>
                <field name="titular_cpa"/>
                <field name="titular_apartat_correus"/>
                <field name="titular_aclarador"/>
                <group colspan="8" col="8" string="Acciones">
                    <label string=" " colspan="2"/>
                    <button string="Copiar desde direccion del CUPS" name="copy_address_from_cups" icon="gtk-execute" type="object" colspan="4" readonly="0"/>
                    <label string=" " colspan="2"/>
                </group>
            </group>
            <group string="Direccion de Contacto Alternativa" col="8" colspan="8">
            <group col="8" colspan="8">
                <field name="use_cont_address" colspan="8"/>
            </group>
            <group attrs="{'invisible': [('use_cont_address', '=', False)]}" col="8" colspan="8" json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;=&quot;, &quot;field&quot;: &quot;use_cont_address&quot;, &quot;value&quot;: false}], &quot;condition&quot;: &quot;AND&quot;}}">
                <field name="cont_titular_nom" colspan="8"/>
                <field name="cont_titular_zip"/>
                <field name="cont_titular_id_municipi" on_change="onchange_generic('cont_titular_id_municipi', cont_titular_id_municipi)"/>
                <field name="cont_titular_id_poblacio" domain="[('municipi_id.id', '=', cont_titular_id_municipi)]" on_change="onchange_generic('cont_titular_id_poblacio', cont_titular_id_poblacio)"/>
                <field name="cont_titular_tv" colspan="1"/>
                <field name="cont_titular_nv" colspan="6"/>
                <field name="cont_titular_pnp"/>
                <field name="cont_titular_bq"/>
                <field name="cont_titular_es"/>
                <field name="cont_titular_pt"/>
                <field name="cont_titular_pu"/>
                <field name="cont_titular_cpo"/>
                <field name="cont_titular_cpa"/>
                <field name="cont_titular_apartat_correus"/>
                <field name="cont_titular_aclarador"/>
                <separator string=" " colspan="8"/>
                <field name="cont_titular_email" colspan="8"/>
                <newline/>
                <field name="cont_titular_phone"/>
                <field name="cont_titular_mobile"/>
            </group>
            </group>
        </page>

        <page string="Sobre el Contrato">
            <separator string="Datos del Contrato" colspan="8"/>
            <group colspan="16" col="6">
            <group col="1" colspan="4">
                <group string="Datos T&#233;cnicos" col="16">
                    <field name="tarifa" on_change="onchange_generic('tarifa', tarifa)" colspan="16"/>
                    <field name="tensio_normalitzada" colspan="16"/>
                    <field name="facturacio_potencia" colspan="16"/>
                </group>
                <group col="4">
                    <field name="llista_preu" domain="[('tarifes_atr_compatibles', '=', tarifa), ('type', '=', 'sale'), ('ofertable','=',True)]"/><button name="1681" string="Anexo de Precios" type="action" icon="gtk-print" readonly="0"/>

                </group>
                <group string="Datos Administrativos" col="8">
                    <field name="contract_number" readonly="1"/>
                    <field name="cnae" colspan="8"/>
                    <field name="autoconsumo" colspan="4" on_change="onchange_generic('autoconsumo', autoconsumo, 'cups', cups)"/>
                    <field name="data_alta_prevista" colspan="4"/>
                    <field name="activacio_cicle"/>
<field name="contract_type" colspan="4"/>
                    <group attrs="{'invisible': [('contract_type', 'not in', ['09'])]}" json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;not in&quot;, &quot;field&quot;: &quot;contract_type&quot;, &quot;value&quot;: [&quot;09&quot;]}], &quot;condition&quot;: &quot;AND&quot;}}">
                        <field name="expected_consumption" colspan="2"/>
                        <button string="Calcular" name="2814" type="action" readonly="0"/>
                    </group>
                    <group colspan="3" attrs="{'invisible': [('contract_type', 'not in', ['02', '09'])]}" json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;not in&quot;, &quot;field&quot;: &quot;contract_type&quot;, &quot;value&quot;: [&quot;02&quot;, &quot;09&quot;]}], &quot;condition&quot;: &quot;AND&quot;}}">
                        <field name="data_baixa"/>
                    </group>
                </group>
            </group>
            <group string="Potencias Contratadas (kW)" col="16" colspan="2">
                <field name="potenciasContratadasEnKWP1" string="P1 (*)" colspan="16"/>
                <field name="potenciasContratadasEnKWP2" string="P2 (*)" colspan="16"/>
                <field name="potenciasContratadasEnKWP3" string="P3 (*)" colspan="16"/>
                <field name="potenciasContratadasEnKWP4" string="P4" colspan="16"/>
                <field name="potenciasContratadasEnKWP5" string="P5" colspan="16"/>
                <field name="potenciasContratadasEnKWP6" string="P6" colspan="16"/>
            </group>
            <group string="Condiciones del contrato" col="16" colspan="16">
        <field name="condicions_generals_id" colspan="16"/>
    </group>
<group string="Consumos" col="16" colspan="16">
                <field name="consum_anual" colspan="5"/>
                <field name="consum_anual_previst" colspan="5"/>
            </group><group string="Comercial" col="4" colspan="16">
        <field name="comercial_id" colspan="16" select="2"/><field name="comissio" colspan="16"/>
<newline/>

    </group>

            </group>
        </page>
        <page string="Sobre el Autoconsumo" attrs="{'invisible': [('autoconsumo', 'in', ['00', '01', '2A', '2B', '2G',False])]}" json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;in&quot;, &quot;field&quot;: &quot;autoconsumo&quot;, &quot;value&quot;: [&quot;00&quot;, &quot;01&quot;, &quot;2A&quot;, &quot;2B&quot;, &quot;2G&quot;, false]}], &quot;condition&quot;: &quot;AND&quot;}}">
            <notebook>
                <page string="Autoconsumo y Generador">
                    <separator string="Datos del Autoconsumo" colspan="8"/>
                    <group string="Autoconsumo" col="2">
                        <field name="cau"/>
                        <field name="seccio_registre"/>
                        <field name="subseccio"/>
                        <field name="collectiu"/>
                        <field name="tipus_cups"/>
                    </group>
                    <separator string="Datos del Generador" colspan="8"/>
                    <group string="Generador" col="2">
                        <field name="cil"/>
                        <field name="tec_generador"/>
                        <field name="pot_instalada_gen"/>
                        <field name="tipus_installacio"/>
                        <field name="ssaa"/>
                        <field name="ref_cadastre"/>
                    </group>
                </page>
                <page string="Titular del Generador">
                    <separator string="Datos del Titular del Generador" colspan="8"/>
                    <separator string="Datos del Titular" colspan="8"/>
                    <group string="Titular" col="4" colspan="4">
                        <field name="gen_titular_vat"/>
                        <field name="gen_titular_es_empresa" invisible="1"/>
                        <field name="gen_titular_nom" colspan="8"/>
                        <group attrs="{'invisible': [('gen_titular_es_empresa', '=', True)]}" colspan="8" json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;=&quot;, &quot;field&quot;: &quot;gen_titular_es_empresa&quot;, &quot;value&quot;: true}], &quot;condition&quot;: &quot;AND&quot;}}">
                            <field name="gen_titular_cognom1"/>
                            <field name="gen_titular_cognom2"/>
                        </group>
                        <group attrs="{'invisible': [('gen_titular_es_empresa', '=', False)]}" colspan="8" json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;=&quot;, &quot;field&quot;: &quot;gen_titular_es_empresa&quot;, &quot;value&quot;: false}], &quot;condition&quot;: &quot;AND&quot;}}">
                            <field name="gen_persona_firmant_vat"/>
                            <field name="gen_persona_nom"/>
                        </group>
                    </group>
                    <separator string="Datos de Contacto" colspan="8"/>
                    <group string="Contacto" col="8" colspan="4">
                        <field name="gen_titular_email" colspan="8"/>
                        <newline/>
                        <field name="gen_titular_phone"/>
                        <field name="gen_titular_mobile"/>
                        <newline/>
                        <group colspan="8" col="8" string="Acciones">
                            <label string=" " colspan="2"/>
                            <button string="Copiar datos desde Titular" name="copy_base_attr_gen_from_titular" icon="gtk-execute" type="object" colspan="4" readonly="0"/>
                            <label string=" " colspan="2"/>
                        </group>
                    </group>
                    <separator string="Datos de la Direcci&#243;n" colspan="8"/>
                    <group string="Direcci&#243;n" col="8" colspan="8">
                        <field name="gen_titular_zip"/>
                        <field name="gen_titular_id_municipi"/>
                        <field name="gen_titular_id_poblacio" domain="[('municipi_id.id', '=', gen_titular_id_municipi)]"/>
                        <field name="gen_titular_tv" colspan="1"/>
                        <field name="gen_titular_nv" colspan="6"/>
                        <field name="gen_titular_pnp"/>
                        <field name="gen_titular_bq"/>
                        <field name="gen_titular_es"/>
                        <field name="gen_titular_pt"/>
                        <field name="gen_titular_pu"/>
                        <field name="gen_titular_cpo"/>
                        <field name="gen_titular_cpa"/>
                        <field name="gen_titular_apartat_correus"/>
                        <field name="gen_titular_aclarador"/>
                        <group colspan="8" col="8" string="Acciones">
                            <label string=" " colspan="2"/>
                            <button string="Copiar datos desde direccion del Titular" name="copy_address_gen_from_titular" icon="gtk-execute" type="object" colspan="4" readonly="0"/>
                            <label string=" " colspan="2"/>
                        </group>
                    </group>
                </page>
            </notebook>
        </page>

        <page string="Sobre el Pago">
            <separator string="Datos sobre la Facturaci&#243;n y el Pago" colspan="8"/>
            <group string="Datos de Facturaci&#243;n" colspan="8" col="4">
                <field name="facturacio" colspan="4"/>
                <field name="enviament" colspan="4"/>
            </group>
            <group string="Forma de Pago" col="2" colspan="8">
                <field name="payment_mode_id"/>
                <field name="iban_other_owner"/>
                <group colspan="2" col="2" attrs="{'invisible':[('iban_other_owner','!=',True)]}" json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;!=&quot;, &quot;field&quot;: &quot;iban_other_owner&quot;, &quot;value&quot;: true}], &quot;condition&quot;: &quot;AND&quot;}}">
                    <field name="iban_owner_name" attrs="{'required':[('iban_other_owner','=',True)]}" json_attrs="{&quot;required&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;=&quot;, &quot;field&quot;: &quot;iban_other_owner&quot;, &quot;value&quot;: true}], &quot;condition&quot;: &quot;AND&quot;}}"/>
                    <field name="iban_owner_vat" attrs="{'required':[('iban_other_owner','=',True)]}" json_attrs="{&quot;required&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;=&quot;, &quot;field&quot;: &quot;iban_other_owner&quot;, &quot;value&quot;: true}], &quot;condition&quot;: &quot;AND&quot;}}"/>
                    <field name="iban_owner_email" attrs="{'required':[('iban_other_owner','=',True)]}" json_attrs="{&quot;required&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;=&quot;, &quot;field&quot;: &quot;iban_other_owner&quot;, &quot;value&quot;: true}], &quot;condition&quot;: &quot;AND&quot;}}"/>
                </group>
                <field name="iban" on_change="onchange_generic('iban', iban)"/><group colspan="2">
        <field name="mandate_id" readonly="1"/>
        <button type="object" name="generate_mandate" string="Generar Mandato" icon="gtk-new" readonly="0"/>
    </group>

            </group>
        </page>

        <page string="SIPS" col="16">
        <separator string="Descarga de SIPS" colspan="16"/>
        <group string="Acciones" colspan="4" col="2">
            <button string="Descargar informacion sobre el PS del SIPS" type="object" name="download_sips_ps" colspan="2" readonly="0"/>
            <button string="Descargar informacion sobre consumos del SIPS" type="object" name="download_sips_consums" colspan="2" readonly="0"/>
            <button string="Descargar consumos en CSV/XLS" type="action" name="1707" colspan="2" readonly="0"/>
            <separator string="" colspan="16"/>
            <button string="Actualizar datos de la Oferta/Oportunidad a partir de los datos descargados del SIPS" type="object" name="update_from_sips" colspan="2" readonly="0"/>
        </group>
        <group string="Datos sobre el PS" colspan="12" col="1" expand="1">
<field name="sips_id" mode="form,tree" nolabel="1" expand="1"/>
        </group>
        <group string="Datos sobre consumos" col="1" colspan="16" expand="1">
            <field name="sips_consums_ids" widget="one2many_list" nolabel="1" expand="1"/>
        </group>
    </page>
<page string="Validaciones">
            <field name="stage_validation_ids" nolabel="1"/>
            <group colspan="4" col="4">
                <button string="Marcar todas OK" icon="gtk-ok" type="object" name="force_validation" readonly="0"/>
            </group>
        </page>

    </notebook>
    </page>
<page string="General">
            <group col="8" colspan="4">
                <field name="task_project_id" colspan="4"/>
    <field colspan="4" name="partner_id" on_change="onchange_partner_id(partner_id, email_from)" select="1"/>
                <field colspan="3" name="partner_address_id" on_change="onchange_partner_address_id(partner_address_id, email_from)" select="2"/>
                <field name="telephone_text" nolabel="1" colspan="1"/>
<field name="task_id_and_stage" colspan="1"/>
<newline/>
                <field colspan="3" name="email_from" select="2"/>
                <button name="remind_partner" states="open,pending" string="Enviar recordatorio" type="object" readonly="0"/>
                <field name="user_id" select="1" domain="[('id','!=', 0)]"/>
                <button name="autoassign" string="Asignamelo" type="object" readonly="0"/>
                <button name="remind_user" states="open,pending" string="Enviar recordatorio" type="object" readonly="0"/><field name="time_tracking_id" colspan="1"/>
<newline/>

            </group>
                <separator colspan="4"/>
            <group expand="1">
            <field name="categ_ids" widget="tags" widget_props="{'field': 'name'}" nolabel="1" colspan="4"/>
    <field name="history_line" colspan="2" mode="tree,form" nolabel="1">
        </field>
<group col="2" colspan="2" expand="1">
                <field name="canal_id"/>
                <button colspan="2" name="add_reply" states="open" string="Adjuntar &#250;ltimo correo para responder" type="object" readonly="0"/>
                <field colspan="2" name="description" nolabel="1" select="2"/>
                <buttonGroup name="sendGroup" default="case_log_reply" colspan="1">
<button name="case_log_reply" primary="1" icon="send" states="open" string="Enviar sense adjunts" type="object" readonly="0"/>
<button name="case_log" states="open" string="Historizar" type="object" colspan="2" readonly="0"/>
<button name="case_log_remind_partner" states="open" string="Remind Partner &amp; Historize" type="object" colspan="1" readonly="0"/>
</buttonGroup>
</group>
</group>
        </page>
        <page string="Informaci&#243;n extra">
            <field name="id" select="1"/>
            <field name="active" select="2"/>
            <field name="priority"/>
            <field colspan="4" name="email_cc"/>
            <field name="categ_id" on_change="onchange_categ_id(categ_id)" select="2" widget="selection"/>
            <field name="som" select="2"/>
            <separator colspan="4" string="Fechas"/>
            <field name="create_date"/>
            <field name="date_pending"/>
            <field name="date_closed"/>
            <field name="date_action_last"/>
            <field name="date_action_next"/>
            <separator colspan="4" string="Estimaciones"/>
            <field name="planned_revenue"/>
            <field name="planned_cost"/>
            <field name="probability"/>
            <separator colspan="4" string="Referencias"/>
            <field colspan="4" name="ref"/>
            <field colspan="4" name="ref2"/>
        </page>
        <page string="Historial">
            <field colspan="4" name="log_ids" nolabel="1">
        </field>
</page>
    <page string="Task">
        <field name="create_task"/>
        <field name="task_id"/>
        <field name="workdones_ids" context="{'default_task_id': task_id}" attrs="{'invisible': [('task_id', '=', False)]}" nolabel="1" colspan="4" json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;=&quot;, &quot;field&quot;: &quot;task_id&quot;, &quot;value&quot;: false}], &quot;condition&quot;: &quot;AND&quot;}}">
            </field>
    </page>
</notebook>
    <group colspan="4">
        <field name="state" select="1"/>
        <button name="case_close" states="open,draft,pending" string="Cerrado" type="object" readonly="0"/>
        <button name="case_open" states="draft,pending" string="Abierto" type="object" readonly="0"/>
        <button name="case_cancel" states="draft,open,pending" string="Cancelar" type="object" readonly="0"/>
        <button name="case_pending" states="draft,open" string="Pendiente" type="object" readonly="0"/>
        <button name="case_escalate" states="open,draft,pending" string="Escalado" type="object" readonly="0"/>
        <button name="case_reset" states="done,cancel" string="Cambiar a borrador" type="object" readonly="0"/>
    </group><group col="8" colspan="4">
        <field name="stage_id" select="1" colspan="2"/><button name="stage_previous" string="Previous Stage" type="object" icon="gtk-go-back" readonly="0"/>
<button name="stage_next" string="Next Stage" type="object" icon="gtk-go-forward" readonly="0"/>

    </group>

</form>`;
    const form = new Form({
      activacio_cicle: {
        is_function: false,
        selection: [
          ["A", "La activación se debe producir cuanto antes"],
          ["L", "La activación se debe producir con próxima lectura del ciclo"],
          ["F", "La activación se producirá según la fecha fija solicitada"],
        ],
        string: "Cicle activació",
        type: "selection",
        views: {},
      },
      active: {
        is_function: false,
        string: "Activo",
        type: "boolean",
        views: {},
      },
      allow_contact: {
        is_function: false,
        string: "Aceptación contactar con el cliente",
        type: "boolean",
        views: {},
      },
      atr_proces_name: {
        help: "Si se selecciona un proceso, se generara un caso ATR cuando se genere el contrato",
        is_function: false,
        selection: [
          ["", ""],
          ["A3", "A3"],
          ["C1", "C1"],
          ["C2", "C2"],
        ],
        string: "Proceso de alta (*)",
        type: "selection",
        views: {},
      },
      autoconsumo: {
        is_function: false,
        selection: [
          ["00", "[00] - Sin Autoconsumo"],
          ["31", "[31] - Sin Excedentes Individual – Consumo"],
          ["32", "[32] - Sin Excedentes Colectivo – Consumo"],
          [
            "33",
            "[33] - Sin Excedentes Colectivo con acuerdo de compensación – Consumo",
          ],
          ["41", "[41] - Con excedentes y compensación Individual - Consumo"],
          ["42", "[42] - Con excedentes y compensación Colectivo– Consumo"],
          [
            "43",
            "[43] - Con excedentes y compensación Colectivo a través de red– Consumo",
          ],
          [
            "51",
            "[51] - Con excedentes sin compensación Individual sin cto de SSAA en Red Interior– Consumo",
          ],
          [
            "52",
            "[52] - Con excedentes sin compensación Colectivo sin cto de SSAA en Red Interior– Consumo",
          ],
          [
            "53",
            "[53] - Con excedentes sin compensación Individual con cto SSAA en Red Interior– Consumo",
          ],
          [
            "54",
            "[54] - Con excedentes sin compensación individual con cto SSAA en Red Interior– SSAA",
          ],
          [
            "55",
            "[55] - Con excedentes sin compensación Colectivo/en Red Interior– Consumo",
          ],
          [
            "56",
            "[56] - Con excedentes sin compensación Colectivo/en Red Interior - SSAA",
          ],
          [
            "57",
            "[57] - Con excedentes sin compensación Colectivo sin cto de SSAA (despreciable) en red interior – Consumo",
          ],
          [
            "58",
            "[58] - Con excedentes sin compensación Colectivo sin cto de SSAA a través de red - Consumo",
          ],
          [
            "61",
            "[61] - Con excedentes sin compensación Individual con cto SSAA a través de red – Consumo",
          ],
          [
            "62",
            "[62] - Con excedentes sin compensación individual con cto SSAA a través de red – SSAA",
          ],
          [
            "63",
            "[63] - Con excedentes sin compensación Colectivo a través de red – Consumo",
          ],
          [
            "64",
            "[64] - Con excedentes sin compensación Colectivo a través de red - SSAA",
          ],
          [
            "71",
            "[71] - Con excedentes sin compensación Individual con cto SSAA a través de red y red interior – Consumo",
          ],
          [
            "72",
            "[72] - Con excedentes sin compensación individual con cto SSAA a través de red y red interior – SSAA",
          ],
          [
            "73",
            "[73] - Con excedentes sin compensación Colectivo con cto de SSAA  a través de red y red interior – Consumo",
          ],
          [
            "74",
            "[74] - Con excedentes sin compensación Colectivo con cto de SSAA a través de red y red interior - SSAA",
          ],
        ],
        string: "Autoconsumo (*)",
        type: "selection",
        views: {},
      },
      canal_id: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.partner.canal",
        size: 64,
        string: "Canal",
        type: "many2one",
        views: {},
      },
      categ_id: {
        context: "",
        domain: "[('section_id','=',section_id)]",
        is_function: false,
        relation: "crm.case.categ",
        selection: [
          [false, ""],
          [3, "Consulta"],
          [1, "Incidència"],
          [2, "iojkokj"],
          [4, "Modificació"],
        ],
        size: 64,
        string: "Categoría",
        type: "many2one",
        views: {},
        widget: "selection",
      },
      categ_ids: {
        context: "",
        domain: [],
        is_function: false,
        relation: "crm.case.categ",
        string: "Categorías",
        type: "many2many",
        views: {},
        widget: "tags",
      },
      cau: {
        is_function: false,
        size: 26,
        string: "CAU",
        type: "char",
        views: {},
      },
      change_adm: {
        is_function: false,
        string: "Cambio Titular",
        type: "boolean",
        views: {},
      },
      change_atr: {
        is_function: false,
        string: "Cambio Tarifa/Potencia",
        type: "boolean",
        views: {},
      },
      cil: {
        is_function: false,
        size: 25,
        string: "CIL",
        type: "char",
        views: {},
      },
      cnae: {
        context: "",
        domain: [],
        is_function: false,
        relation: "giscemisc.cnae",
        size: 64,
        string: "CNAE (*)",
        type: "many2one",
        views: {},
      },
      codigoEmpresaDistribuidora: {
        is_function: false,
        size: 4,
        string: "Código distribuidora (*)",
        type: "char",
        views: {},
      },
      collectiu: {
        is_function: false,
        string: "Colectivo",
        type: "boolean",
        views: {},
      },
      comer_origen: {
        context: "",
        domain: [],
        is_function: false,
        relation: "giscedata.crm.lead.comer",
        size: 64,
        string: "Comercializadora actual",
        type: "many2one",
        views: {},
      },
      comercial_id: {
        context: "",
        domain: [],
        is_function: false,
        relation: "hr.employee",
        size: 64,
        string: "Comercial",
        type: "many2one",
        views: {},
      },
      comercialitzadora: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.partner",
        size: 64,
        string: "Comercializadora (*)",
        type: "many2one",
        views: {},
      },
      comissio: {
        is_function: false,
        selection: [
          ["giscedata.polissa.comissio.kw", "Comissió per Kw Facturats"],
          ["giscedata.polissa.comissio.unica", "Comissió Única"],
        ],
        size: 256,
        string: "Comissión Asignada",
        type: "reference",
        views: {},
      },
      condicions_generals_id: {
        change_default: true,
        context: "",
        domain: [],
        is_function: false,
        relation: "giscedata.polissa.condicions.generals",
        size: 64,
        string: "Condiciones generales (*)",
        type: "many2one",
        views: {},
      },
      consum_anual: {
        is_function: false,
        string: "Consumo Anual (kWh)",
        type: "integer",
        views: {},
      },
      consum_anual_previst: {
        is_function: false,
        string: "Consumo Anual Previsto",
        type: "integer",
        views: {},
      },
      cont_titular_aclarador: {
        is_function: false,
        size: 256,
        string: "Aclarador",
        type: "char",
        views: {},
      },
      cont_titular_apartat_correus: {
        is_function: false,
        size: 5,
        string: "Apartado de Correos",
        type: "char",
        views: {},
      },
      cont_titular_bq: {
        is_function: false,
        size: 4,
        string: "Bloque",
        type: "char",
        views: {},
      },
      cont_titular_cpa: {
        is_function: false,
        size: 10,
        string: "Parcela",
        type: "char",
        views: {},
      },
      cont_titular_cpo: {
        is_function: false,
        size: 10,
        string: "Polígono",
        type: "char",
        views: {},
      },
      cont_titular_email: {
        is_function: false,
        size: 240,
        string: "Email",
        type: "char",
        views: {},
      },
      cont_titular_es: {
        is_function: false,
        size: 10,
        string: "Escalera",
        type: "char",
        views: {},
      },
      cont_titular_id_municipi: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.municipi",
        size: 64,
        string: "Municipio",
        type: "many2one",
        views: {},
      },
      cont_titular_id_poblacio: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.poblacio",
        size: 64,
        string: "Población",
        type: "many2one",
        views: {},
      },
      cont_titular_mobile: {
        is_function: false,
        size: 64,
        string: "Móvil",
        type: "char",
        views: {},
      },
      cont_titular_nom: {
        is_function: false,
        size: 40,
        string: "Nombre Persona de Contacto",
        type: "char",
        views: {},
      },
      cont_titular_nv: {
        is_function: false,
        size: 256,
        string: "Calle",
        type: "char",
        views: {},
      },
      cont_titular_phone: {
        is_function: false,
        size: 64,
        string: "Teléfono",
        type: "char",
        views: {},
      },
      cont_titular_pnp: {
        is_function: false,
        size: 10,
        string: "Número",
        type: "char",
        views: {},
      },
      cont_titular_pt: {
        is_function: false,
        size: 10,
        string: "Planta",
        type: "char",
        views: {},
      },
      cont_titular_pu: {
        is_function: false,
        size: 10,
        string: "Puerta",
        type: "char",
        views: {},
      },
      cont_titular_tv: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.tipovia",
        size: 64,
        string: "Tipo Vía",
        type: "many2one",
        views: {},
      },
      cont_titular_zip: {
        change_default: true,
        is_function: false,
        size: 24,
        string: "Código Postal",
        type: "char",
        views: {},
      },
      contact_time_range: {
        is_function: false,
        size: 256,
        string: "Franja horaria contacto",
        type: "char",
        views: {},
      },
      contract_number: {
        is_function: false,
        size: 64,
        string: "Contract number",
        type: "char",
        views: {},
      },
      contract_type: {
        is_function: false,
        selection: [
          ["01", "Anual"],
          ["02", "Eventual medido"],
          ["03", "Temporada"],
          ["05", "Suministro a instalaciones RECORE"],
          ["07", "Suministro de Obras"],
          ["08", "Suministro de Socorro"],
          ["09", "Eventual a tanto alzado"],
          ["10", "Pruebas"],
          ["11", "Duplicado"],
          ["12", "De reserva"],
        ],
        string: "Tipo contrato (*)",
        type: "selection",
        views: {},
      },
      create_date: {
        is_function: false,
        readonly: true,
        string: "Creado",
        type: "datetime",
        views: {},
      },
      create_ov_user: {
        help: "Si la firma digital esta habilitada se va a crear siempre l'usuario después de la firma independientemente de este campo",
        is_function: false,
        string: "Crear Usuario Oficina Virtual",
        type: "boolean",
        views: {},
      },
      create_task: {
        is_function: false,
        string: "Create a task",
        type: "boolean",
        views: {},
      },
      create_uid: {
        context: "",
        domain: [],
        is_function: false,
        readonly: true,
        relation: "res.users",
        size: 64,
        string: "Usuario",
        type: "many2one",
        views: {},
      },
      cups: {
        is_function: false,
        size: 22,
        string: "CUPS (*)",
        type: "char",
        views: {},
      },
      cups_aclarador: {
        is_function: false,
        size: 256,
        string: "Aclarador",
        type: "char",
        views: {},
      },
      cups_apartat_correus: {
        is_function: false,
        size: 5,
        string: "Apartado de Correos",
        type: "char",
        views: {},
      },
      cups_bq: {
        is_function: false,
        size: 4,
        string: "Bloque",
        type: "char",
        views: {},
      },
      cups_cpa: {
        is_function: false,
        size: 10,
        string: "Parcela",
        type: "char",
        views: {},
      },
      cups_cpo: {
        is_function: false,
        size: 10,
        string: "Polígono",
        type: "char",
        views: {},
      },
      cups_es: {
        is_function: false,
        size: 10,
        string: "Escalera",
        type: "char",
        views: {},
      },
      cups_id_municipi: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.municipi",
        size: 64,
        string: "Municipio (*)",
        type: "many2one",
        views: {},
      },
      cups_id_poblacio: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.poblacio",
        size: 64,
        string: "Poblacion PS",
        type: "many2one",
        views: {},
      },
      cups_nv: {
        is_function: false,
        size: 256,
        string: "Calle",
        type: "char",
        views: {},
      },
      cups_pnp: {
        is_function: false,
        size: 10,
        string: "Número",
        type: "char",
        views: {},
      },
      cups_pt: {
        is_function: false,
        size: 10,
        string: "Planta",
        type: "char",
        views: {},
      },
      cups_pu: {
        is_function: false,
        size: 10,
        string: "Puerta",
        type: "char",
        views: {},
      },
      cups_ref_catastral: {
        is_function: false,
        select: 2,
        size: 20,
        string: "Ref Cadastral (cups)",
        type: "char",
        views: {},
      },
      cups_tv: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.tipovia",
        size: 64,
        string: "Tipo Vía",
        type: "many2one",
        views: {},
      },
      cups_zip: {
        is_function: false,
        size: 5,
        string: "Código postal PS",
        type: "char",
        views: {},
      },
      data_alta_prevista: {
        is_function: false,
        string: "Fecha de alta prevista (*)",
        type: "date",
        views: {},
      },
      data_baixa: {
        is_function: false,
        string: "Fecha de Baja prevista",
        type: "date",
        views: {},
      },
      date: {
        is_function: false,
        string: "Fecha",
        type: "datetime",
        views: {},
      },
      date_action_last: {
        is_function: false,
        readonly: 1,
        string: "Última acción",
        type: "datetime",
        views: {},
      },
      date_action_next: {
        is_function: false,
        readonly: 1,
        string: "Próxima acción",
        type: "datetime",
        views: {},
      },
      date_closed: {
        is_function: false,
        readonly: true,
        string: "Cerrado",
        type: "datetime",
        views: {},
      },
      date_deadline: {
        is_function: false,
        string: "Fecha límite",
        type: "datetime",
        views: {},
      },
      date_pending: {
        help: "Date on wich this CRM's state changed to Pending",
        is_function: false,
        string: "Pending Date",
        type: "datetime",
        views: {},
      },
      delivery_type: {
        is_function: false,
        selection: [
          ["url", "Código QR"],
          ["email", "Email"],
        ],
        string: "Forma de envío",
        type: "selection",
        views: {},
      },
      description: {
        is_function: false,
        string: "Su acción",
        type: "text",
        views: {},
      },
      digital_email: {
        is_function: false,
        size: 240,
        string: "E-Mail Firma Digital (*)",
        type: "char",
        views: {},
      },
      digital_provider: {
        is_function: false,
        selection: [["signaturit", "Signaturit"]],
        string: "Proveedor",
        type: "selection",
        views: {},
      },
      digital_sign: {
        is_function: false,
        string: "Firma digital",
        type: "boolean",
        views: {},
      },
      distribuidora_vat: {
        is_function: false,
        size: 11,
        string: "Nº de Documento distribuidora (*)",
        type: "char",
        views: {},
      },
      email_cc: {
        is_function: false,
        size: 252,
        string: "Observadores emails (CC)",
        type: "char",
        views: {},
      },
      email_from: {
        is_function: false,
        size: 128,
        string: "Email empresa",
        type: "char",
        views: {},
      },
      enviament: {
        is_function: false,
        selection: [
          ["postal", "Correo postal"],
          ["email", "E-mail"],
          ["postal+email", "Correo postal y e-mail"],
        ],
        string: "Enviar factura vía (*)",
        type: "selection",
        views: {},
      },
      expected_consumption: {
        digits: [15, 3],
        is_function: false,
        string: "Consumo Pactado",
        type: "float",
        views: {},
      },
      facturacio: {
        is_function: false,
        selection: [
          [1, "Mensual"],
          [2, "Bimestral"],
        ],
        string: "Periodicidad facturación (*)",
        type: "selection",
        views: {},
      },
      facturacio_potencia: {
        is_function: false,
        selection: [
          ["max", "Maxímetro"],
          ["icp", "ICP"],
          ["recarrec", "Recargo NO_ICP"],
        ],
        string: "Facturación Potencia (*)",
        type: "selection",
        views: {},
      },
      gen_persona_firmant_vat: {
        is_function: false,
        size: 11,
        string: "NIF Firmante",
        type: "char",
        views: {},
      },
      gen_persona_nom: {
        is_function: false,
        size: 80,
        string: "Nombre Firmante",
        type: "char",
        views: {},
      },
      gen_titular_aclarador: {
        is_function: false,
        size: 256,
        string: "Aclarador",
        type: "char",
        views: {},
      },
      gen_titular_apartat_correus: {
        is_function: false,
        size: 5,
        string: "Apartado de Correos",
        type: "char",
        views: {},
      },
      gen_titular_bq: {
        is_function: false,
        size: 4,
        string: "Bloque",
        type: "char",
        views: {},
      },
      gen_titular_cognom1: {
        is_function: false,
        size: 30,
        string: "Apellido 1",
        type: "char",
        views: {},
      },
      gen_titular_cognom2: {
        is_function: false,
        size: 30,
        string: "Apellido 2",
        type: "char",
        views: {},
      },
      gen_titular_cpa: {
        is_function: false,
        size: 10,
        string: "Parcela",
        type: "char",
        views: {},
      },
      gen_titular_cpo: {
        is_function: false,
        size: 10,
        string: "Poligono",
        type: "char",
        views: {},
      },
      gen_titular_email: {
        is_function: false,
        size: 240,
        string: "Email",
        type: "char",
        views: {},
      },
      gen_titular_es: {
        is_function: false,
        size: 10,
        string: "Escalera",
        type: "char",
        views: {},
      },
      gen_titular_es_empresa: {
        digits: [16, 2],
        is_function: true,
        readonly: 1,
        string: "Es Empresa",
        type: "boolean",
        views: {},
      },
      gen_titular_id_municipi: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.municipi",
        size: 64,
        string: "Municipio",
        type: "many2one",
        views: {},
      },
      gen_titular_id_poblacio: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.poblacio",
        size: 64,
        string: "Población",
        type: "many2one",
        views: {},
      },
      gen_titular_mobile: {
        is_function: false,
        size: 64,
        string: "Mobil",
        type: "char",
        views: {},
      },
      gen_titular_nom: {
        is_function: false,
        size: 256,
        string: "Nombre Cliente / Razón Social",
        type: "char",
        views: {},
      },
      gen_titular_nv: {
        is_function: false,
        size: 256,
        string: "Calle",
        type: "char",
        views: {},
      },
      gen_titular_phone: {
        is_function: false,
        size: 64,
        string: "Telefono",
        type: "char",
        views: {},
      },
      gen_titular_pnp: {
        is_function: false,
        size: 10,
        string: "Número",
        type: "char",
        views: {},
      },
      gen_titular_pt: {
        is_function: false,
        size: 10,
        string: "Planta",
        type: "char",
        views: {},
      },
      gen_titular_pu: {
        is_function: false,
        size: 10,
        string: "Puerta",
        type: "char",
        views: {},
      },
      gen_titular_tv: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.tipovia",
        size: 64,
        string: "Tipo Via",
        type: "many2one",
        views: {},
      },
      gen_titular_vat: {
        is_function: false,
        size: 11,
        string: "Nº de Documento",
        type: "char",
        views: {},
      },
      gen_titular_zip: {
        change_default: true,
        is_function: false,
        size: 24,
        string: "Codigo Postal",
        type: "char",
        views: {},
      },
      history_line: {
        context: "",
        domain: [],
        inv_field: "case_id",
        is_function: false,
        readonly: 1,
        relation: "crm.case.history",
        string: "Comunicación",
        type: "one2many",
        views: {
          form: {
            arch: '<form string="Historial de comunicaci&#xF3;n">\n                            <group col="6" colspan="4">\n                                <field name="date" select="1"/>\n                                <field name="email" select="1"/>\n                                <field name="canal_id" select="2"/>\n                                <field name="user_id" select="2"/>\n                            </group>\n                            <newline/>\n                            <field name="time_tracking_id"/>\n                            <newline/>\n                            <field colspan="4" name="description" nolabel="1" select="2"/>\n                        </form>\n                        ',
            fields: {
              canal_id: {
                context: "",
                domain: [],
                is_function: false,
                relation: "res.partner.canal",
                size: 64,
                string: "Canal",
                type: "many2one",
                views: {},
              },
              date: {
                is_function: false,
                string: "Fecha",
                type: "datetime",
                views: {},
              },
              description: {
                is_function: false,
                string: "Descripción",
                type: "text",
                views: {},
              },
              email: {
                is_function: false,
                size: 84,
                string: "Email",
                type: "char",
                views: {},
              },
              time_tracking_id: {
                context: "",
                domain: [],
                is_function: false,
                relation: "crm.time.tracking",
                select: true,
                size: 64,
                string: "Imputación de tiempo",
                type: "many2one",
                views: {},
              },
              user_id: {
                context: "",
                domain: [],
                is_function: false,
                readonly: true,
                relation: "res.users",
                size: 64,
                string: "Usuario responsable",
                type: "many2one",
                views: {},
              },
            },
          },
          tree: {
            arch: '<tree string="Historial de comunicaci&#xF3;n">\n                            <field name="note"/>\n                        </tree>\n                    ',
            fields: {
              note: {
                digits: [16, 2],
                is_function: true,
                readonly: 1,
                string: "Descripción",
                type: "text",
                views: {},
              },
            },
          },
        },
      },
      iban: {
        is_function: false,
        size: 34,
        string: "Cuenta IBAN (*)",
        type: "char",
        views: {},
      },
      iban_other_owner: {
        help: "El titular del IBAN es distinto al titular del contrato",
        is_function: false,
        string: "Otro titular IBAN",
        type: "boolean",
        views: {},
      },
      iban_owner_email: {
        is_function: false,
        size: 256,
        string: "Email titular IBAN",
        type: "char",
        views: {},
      },
      iban_owner_name: {
        is_function: false,
        size: 256,
        string: "Nombre titular IBAN",
        type: "char",
        views: {},
      },
      iban_owner_vat: {
        is_function: false,
        size: 11,
        string: "NIF titular IBAN",
        type: "char",
        views: {},
      },
      id: {
        readonly: true,
        string: "ID",
        type: "integer",
      },
      lang: {
        is_function: false,
        selection: [
          ["en_US", "English"],
          ["ca_ES", "Catalan / Català"],
          ["es_ES", "Spanish / Español"],
          ["", ""],
        ],
        size: 5,
        string: "Idioma",
        type: "selection",
        views: {},
      },
      llista_preu: {
        context: "",
        domain: [],
        is_function: false,
        relation: "product.pricelist",
        size: 64,
        string: "Tarifa de venta (*)",
        type: "many2one",
        views: {},
      },
      log_ids: {
        context: "",
        domain: [],
        inv_field: "case_id",
        is_function: false,
        readonly: 1,
        relation: "crm.case.log",
        string: "Historial del registro",
        type: "one2many",
        views: {
          form: {
            arch: '<form string="Acciones">\n                            <separator colspan="4" string="Información de la acción"/>\n                            <field colspan="4" name="name"/>\n                            <field name="date" select="2"/>\n                            <field name="user_id" select="2"/>\n                            <field name="som" select="2"/>\n                            <field name="canal_id"/>\n                            <field name="time_tracking_id"/>\n                            <field name="time_spent"/>\n                        </form>\n                    ',
            fields: {
              canal_id: {
                context: "",
                domain: [],
                is_function: false,
                relation: "res.partner.canal",
                size: 64,
                string: "Canal",
                type: "many2one",
                views: {},
              },
              date: {
                is_function: false,
                string: "Fecha",
                type: "datetime",
                views: {},
              },
              name: {
                is_function: false,
                size: 64,
                string: "Action",
                type: "char",
                views: {},
              },
              som: {
                context: "",
                domain: [],
                is_function: false,
                relation: "res.partner.som",
                size: 64,
                string: "Grado de satisfacción",
                type: "many2one",
                views: {},
              },
              time_spent: {
                digits: [16, 2],
                help: "Días hábiles gastados en el estado actual que se imputaran",
                is_function: true,
                readonly: 1,
                string: "Duración días",
                type: "float",
                views: {},
              },
              time_tracking_id: {
                context: "",
                domain: [],
                is_function: false,
                relation: "crm.time.tracking",
                select: true,
                size: 64,
                string: "Imputación de tiempo",
                type: "many2one",
                views: {},
              },
              user_id: {
                context: "",
                domain: [],
                is_function: false,
                readonly: true,
                relation: "res.users",
                size: 64,
                string: "Usuario responsable",
                type: "many2one",
                views: {},
              },
            },
          },
        },
      },
      mandate_id: {
        context: "",
        domain: [],
        is_function: false,
        relation: "payment.mandate",
        size: 64,
        string: "Mandato",
        type: "many2one",
        views: {},
      },
      name: {
        is_function: false,
        required: true,
        size: 128,
        string: "Descripción",
        type: "char",
        views: {},
      },
      nombreEmpresaDistribuidora: {
        is_function: false,
        size: 60,
        string: "Empresa distribuidora (*)",
        type: "char",
        views: {},
      },
      partner_address_id: {
        context: "",
        domain: "[('partner_id','=',partner_id)]",
        is_function: false,
        relation: "res.partner.address",
        size: 64,
        string: "Contacto empresa",
        type: "many2one",
        views: {},
      },
      partner_id: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.partner",
        size: 64,
        string: "Empresa",
        type: "many2one",
        views: {},
      },
      payment_mode_id: {
        context: "",
        domain: [],
        is_function: false,
        relation: "payment.mode",
        size: 64,
        string: "Grupo de pago (*)",
        type: "many2one",
        views: {},
      },
      persona_firmant_vat: {
        is_function: false,
        size: 11,
        string: "NIF Firmante",
        type: "char",
        views: {},
      },
      persona_nom: {
        is_function: false,
        size: 80,
        string: "Nombre Firmante",
        type: "char",
        views: {},
      },
      planned_cost: {
        is_function: false,
        string: "Costos previstos",
        type: "float",
        views: {},
      },
      planned_revenue: {
        is_function: false,
        string: "Ingresos previstos",
        type: "float",
        views: {},
      },
      polissa_id: {
        context: "",
        domain: [],
        is_function: false,
        relation: "giscedata.polissa",
        size: 64,
        string: "Contrato",
        type: "many2one",
        views: {},
      },
      pot_instalada_gen: {
        digits: [10, 3],
        is_function: false,
        string: "Potencia generación",
        type: "float",
        views: {},
      },
      potenciasContratadasEnKWP1: {
        digits: [15, 3],
        is_function: false,
        string: "Potencia contratada P1 (*)",
        type: "float",
        views: {},
      },
      potenciasContratadasEnKWP2: {
        digits: [15, 3],
        is_function: false,
        string: "Potencia contratada P2 (*)",
        type: "float",
        views: {},
      },
      potenciasContratadasEnKWP3: {
        digits: [15, 3],
        is_function: false,
        string: "Potencia contratada P3 (*)",
        type: "float",
        views: {},
      },
      potenciasContratadasEnKWP4: {
        digits: [15, 3],
        is_function: false,
        string: "Potencia contratada P4 (*)",
        type: "float",
        views: {},
      },
      potenciasContratadasEnKWP5: {
        digits: [15, 3],
        is_function: false,
        string: "Potencia contratada P5 (*)",
        type: "float",
        views: {},
      },
      potenciasContratadasEnKWP6: {
        digits: [15, 3],
        is_function: false,
        string: "Potencia contratada P6 (*)",
        type: "float",
        views: {},
      },
      priority: {
        is_function: false,
        selection: [
          ["5", "Muy bajo"],
          ["4", "Bajo"],
          ["3", "Normal"],
          ["2", "Alto"],
          ["1", "Muy alto"],
        ],
        string: "Prioridad",
        type: "selection",
        views: {},
      },
      probability: {
        is_function: false,
        string: "Probabilidad (%)",
        type: "float",
        views: {},
      },
      ref: {
        is_function: false,
        select: true,
        selection: [
          ["giscemisc.informes.scheduler.store", "Informe Scheduler Store"],
          ["crm.case", "Caso"],
          ["giscedata.facturacio.factura", "Factura"],
          ["giscedata.atc", "ATC"],
          ["stock.production.lot", "Lote de producción"],
          ["giscedata.polissa", "Pòlissa"],
          ["giscedata.signatura.process", "Firma"],
          ["giscedata.cups.ps", "CUPS"],
          ["account.invoice", "Factura"],
          ["purchase.order", "Pedido de compra"],
          ["product.product", "Producto"],
          ["giscedata.crm.lead", "Oferta/Oportunidad"],
          ["giscegas.polissa", "Contrato"],
          ["project.task", "Tarea del proyecto"],
          ["giscedata.polissa", "Póliza"],
          ["giscedata.atc", "Atención al Cliente"],
          ["giscedata.facturacio.factura", "Factura Energia"],
          ["sale.order", "Pedido de venta"],
          ["giscedata.switching", "Caso ATR"],
          ["project.project", "Proyecto"],
        ],
        size: 128,
        string: "Referencia",
        type: "reference",
        views: {},
      },
      ref2: {
        is_function: false,
        selection: [
          ["giscemisc.informes.scheduler.store", "Informe Scheduler Store"],
          ["crm.case", "Caso"],
          ["giscedata.facturacio.factura", "Factura"],
          ["giscedata.atc", "ATC"],
          ["stock.production.lot", "Lote de producción"],
          ["giscedata.polissa", "Pòlissa"],
          ["giscedata.signatura.process", "Firma"],
          ["giscedata.cups.ps", "CUPS"],
          ["account.invoice", "Factura"],
          ["purchase.order", "Pedido de compra"],
          ["product.product", "Producto"],
          ["giscedata.crm.lead", "Oferta/Oportunidad"],
          ["giscegas.polissa", "Contrato"],
          ["project.task", "Tarea del proyecto"],
          ["giscedata.polissa", "Póliza"],
          ["giscedata.atc", "Atención al Cliente"],
          ["giscedata.facturacio.factura", "Factura Energia"],
          ["sale.order", "Pedido de venta"],
          ["giscedata.switching", "Caso ATR"],
          ["project.project", "Proyecto"],
        ],
        size: 128,
        string: "Referencia 2",
        type: "reference",
        views: {},
      },
      ref_cadastre: {
        is_function: false,
        size: 20,
        string: "Ref. Catastral",
        type: "char",
        views: {},
      },
      seccio_registre: {
        is_function: false,
        selection: [
          ["1", "Sin excedentes"],
          ["2", "Con excedentes"],
        ],
        string: "Sección registro",
        type: "selection",
        views: {},
      },
      section_id: {
        context: "",
        domain: [],
        is_function: false,
        relation: "crm.case.section",
        required: true,
        select: true,
        size: 64,
        string: "Sección",
        type: "many2one",
        views: {},
      },
      sips_consums_ids: {
        context: "",
        digits: [16, 2],
        domain: [],
        is_function: true,
        readonly: 1,
        relation: "giscedata.cnmc.sips.consums.comer.ps",
        string: "Informacio del SIPS sobre consums",
        type: "many2many",
        views: {},
        widget: "one2many_list",
      },
      sips_id: {
        context: "",
        digits: [16, 2],
        domain: [],
        is_function: true,
        readonly: 1,
        relation: "giscedata.cnmc.sips.comer.ps",
        string: "Informacio del SIPS sobre el PS",
        type: "one2many",
        views: {},
      },
      som: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.partner.som",
        size: 64,
        string: "Grado de satisfacción",
        type: "many2one",
        views: {},
      },
      ssaa: {
        is_function: false,
        selection: [
          ["S", "Sí"],
          ["N", "No"],
        ],
        string: "SSAA",
        type: "selection",
        views: {},
      },
      stage_id: {
        context: "",
        domain: "[('section_ids', '=', section_id)]",
        is_function: false,
        relation: "crm.case.stage",
        size: 64,
        string: "Fase",
        type: "many2one",
        views: {},
      },
      stage_validation_ids: {
        context: "",
        domain: [],
        inv_field: "crm_lead_id",
        is_function: false,
        relation: "crm.stage.validation",
        string: "Validaciones",
        type: "one2many",
        views: {},
      },
      state: {
        is_function: false,
        selection: [
          ["draft", "Borrador"],
          ["open", "Abierto"],
          ["cancel", "Cancelar"],
          ["done", "Cerrado"],
          ["pending", "Pendiente"],
        ],
        size: 16,
        string: "Status",
        type: "selection",
        views: {},
      },
      subseccio: {
        is_function: false,
        selection: [
          ["a0", "Con excedentes y mecanismo de compensación simplificado"],
          [
            "b1",
            "Con excedentes sin mecanismo de compensación y un único contrato de suministro",
          ],
          [
            "b2",
            "Con excedentes sin mecanismo de compensación y varios contratos de suministro",
          ],
          ["", ""],
        ],
        string: "Subsección",
        type: "selection",
        views: {},
      },
      tarifa: {
        context: "",
        domain: [],
        is_function: false,
        relation: "giscedata.polissa.tarifa",
        size: 64,
        string: "Tarifa ATR (*)",
        type: "many2one",
        views: {},
      },
      task_id: {
        context: "",
        domain: [],
        is_function: false,
        relation: "project.task",
        size: 64,
        string: "Case Task",
        type: "many2one",
        views: {},
      },
      task_id_and_stage: {
        digits: [16, 2],
        is_function: true,
        readonly: 1,
        string: "Id i Estat Tasca",
        type: "char",
        views: {},
      },
      task_project_id: {
        context: "",
        digits: [16, 2],
        domain: [],
        is_function: true,
        relation: "project.project",
        string: "Projecte",
        type: "many2one",
        views: {},
      },
      tec_generador: {
        is_function: false,
        selection: [
          [
            "a11",
            "[A11] - Cogeneraciones que utilicen como combustible el gas natural, siempre que éste suponga al menos el 95 por ciento de la energía primaria utilizada, o al menos el 65 por ciento de la energía primaria utilizada cuando el resto provenga de biomasa o biogás de los grupos b.6, b.7 y b.8; siendo los porcentajes de la energía primaria utilizada citados medidos por el poder calorífico inferior.",
          ],
          [
            "a12",
            "[A12] - Cogeneraciones que utilicen como combustible principal derivados de petróleo o carbón, siempre que suponga al menos el 95 por ciento de la energía primaria utilizada, medida por el poder calorífico inferior",
          ],
          [
            "a13",
            "[A13] - Resto de cogeneraciones que utilicen gas natural o derivados de petróleo o carbón, y no cumplan con los límites de consumo establecidos para los subgrupos a.1.1 ó a.1.2.",
          ],
          [
            "a20",
            "[A20] - Instalaciones que incluyan una central que utilice energías residuales procedentes de cualquier instalación, máquina o proceso industrial cuya finalidad no sea la producción de energía eléctrica.",
          ],
          [
            "b11",
            "[B11] - Instalaciones que únicamente utilicen la radiación solar como energía primaria mediante la tecnología fotovoltaica.",
          ],
          [
            "b12",
            "[B12] - Instalaciones que únicamente utilicen procesos térmicos para la transformación de la energía solar, como energía primaria, en electricidad.",
          ],
          ["b21", "[B21] - Instalaciones eólicas ubicadas en tierra."],
          [
            "b22",
            "[B22] - Instalaciones eólicas ubicadas en espacios marinos, que incluyen tanto las aguas interiores como el mar territorial.",
          ],
          [
            "b30",
            "[B30] - Instalaciones que únicamente utilicen como energía primaria la geotérmica, hidrotérmica, aerotérmica, la de las olas, la de las mareas, la de las rocas calientes y secas, la oceanotérmica y la energía de las corrientes marinas.",
          ],
          [
            "b41",
            "[B41] - Centrales hidroeléctricas cuyas instalaciones hidráulicas (presa o azud, toma, canal y otras) hayan sido construidas exclusivamente para uso hidroeléctrico. Potencia instalada NO Superior a 10 MW",
          ],
          [
            "b42",
            "[B42] - Centrales hidroeléctricas que hayan sido construidas en infraestructuras existentes (presas, canales o conducciones) o dedicadas a otros usos distintos al hidroeléctrico. Potencia instalada NO Superior a 10 MW",
          ],
          [
            "b51",
            "[B51] - Centrales hidroeléctricas cuyas instalaciones hidráulicas (presa o azud, toma, canal y otras) hayan sido construidas exclusivamente para uso hidroeléctrico. Potencia instalada Superior a 10 MW",
          ],
          [
            "b52",
            "[B52] - Centrales hidroeléctricas que hayan sido construidas en infraestructuras existentes (presa, canales o conducciones) o dedicadas a otros usos distintos al hidroeléctrico. Potencia instalada a Superior a 10 MW",
          ],
          [
            "b60",
            "[B60] - Centrales de generación eléctrica o de cogeneración que utilicen como combustible principal biomasa procedente de cultivos energéticos, de actividades agrícolas, ganaderas o de jardinerías, de aprovechamientos forestales y otras operaciones silvícolas en las masas forestales y espacios verdes, en los términos que figuran en el anexo I. Se entenderá como combustible principal aquel combustible que suponga, como mínimo, el 90 por ciento de la energía primaria utilizada, medida por el poder calorífico inferior.",
          ],
          [
            "b71",
            "[B71] - Instalaciones que empleen como combustible principal el biogás de vertederos controlados. Estas instalaciones podrán abastecerse con hasta un 50 por ciento de energía primaria procedente de biogás generado en digestores.",
          ],
          [
            "b72",
            "[B72] - Instalaciones que empleen como combustible principal biolíquidos o el biogás generado en digestores procedente de cultivos energéticos o de restos agrícolas, de deyecciones ganaderas, de residuos biodegradables de instalaciones industriales, de residuos domiciliarios o similares, de lodos de depuración de aguas residuales u otros para los cuales sea de aplicación el proceso de digestión anaerobia, tanto individualmente como en co-digestión. Estas instalaciones podrán abastecerse con hasta un 50 por ciento de energía primaria procedente de biogás de vertederos controlados.",
          ],
          [
            "b80",
            "[B80] - Centrales de generación eléctrica o de cogeneración que utilicen como combustible principal biomasa procedente de instalaciones industriales del sector agrícola o forestal en los términos que figuran en el anexo I. Se entenderá como combustible principal aquel combustible que suponga, como mínimo, el 90 por ciento de la energía primaria utilizada, medida por el poder calorífico inferior.",
          ],
          [
            "c10",
            "[C10] - Centrales que utilicen como combustible principal residuos domésticos y similares.",
          ],
          [
            "c20",
            "[C20] - Centrales que utilicen como combustible principal otros residuos no contemplados en el grupo c.1, combustibles de los grupos b.6, b.7 y b.8 cuando no cumplan con los límites de consumo establecidos para los citados grupos, licores negros y las centrales que a la entrada en vigor de este real decreto estuvieran inscritas en la categoría c) grupo c.3 prevista en el artículo 2.1 del Real Decreto 661/2007, de 25 de mayo, por el que se regula la actividad de producción de energía eléctrica en régimen especial.",
          ],
          [
            "c30",
            "[C30] - Centrales que a la entrada en vigor de este real decreto estuvieran acogidas a la categoría c) grupo c.4 prevista en el artículo 2.1 del Real Decreto 661/2007, de 25 de mayo, utilizando como combustible productos de explotaciones mineras de calidades no comerciales para la generación eléctrica por su elevado contenido en azufre o cenizas, representando los residuos más del 25 por ciento de la energía primaria utilizada.",
          ],
        ],
        string: "Tipo generación",
        type: "selection",
        views: {},
      },
      telephone_text: {
        digits: [16, 2],
        is_function: true,
        readonly: 1,
        size: 32,
        string: "Teléfonos",
        type: "char",
        views: {},
      },
      tensio_normalitzada: {
        context: "",
        domain: [],
        is_function: false,
        relation: "giscedata.tensions.tensio",
        size: 64,
        string: "Tensión normalizada (*)",
        type: "many2one",
        views: {},
      },
      time_tracking_id: {
        context: "",
        domain: [],
        is_function: false,
        relation: "crm.time.tracking",
        size: 64,
        string: "Imputación de tiempo",
        type: "many2one",
        views: {},
      },
      tipus_cups: {
        is_function: false,
        selection: [
          ["01", "Consumo"],
          ["02", "Servicios Auxiliares"],
        ],
        string: "Tipo de CUPS",
        type: "selection",
        views: {},
      },
      tipus_installacio: {
        is_function: false,
        selection: [
          ["01", "Red interior"],
          ["02", "Red interior da varios consumidores (instalación de enlace)"],
          ["03", "Próxima a través de red"],
        ],
        string: "Tipo instalación",
        type: "selection",
        views: {},
      },
      tipus_vivenda: {
        is_function: false,
        selection: [
          ["habitual", "Habitual"],
          ["no_habitual", "No habitual"],
        ],
        string: "Tipo vivienda (*)",
        type: "selection",
        views: {},
      },
      titular_aclarador: {
        is_function: false,
        size: 256,
        string: "Aclarador",
        type: "char",
        views: {},
      },
      titular_apartat_correus: {
        is_function: false,
        size: 5,
        string: "Apartado de Correos",
        type: "char",
        views: {},
      },
      titular_bq: {
        is_function: false,
        size: 4,
        string: "Bloque",
        type: "char",
        views: {},
      },
      titular_cognom1: {
        is_function: false,
        size: 30,
        string: "Apellido 1 (*)",
        type: "char",
        views: {},
      },
      titular_cognom2: {
        is_function: false,
        size: 30,
        string: "Apellido 2",
        type: "char",
        views: {},
      },
      titular_cpa: {
        is_function: false,
        size: 10,
        string: "Parcela",
        type: "char",
        views: {},
      },
      titular_cpo: {
        is_function: false,
        size: 10,
        string: "Polígono",
        type: "char",
        views: {},
      },
      titular_email: {
        is_function: false,
        size: 240,
        string: "Email (*)",
        type: "char",
        views: {},
      },
      titular_es: {
        is_function: false,
        size: 10,
        string: "Escalera",
        type: "char",
        views: {},
      },
      titular_es_empresa: {
        digits: [16, 2],
        is_function: true,
        readonly: 1,
        string: "Es Empresa",
        type: "boolean",
        views: {},
      },
      titular_id_municipi: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.municipi",
        size: 64,
        string: "Municipio",
        type: "many2one",
        views: {},
      },
      titular_id_poblacio: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.poblacio",
        size: 64,
        string: "Población",
        type: "many2one",
        views: {},
      },
      titular_mobile: {
        is_function: false,
        size: 64,
        string: "Móvil (*)",
        type: "char",
        views: {},
      },
      titular_nom: {
        is_function: false,
        size: 256,
        string: "Nombre Cliente / Razón Social (*)",
        type: "char",
        views: {},
      },
      titular_nv: {
        is_function: false,
        size: 256,
        string: "Calle",
        type: "char",
        views: {},
      },
      titular_phone: {
        is_function: false,
        size: 64,
        string: "Teléfono (*)",
        type: "char",
        views: {},
      },
      titular_pnp: {
        is_function: false,
        size: 10,
        string: "Número",
        type: "char",
        views: {},
      },
      titular_pt: {
        is_function: false,
        size: 10,
        string: "Planta",
        type: "char",
        views: {},
      },
      titular_pu: {
        is_function: false,
        size: 10,
        string: "Puerta",
        type: "char",
        views: {},
      },
      titular_tv: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.tipovia",
        size: 64,
        string: "Tipo Vía",
        type: "many2one",
        views: {},
      },
      titular_vat: {
        is_function: false,
        size: 11,
        string: "Nº de Documento (*)",
        type: "char",
        views: {},
      },
      titular_zip: {
        change_default: true,
        is_function: false,
        size: 24,
        string: "Código Postal",
        type: "char",
        views: {},
      },
      use_cont_address: {
        is_function: false,
        string: "Direccion de contacto distinta a la del cliente (*)",
        type: "boolean",
        views: {},
      },
      user_id: {
        context: "",
        domain: [],
        is_function: false,
        relation: "res.users",
        size: 64,
        string: "Responsable",
        type: "many2one",
        views: {},
      },
      workdones_ids: {
        context: "",
        digits: [16, 2],
        domain: [],
        is_function: true,
        relation: "project.task.work",
        string: "desconocido",
        type: "one2many",
        views: {
          tree: {
            arch: '<tree editable="top">\n                                <field name="date"/>\n                                <field name="type_id"/>\n                                <field name="hours" sum="Time spent" widget="float_time"/>\n                                <field name="user_id"/>\n                                <field name="name"/>\t\t\t\t    \n                            </tree>\n                        ',
            fields: {
              date: {
                is_function: false,
                string: "Fecha",
                type: "datetime",
                views: {},
              },
              hours: {
                is_function: false,
                string: "Tiempo dedicado",
                type: "float",
                views: {},
                widget: "float_time",
              },
              name: {
                is_function: false,
                size: 512,
                string: "Resumen del trabajo",
                type: "char",
                views: {},
              },
              type_id: {
                context: "",
                domain: [],
                is_function: false,
                relation: "project.task.work.type",
                size: 64,
                string: "Tipo",
                type: "many2one",
                views: {},
              },
              user_id: {
                context: "",
                domain: [],
                is_function: false,
                relation: "res.users",
                required: true,
                size: 64,
                string: "Realizado por",
                type: "many2one",
                views: {},
              },
            },
          },
        },
      },
    });
    form.parse(arch, {
      values: {
        state: "done",
      },
    });
    const parentPage = form.findById("notebook-parent-page") as Page;
    const notebookTest = form.findById("notebook-test") as Page;
    const notebookChildPage = form.findById("notebook-child-page") as Page;
    expect(parentPage).toBeDefined();
    expect(notebookTest).toBeDefined();
    expect(parentPage.readOnly).toBeTruthy();
    expect(notebookTest.readOnly).toBeTruthy();
    expect(notebookChildPage).toBeDefined();
    expect(notebookChildPage.readOnly).toBeTruthy();
  });
  it("Should be able to get all the context for all fields of a Form", () => {
    const form = new Form(FIELDS);
    form.parse(XML_VIEW_FORM);
    expect(form.contextForFields).toBeDefined();
    expect(Object.keys(form.contextForFields).length).toBeGreaterThan(0);
    expect(form.contextForFields.street).toBeDefined();
    expect(form.contextForFields.street).toEqual({ active_test: false });
  });
  it("Should be able to parse attributes with an undefined char value and exist condition in attrs", () => {
    const arch = `<form><group><alert colspan="4" name="alert1" alert_type="warning" title="Atenci&#243;n" text="Debes introducir un CUPS para iniciar tu oferta correctamente" attrs="{'invisible': [('cups', '!=', False)]}" json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;!=&quot;, &quot;field&quot;: &quot;cups&quot;, &quot;value&quot;: false}], &quot;condition&quot;: &quot;AND&quot;}}"/>
                <alert colspan="2" name="alert2" alert_type="info" title="Atenci&#243;n" text="alert2" attrs="{'invisible': [('cups', '=', False)]}" json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;=&quot;, &quot;field&quot;: &quot;cups&quot;, &quot;value&quot;: false}], &quot;condition&quot;: &quot;AND&quot;}}"/>
             </group><input type="char" name="cups" /></form>`;
    const fields = {
      cups: {
        is_function: false,
        size: 22,
        string: "CUPS (*)",
        type: "char",
        views: {},
      },
    };
    const form = new Form(fields);
    form.parse(arch, { values: { cups: undefined } });
    expect(form.type).toBe("form");
    const alert1 = form.findById("alert1")!;
    const alert2 = form.findById("alert2")!;
    expect(alert1).toBeDefined();
    expect(alert2).toBeDefined();
    expect(alert1.invisible).toBeFalsy();
    expect(alert2.invisible).toBeTruthy();
  });
  it.only("Should not be able to view the Autoconsum tab since it's invisible due to tags and attrs", () => {
    const xml = `
<form string="polisses">
    <notebook
        colspan="6">
        <page name="page-autoconsum" string="Autoconsum"
            attrs="{'invisible':[('autoconsum_id', '=', False)]}" invisible="1"
            json_attrs="{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;=&quot;, &quot;field&quot;: &quot;autoconsum_id&quot;, &quot;value&quot;: false}], &quot;condition&quot;: &quot;AND&quot;}}">
            <field name="autoconsum_id" />
        </page>
    </notebook>
</form>
`;
    const form = new Form({
      autoconsum_id: {
        context: "",
        digits: [16, 2],
        domain: [],
        is_function: true,
        readonly: 1,
        relation: "giscedata.autoconsum",
        string: "Autoconsum",
        type: "many2one",
        views: {},
      },
    });
    form.parse(xml, {
      values: {
        autoconsum_id: [1, "ES0318363477145938GEA000"],
      },
    });
    const pageAutoconsum = form.findById("page-autoconsum") as Page;
    expect(pageAutoconsum).toBeDefined();
    expect(pageAutoconsum.invisible).toBeTruthy();
  });
});
