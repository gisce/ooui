import Form from "../Form";
import Group from "../Group";
import Notebook from "../Notebook";
import Page from "../Page";
import Char from "../Char";
import Label from "../Label";
import Field from "../Field";
import Reference from "../Reference";
import Button from "../Button";

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
            <field name="street" select="2" colspan="4" width="200"/>
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
    help:
      "Used to select automatically the right address according to the context in sales and purchases documents.",
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

/*
function printRow(row, tab) {
  console.log("-".repeat(80));
  row.forEach((el) => {
    const container = el.container || false;
    const prefix = " ".repeat(tab);
    if (container) {
      console.log(prefix, el.type, el.container.columns);
      tab = tab + 4;
      container.rows.forEach((row) => {
        printRow(row, tab);
      });
    } else {
      console.log(prefix, el);
    }
  });
}
*/

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
        </notebook>
    </form>`;
    const form = new Form(fields);
    form.parse(xmlViewForm);

    const notebook = form.container.rows[0][0] as Notebook;
    expect(notebook).toBeInstanceOf(Notebook);
    const page = notebook.container.rows[0][0] as Page;
    expect(page).toBeInstanceOf(Page);
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
  });

  it("should properly parse a password field", () => {
    const arch =
      '<group><field name="password" password="True" readonly="0"/></group>';
    const fields = {
      password: {
        help:
          "Keep empty if you don't want the user to be able to connect on the system.",
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
    const arch = '<group><field name="password" readonly="0"/></group>';
    const fields = {
      password: {
        help:
          "Keep empty if you don't want the user to be able to connect on the system.",
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
      "Field example doesn't exist in fields defintion"
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
      '<form><group><button name="button" states="draft,pending,complete" /></group></form>';
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
    expect(form.context.cups_id).toBe(99);
    expect(form.context.test_string).toBe("test");
    expect(form.context.power).toBeUndefined();

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
    };
    const xmlViewForm = `<?xml version="1.0"?>
    <form string="Form1">
      <field name="field_id" colspan="4" nolabel="1" />
      <field name="field_char" on_change="on_change_partner_address_id(partner_address_id, context)" colspan="4" nolabel="1"  />
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
      "on_change_partner_address_id"
    );
    expect(form.onChangeFields!["field_char"].args).toBeDefined();
    expect(form.onChangeFields!["field_char"].args[0]).toBe(
      "partner_address_id"
    );
    expect(form.onChangeFields!["field_char"].args[1]).toBe("context");
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
      }
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
      domain: [["foo", "=", "test"]],
    });

    const field_id = form.findById("field_id");
    const field_char = form.findById("field_char");

    expect(field_id!.domain.length).toBe(1);
    expect(field_id!.domain[0].length).toBe(3);
    expect(field_id!.domain[0][0]).toBe("id");
    expect(field_id!.domain[0][1]).toBe("=");
    expect(field_id!.domain[0][2]).toBe(43);

    expect(field_char!.domain.length).toBe(0);
  });
});
