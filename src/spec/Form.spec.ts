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
  })
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
      "on_change_partner_address_id"
    );
    expect(form.onChangeFields!["field_char"].args).toBeDefined();
    expect(form.onChangeFields!["field_char"].args[0]).toBe(
      "partner_address_id"
    );
    expect(form.onChangeFields!["field_char"].args[1]).toBe("'foo'");
    expect(form.onChangeFields!["field_char"].args[2]).toBe("context");

    const fieldOther = form.findById("field_other") as Field;
    expect(fieldOther).toBeDefined();

    expect(form.onChangeFields!["field_other"].method).toBe(
      "product_id_change"
    );
    expect(form.onChangeFields!["field_other"].args[0]).toBe(
      "parent.pricelist_id"
    );
    expect(form.onChangeFields!["field_other"].args[8]).toBe(
      "'lang' in context and context['lang']"
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
      "[('tarifes_atr_compatibles', '=', tarifa), ('type', '=', 'sale')]"
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
});
