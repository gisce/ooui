import SearchFilter from "../SearchFilter";

const searchFields = {
  primary: [
    "name",
    "ref",
    "emails",
    "customer",
    "address",
    "payment_type_customer",
    "vat",
    "payment_type_supplier",
    "date",
    "comercial",
  ],
  secondary: [
    "lang",
    "credit_limit",
    "user_id",
    "bank_ids",
    "energy_sector",
    "has_debt",
    "credit",
    "debit",
    "active",
    "supplier",
    "category_id",
  ],
};

const fields = {
  active: {
    string: "Active",
    type: "boolean",
    views: {},
  },
  address: {
    context: "",
    domain: [],
    inv_field: "partner_id",
    relation: "res.partner.address",
    string: "Contacts",
    type: "one2many",
    views: {
      form: {
        arch:
          '<form string="Partner Contacts">\n                                    <notebook>\n                                        <page string="General">\n                                            <field name="name" select="2" required="True"/>\n                                            <field domain="[(\'domain\', \'=\', \'contact\')]" name="title" string="Type"/>\n                                            <field name="function"/>\n                                            <field name="type" select="2"/>\n                                            <separator string="Street" colspan="4"/>\n                                            <field name="street" select="2" colspan="4" width="200"/>\n                                            <group colspan="2" col="4">\n                        <field name="tv" select="2"/>\n                        <newline/>\n                        <field name="nv" colspan="4"/>\n                    </group>\n                    <group colspan="2" col="8">\n                        <field name="pnp"/>\n                        <field name="es"/>\n                        <field name="pt"/>\n                        <field name="pu"/>\n                        <field name="bq" colspan="1"/>\n                        <field name="aclarador" colspan="5"/>\n                    </group>\n                <field name="street2"/>\n                                            <newline/>\n                                            <field name="zip" select="2"/>\n                                            <field name="apartat_correus"/>\n                    <newline/>\n                <newline/>\n                                            <field name="id_municipi" on_change="onchange_municipi_id(id_municipi,context)"/>\n                    <field name="id_poblacio" domain="[(\'municipi_id\',\'=\',id_municipi)]"/>\n                <field name="state_id" select="2"/>\n                                            <field completion="1" name="country_id" select="2"/>\n                                            <newline/>\n                                            <separator string="Catastre" colspan="4"/>\n                    <field name="ref_catastral"/>\n                <separator string="Comunication channels" colspan="4"/>\n                                            <field name="phone"/>\n                                            <field name="fax"/>\n                                            <newline/>\n                                            <field name="mobile"/>\n                                            <field name="email" select="2" widget="email"/>\n                                        </page>\n                                        <page string="Notes">\n                                            <field name="notes" nolabel="1" colspan="4"/>\n                                        </page>\n                                    </notebook>\n                                </form>\n                                ',
        fields: {
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
          bq: {
            size: 4,
            string: "Bloc",
            type: "char",
            views: {},
          },
          country_id: {
            context: "",
            domain: [],
            relation: "res.country",
            size: 64,
            string: "Country",
            type: "many2one",
            views: {},
          },
          email: {
            size: 240,
            string: "E-Mail",
            type: "char",
            views: {},
          },
          es: {
            size: 10,
            string: "Escala",
            type: "char",
            views: {},
          },
          fax: {
            size: 64,
            string: "Fax",
            type: "char",
            views: {},
          },
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
          mobile: {
            size: 64,
            string: "Mobile",
            type: "char",
            views: {},
          },
          name: {
            size: 128,
            string: "Contact Name",
            type: "char",
            views: {},
          },
          notes: {
            string: "Notes",
            type: "text",
            views: {},
          },
          nv: {
            size: 256,
            string: "Carrer",
            type: "char",
            views: {},
          },
          phone: {
            size: 64,
            string: "Phone",
            type: "char",
            views: {},
          },
          pnp: {
            size: 10,
            string: "Número",
            type: "char",
            views: {},
          },
          pt: {
            size: 10,
            string: "Planta",
            type: "char",
            views: {},
          },
          pu: {
            size: 10,
            string: "Porta",
            type: "char",
            views: {},
          },
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
          street2: {
            size: 128,
            string: "Street2",
            type: "char",
            views: {},
          },
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
        },
      },
      tree: {
        arch:
          '<tree string="Partner Contacts">\n                                    <field name="name"/>\n                                    <field name="street"/>\n                    <field name="type"/>\n                <field name="zip"/>\n                                    <field name="city"/>\n                                    <field name="country_id"/>\n                                    <field name="phone"/>\n                                    <field name="email"/>\n                                </tree>\n                            ',
        fields: {
          city: {
            size: 128,
            string: "City",
            type: "char",
            views: {},
          },
          country_id: {
            context: "",
            domain: [],
            relation: "res.country",
            size: 64,
            string: "Country",
            type: "many2one",
            views: {},
          },
          email: {
            size: 240,
            string: "E-Mail",
            type: "char",
            views: {},
          },
          name: {
            size: 128,
            string: "Contact Name",
            type: "char",
            views: {},
          },
          phone: {
            size: 64,
            string: "Phone",
            type: "char",
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
        },
      },
    },
  },
  bank_ids: {
    context: "",
    domain: [],
    inv_field: "partner_id",
    relation: "res.partner.bank",
    string: "Banks",
    type: "one2many",
    views: {
      form: {
        arch:
          '<form string="Bank account">\n                            <field name="state" select="2"/>\n                            <newline/>\n                            <field name="acc_number" on_change="onchange_banco(acc_number, acc_country_id, context)"/>\n                <field name="acc_country_id" on_change="onchange_banco(acc_number, acc_country_id, context)"/>\n            <newline/>\n                    <field name="iban" on_change="onchange_iban(iban, context)"/>\n            <newline/>\n                    <field name="printable_iban"/>\n                    <newline/>\n                <newline/>\n                            <field name="bank"/>\n                            <newline/>\n                            <field name="sequence"/>\n                            <field name="default_bank"/>\n            <field colspan="4" name="name" select="2"/>\n                            <separator colspan="4" string="Bank account owner"/>\n                            <field colspan="4" name="owner_name" select="2" invisible="1"/>\n                    <field colspan="4" name="owner_id" required="0"/>\n                <field colspan="4" name="street" invisible="1"/>\n                    <field colspan="4" name="owner_address_id" domain="[(\'partner_id\', \'=\', owner_id)]"/>\n                <newline/>\n                            <field name="zip" invisible="1"/>\n                <field name="city" invisible="1"/>\n                <newline/>\n                            <field invisible="1" name="country_id" select="2"/>\n                <field name="state_id" select="2" invisible="1"/>\n                </form>\n                        ',
        fields: {
          acc_country_id: {
            context: "",
            domain: [],
            help:
              "If the country of the bank is Spain, it validates the bank code. It only reads the digit characters of the bank code:\n- If the number of digits is 18, computes the two digits of control.\n- If the number of digits is 20, computes the two digits of control and ignores the current ones.\n- If the number of digits is different from 18 or 20, it leaves the bank code unaltered.\nThe result is shown in the '1234 5678 06 1234567890' format.",
            relation: "res.country",
            required: true,
            size: 64,
            string: "Bank country",
            type: "many2one",
            views: {},
          },
          acc_number: {
            size: 64,
            states: {
              bank: [
                ["readonly", false],
                ["required", true],
              ],
              iban: [
                ["readonly", true],
                ["required", false],
              ],
            },
            string: "Account Number",
            type: "char",
            views: {},
          },
          bank: {
            context: "",
            domain: [],
            relation: "res.bank",
            size: 64,
            string: "Bank",
            type: "many2one",
            views: {},
          },
          city: {
            digits: [16, 2],
            readonly: 1,
            size: 128,
            string: "City",
            type: "char",
            views: {},
          },
          country_id: {
            context: "",
            digits: [16, 2],
            domain: [],
            readonly: 1,
            relation: "res.country",
            states: {
              bank: [
                ["readonly", true],
                ["required", false],
              ],
              iban: [
                ["readonly", false],
                ["required", false],
              ],
            },
            string: "Country",
            type: "many2one",
            views: {},
          },
          default_bank: {
            string: "Default",
            type: "boolean",
            views: {},
          },
          iban: {
            help: "International Bank Account Number",
            readonly: true,
            size: 34,
            states: {
              iban: [
                ["readonly", false],
                ["required", true],
              ],
            },
            string: "IBAN",
            type: "char",
            views: {},
          },
          name: {
            size: 128,
            string: "Description",
            type: "char",
            views: {},
          },
          owner_address_id: {
            context: "",
            domain: [],
            relation: "res.partner.address",
            select: true,
            size: 64,
            string: "Owner Address",
            type: "many2one",
            views: {},
          },
          owner_id: {
            context: "",
            domain: [],
            help:
              "If no owner is selected, the related partner will be used as owner",
            relation: "res.partner",
            required: true,
            select: true,
            size: 64,
            string: "Owner",
            type: "many2one",
            views: {},
          },
          owner_name: {
            digits: [16, 2],
            readonly: 1,
            size: 128,
            string: "Account Owner",
            type: "char",
            views: {},
          },
          printable_iban: {
            digits: [16, 2],
            help: "Space formated International Bank Account Number",
            readonly: 1,
            size: 42,
            string: "Printable IBAN",
            type: "char",
            views: {},
          },
          sequence: {
            string: "Sequence",
            type: "integer",
            views: {},
          },
          state: {
            change_default: true,
            required: true,
            selection: [
              ["bank", "Bank account"],
              ["iban", "IBAN Account"],
            ],
            string: "Bank Type",
            type: "selection",
            views: {},
          },
          state_id: {
            context: "",
            digits: [16, 2],
            domain: [],
            readonly: 1,
            relation: "res.country.state",
            string: "State",
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
          zip: {
            digits: [16, 2],
            readonly: 1,
            size: 24,
            states: {
              iban: [
                ["readonly", false],
                ["required", false],
              ],
            },
            string: "Zip",
            type: "char",
            views: {},
          },
        },
      },
      tree: {
        arch:
          '<tree string="Bank Details">\n                            <field name="state"/>\n                            <field name="bank"/>\n                            <field name="owner_name"/>\n                            <field name="acc_number"/>\n                        <field name="iban"/>\n                <field name="default_bank"/>\n            </tree>\n                    ',
        fields: {
          acc_number: {
            size: 64,
            states: {
              bank: [
                ["readonly", false],
                ["required", true],
              ],
              iban: [
                ["readonly", true],
                ["required", false],
              ],
            },
            string: "Account Number",
            type: "char",
            views: {},
          },
          bank: {
            context: "",
            domain: [],
            relation: "res.bank",
            size: 64,
            string: "Bank",
            type: "many2one",
            views: {},
          },
          default_bank: {
            string: "Default",
            type: "boolean",
            views: {},
          },
          iban: {
            help: "International Bank Account Number",
            readonly: true,
            size: 34,
            states: {
              iban: [
                ["readonly", false],
                ["required", true],
              ],
            },
            string: "IBAN",
            type: "char",
            views: {},
          },
          owner_name: {
            digits: [16, 2],
            readonly: 1,
            size: 128,
            string: "Account Owner",
            type: "char",
            views: {},
          },
          state: {
            change_default: true,
            required: true,
            selection: [
              ["bank", "Bank account"],
              ["iban", "IBAN Account"],
            ],
            string: "Bank Type",
            type: "selection",
            views: {},
          },
        },
      },
    },
  },
  category_id: {
    context: "",
    domain: [],
    relation: "res.partner.category",
    string: "Categories",
    type: "many2many",
    views: {},
  },
  comercial: {
    select: true,
    size: 128,
    string: "Trade name",
    type: "char",
    views: {},
  },
  comment: {
    string: "Notes",
    type: "text",
    views: {},
  },
  credit: {
    digits: [16, 2],
    help: "Total amount this customer owes you.",
    readonly: 1,
    string: "Total Receivable",
    type: "float",
    views: {},
  },
  credit_limit: {
    string: "Credit Limit",
    type: "float",
    views: {},
  },
  customer: {
    help: "Check this box if the partner is a customer.",
    string: "Customer",
    type: "boolean",
    views: {},
  },
  date: {
    select: 1,
    string: "Date",
    type: "date",
    views: {},
  },
  debit: {
    digits: [16, 2],
    help: "Total amount you have to pay to this supplier.",
    readonly: 1,
    string: "Total Payable",
    type: "float",
    views: {},
  },
  emails: {
    digits: [16, 2],
    readonly: 1,
    string: "Emails",
    type: "text",
    views: {},
  },
  energy_sector: {
    digits: [16, 2],
    readonly: 1,
    selection: [
      ["electric", "Electric"],
      ["gas", "Gas"],
      ["elegas", "Electric & Gas"],
      ["undefined", "Indefinit"],
    ],
    string: "Sector d'energía",
    type: "selection",
    views: {},
  },
  events: {
    context: "",
    domain: [],
    inv_field: "partner_id",
    relation: "res.partner.event",
    string: "Events",
    type: "one2many",
    views: {},
  },
  has_debt: {
    digits: [16, 2],
    readonly: 1,
    string: "Has debt",
    type: "boolean",
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
  ov_users_ids: {
    context: {
      active_test: false,
    },
    domain: [],
    inv_field: "partner_id",
    relation: "ov.users",
    string: "Usuaris Oficina Virtual",
    type: "one2many",
    views: {},
  },
  parent_id: {
    context: "",
    domain: [],
    relation: "res.partner",
    select: 2,
    size: 64,
    string: "Main Company",
    type: "many2one",
    views: {},
  },
  payment_type_customer: {
    context: "",
    domain: [],
    help: "Payment type of the customer",
    relation: "payment.type",
    size: 64,
    string: "Customer payment type",
    type: "many2one",
    views: {},
  },
  payment_type_supplier: {
    context: "",
    domain: [],
    help: "Payment type of the supplier",
    relation: "payment.type",
    size: 64,
    string: "Supplier payment type",
    type: "many2one",
    views: {},
  },
  property_account_debtor: {
    context: "",
    digits: [16, 2],
    domain: "[('type', '=', 'receivable')]",
    help:
      "This account will be used as the debtor account for the current partner",
    relation: "account.account",
    required: true,
    string: "Account Debtor",
    type: "many2one",
    views: {},
  },
  property_account_payable: {
    context: "",
    digits: [16, 2],
    domain: "[('type', '=', 'payable')]",
    help:
      "This account will be used instead of the default one as the payable account for the current partner",
    relation: "account.account",
    required: true,
    string: "Account Payable",
    type: "many2one",
    views: {},
  },
  property_account_position: {
    context: "",
    digits: [16, 2],
    domain: [],
    help:
      "The fiscal position will determine taxes and the accounts used for the the partner.",
    relation: "account.fiscal.position",
    string: "Fiscal Position",
    type: "many2one",
    views: {},
  },
  property_account_receivable: {
    context: "",
    digits: [16, 2],
    domain: "[('type', '=', 'receivable')]",
    help:
      "This account will be used instead of the default one as the receivable account for the current partner",
    relation: "account.account",
    required: true,
    string: "Account Receivable",
    type: "many2one",
    views: {},
  },
  property_payment_term: {
    context: "",
    digits: [16, 2],
    domain: [],
    help:
      "This payment term will be used instead of the default one for the current partner",
    relation: "account.payment.term",
    string: "Payment Term",
    type: "many2one",
    views: {},
  },
  property_product_pricelist: {
    context: "",
    digits: [16, 2],
    domain: [["type", "=", "sale"]],
    help:
      "This pricelist will be used, instead of the default one,                     for sales to the current partner",
    relation: "product.pricelist",
    string: "Sale Pricelist",
    type: "many2one",
    views: {},
  },
  property_product_pricelist_purchase: {
    context: "",
    digits: [16, 2],
    domain: [["type", "=", "purchase"]],
    help:
      "This pricelist will be used, instead of the default one, for purchases from the current partner",
    relation: "product.pricelist",
    string: "Purchase Pricelist",
    type: "many2one",
    views: {},
  },
  property_stock_customer: {
    context: "",
    digits: [16, 2],
    domain: [],
    help:
      "This stock location will be used, instead of the default one, as the destination location for goods you send to this partner",
    relation: "stock.location",
    string: "Customer Location",
    type: "many2one",
    views: {},
  },
  property_stock_supplier: {
    context: "",
    digits: [16, 2],
    domain: [],
    help:
      "This stock location will be used, instead of the default one, as the source location for goods you receive from the current partner",
    relation: "stock.location",
    string: "Supplier Location",
    type: "many2one",
    views: {},
  },
  property_switching_xml_encoding: {
    context: "",
    digits: [16, 2],
    domain: [["name", "!=", false]],
    help:
      "Encoding XML amb el qual es generaran els XML's de switching per aquesta empresa",
    relation: "giscedata.switching.xml.encoding",
    required: true,
    string: "Encoding XML switching",
    type: "many2one",
    views: {},
  },
  ref: {
    select: true,
    size: 64,
    string: "Code",
    type: "char",
    views: {},
  },
  ref2: {
    size: 6,
    string: "Ref2",
    type: "char",
    views: {},
  },
  representante_id: {
    context: "",
    domain: [],
    relation: "res.partner",
    size: 64,
    string: "Representante",
    type: "many2one",
    views: {},
  },
  supplier: {
    help:
      "Check this box if the partner is a supplier. If it's not checked, purchase people will not see it when encoding a purchase order.",
    string: "Supplier",
    type: "boolean",
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
  total_debt: {
    digits: [16, 2],
    help: "Total amount this customer debts you.",
    readonly: 1,
    string: "Total Debt",
    type: "float",
    views: {},
  },
  user_id: {
    context: "",
    domain: [],
    help:
      "The internal user that is in charge of communicating with this partner if any.",
    relation: "res.users",
    size: 64,
    string: "Dedicated Salesman",
    type: "many2one",
    views: {},
  },
  vat: {
    help:
      "Value Added Tax number. Check the box if the partner is subjected to the VAT. Used by the VAT legal statement.",
    select: true,
    size: 32,
    string: "VAT",
    type: "char",
    views: {},
  },
  vat_subjected: {
    help:
      "Check this box if the partner is subjected to the VAT. It will be used for the VAT legal statement.",
    string: "VAT Legal Statement",
    type: "boolean",
    views: {},
  },
  website: {
    size: 64,
    string: "Website",
    type: "char",
    views: {},
  },
};

describe("A SearchFilter", () => {
  it("should parse search fields correctly", () => {
    const searchFilter = new SearchFilter(searchFields, fields);
    searchFilter.parse();

    expect(searchFilter.fields).toBeDefined();
    expect(searchFilter.simpleSearchContainer.rows.length).toBe(3);
    expect(searchFilter.simpleSearchContainer.rows[0].length).toBe(4);
    expect(searchFilter.simpleSearchContainer.rows[1].length).toBe(4);
    expect(searchFilter.simpleSearchContainer.rows[2].length).toBe(2);

    expect(searchFilter.advancedSearchContainer.rows.length).toBe(6);
    expect(searchFilter.advancedSearchContainer.rows[0].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[1].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[2].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[3].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[4].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[5].length).toBe(1);

    const nameWidget = searchFilter.findById("name");
    expect(nameWidget).toBeDefined();
    expect(nameWidget!.constructor.name).toBe("Char");
    const debitWidget = searchFilter.findById("debit");
    expect(debitWidget).toBeDefined();
    expect(debitWidget!.constructor.name).toBe("Float");
    const debitWidgetInSimpleSearch = searchFilter.simpleSearchContainer.findById(
      "debit"
    );
    expect(debitWidgetInSimpleSearch).toBeNull();
  });
});
