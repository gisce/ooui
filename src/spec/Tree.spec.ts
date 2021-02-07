import Tree from "../Tree";
import Char from "../Char";

const XML_VIEW_TREE = `<tree string="Partners">
  <field name="name"/>
  <field name="title"/>
  <field name="ref"/>
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
    expect(tree.columns.length).toBe(6);
    const nameWidget = tree.findById("name") as Char;
    expect(nameWidget.label).toBe("Name");
  });
});
