import Tree from "../Tree";
import Char from "../Char";
import FloatTime from "../FloatTime";

const XML_VIEW_TREE = `<?xml version="1.0"?>
<tree string="Partners" colors="red:debt_amount&gt;0 &amp; city!=''" status="red:debt_amount&gt;0;green:debt_amount==0">
  <field name="name"/>
  <field name="title"/>
  <field name="ref"/>
  <field name="debt_amount"/>
  <field name="city" select="2"/>
  <field name="country" select="2"/>
  <field name="lang"/>
</tree>
`;

const FIELDS = {
  city: {
    digits: [16, 2],
    string: "City",
    type: "char",
    views: {},
  },
  country: {
    context: "",
    digits: [16, 2],
    domain: [],
    relation: "res.country",
    string: "Country",
    type: "many2one",
    views: {},
  },
  lang: {
    help:
      "If the selected language is loaded in the system, all documents related to this partner will be printed in this language. If not, it will be english.",
    selection: [
      ["en_US", "English"],
      ["ca_ES", "Catalan / Català"],
      ["es_ES", "Spanish / Español"],
      ["", ""],
    ],
    size: 5,
    string: "Language",
    type: "selection",
    views: {},
  },
  name: {
    required: true,
    select: true,
    size: 128,
    string: "Name",
    type: "char",
    views: {},
  },
  ref: {
    select: true,
    size: 64,
    string: "Code",
    type: "char",
    views: {},
  },
  debt_amount: {
    type: "integer",
    string: "Debt amount",
    views: {}
  },
  title: {
    selection: [
      ["Corp.", "Corp."],
      ["ltd", "Ltd"],
      ["", ""],
    ],
    size: 32,
    string: "Title",
    type: "selection",
    views: {},
  },
};
describe("A Tree", () => {
  it("should parse xml", () => {
    const tree = new Tree(FIELDS);
    tree.parse(XML_VIEW_TREE);

    expect(tree.fields).toBeDefined();
    expect(tree.columns.length).toBe(7);
    const nameWidget = tree.findById("name") as Char;
    expect(nameWidget.label).toBe("Name");
    expect(tree.colors).toBeDefined();
    expect(tree.colors).toBe("red:debt_amount>0 & city!=''")
    expect(tree.status).toBeDefined();
    expect(tree.status).toBe("red:debt_amount>0;green:debt_amount==0")
  });
  it("Must throw an error if a field isn't present in field definitions", () => {
    const parseInvalidTree = () => {
      const tree = new Tree({});
      tree.parse(`<tree string="Partners"><field name="name"/></tree>`);
    };

    expect(parseInvalidTree).toThrow(
      "Field name doesn't exist in fields defintion"
    );
  });

  it("Should parse tree string title properly", () => {
    const tree = new Tree({
      name: {
        required: true,
        select: true,
        size: 128,
        string: "Name",
        type: "char",
        views: {},
      },
    });
    tree.parse(`<tree string="Comunicaci&#xF3;n"><field name="name"/></tree>`);
    const treeTitle = tree.string;
    expect(treeTitle).toBe("Comunicación");
  });

  it("Should parse tree string title as null if we don't pass it", () => {
    const tree = new Tree({
      name: {
        required: true,
        select: true,
        size: 128,
        string: "Name",
        type: "char",
        views: {},
      },
    });
    tree.parse(`<tree><field name="name"/></tree>`);
    const treeTitle = tree.string;
    expect(treeTitle).toBeNull();
  });

  it("Should be able to retrieve type from Tree instance", () => {
    const tree = new Tree({
      name: {
        required: true,
        select: true,
        size: 128,
        string: "Name",
        type: "char",
        views: {},
      },
    });
    tree.parse(`<tree><field name="name"/></tree>`);
    expect(tree.type).toBe("tree");
  });

  it("Must parse colors", () => {
    const tree = new Tree({
      name: {
        required: true,
        select: true,
        size: 128,
        string: "Name",
        type: "char",
        views: {},
      },
    });
    tree.parse(
      `<tree string="Partners" colors="red:type=='updated'"><field name="name"/></tree>`
    );
    expect(tree.colors!).toBe("red:type=='updated'");
  });

  it("Must parse sum fields", () => {
    const tree = new Tree({
      name: {
        required: true,
        select: true,
        size: 128,
        string: "Name",
        type: "char",
        views: {},
      },
    });
    tree.parse(
      `<tree string="Partners" colors="red:type=='updated'"><field name="name" sum="Name" /></tree>`
    );
    const nameWidget = tree.findById("name") as Char;
    expect(nameWidget.sum).toBe("Name");
  });

  it("Must priorize widget attributes", () => {
    const tree = new Tree({
      "date": {
        "string": "Data",
        "type": "datetime",
        "views": {}
      },
      "hours": {
        "string": "Temps dedicat",
        "type": "float",
        "views": {}
      },
      "name": {
        "size": 512,
        "string": "Resum del treball",
        "type": "char",
        "views": {}
      },
      "project_id": {
        "context": "",
        "digits": [
          16,
          2
        ],
        "domain": [],
        "readonly": true,
        "relation": "project.project",
        "string": "Projecte",
        "type": "many2one",
        "views": {}
      },
      "task_id": {
        "context": "",
        "domain": [],
        "relation": "project.task",
        "required": true,
        "size": 64,
        "string": "Tasca",
        "type": "many2one",
        "views": {}
      },
      "type_id": {
        "context": "",
        "domain": [],
        "relation": "project.task.work.type",
        "size": 64,
        "string": "Tipus",
        "type": "many2one",
        "views": {}
      },
      "user_id": {
        "context": "",
        "domain": [],
        "relation": "res.users",
        "required": true,
        "size": 64,
        "string": "Realitzat per",
        "type": "many2one",
        "views": {}
      }
    });
    tree.parse(`<tree string="Treballs Realitzats">
    <field name="project_id"/>
    <field name="task_id"/>
    <field name="type_id"/>
<field name="name"/>
    <field name="date"/>
    <field name="hours" widget="float_time" sum="Total hores efectives"/>
    <field name="user_id"/>
</tree>`)

  const nameWidget = tree.findById("hours");
  expect(nameWidget).toBeInstanceOf(FloatTime);

  });

  it("Must ignore invisible fields as columns", () => {
    const tree = new Tree({
      name: {
        required: true,
        select: true,
        size: 128,
        string: "Name",
        type: "char",
        views: {},
      },
      surnames: {
        required: true,
        select: true,
        size: 128,
        string: "Surnames",
        type: "char",
        views: {},
        invisible: true,
      },
      city: {
        required: true,
        select: true,
        size: 128,
        string: "City",
        type: "char",
        views: {},
      },
    });
    tree.parse(
      `<tree string="Partners" colors="red:type=='updated'"><field name="name" sum="Name" invisible="1" /><field name="surnames" sum="Surnames" /><field name="city" sum="City" /></tree>`
    );

    const nameWidget = tree.findById("name") as Char;
    const surnamesWidget = tree.findById("surnames") as Char;
    const cityWidget = tree.findById("city") as Char;

    expect(nameWidget).toBeUndefined();
    expect(surnamesWidget).toBeUndefined();
    expect(cityWidget!.id).toBe("city");
    expect(tree.editable).toBeNull();
  });

  it("Must parse an editable tree", () => {
    const tree = new Tree({
      name: {
        required: true,
        select: true,
        size: 128,
        string: "Name",
        type: "char",
        views: {},
      },
      surnames: {
        required: true,
        select: true,
        size: 128,
        string: "Surnames",
        type: "char",
        views: {},
        invisible: true,
      },
      city: {
        required: true,
        select: true,
        size: 128,
        string: "City",
        type: "char",
        views: {},
      },
    });
    tree.parse(
      `<tree string="Partners" editable="top" colors="red:type=='updated'"><field name="name" sum="Name" invisible="1" /><field name="surnames" sum="Surnames" /><field name="city" sum="City" /></tree>`
    );

    expect(tree.editable).toBe("top");
  });
});
