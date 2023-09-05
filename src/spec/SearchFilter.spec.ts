import SearchFilter from "../SearchFilter";

const searchFields = {
  primary: [
    "name",
    "ref",
    "emails",
    "customer",
    "address",
    "payment_type_customer",
    "payment_type_customer_switch",
    "codigo_contable",
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
    "city",
    "country",
  ],
};

const fields = {
  active: {
    is_function: false,
    string: "Activo",
    type: "boolean",
    views: {},
  },
  address: {
    context: "",
    domain: [],
    inv_field: "partner_id",
    is_function: false,
    relation: "res.partner.address",
    string: "Contactos",
    type: "one2many",
    views: {},
  },
  bank_ids: {
    context: "",
    domain: [],
    inv_field: "partner_id",
    is_function: false,
    relation: "res.partner.bank",
    string: "Bancos",
    type: "one2many",
  },
  category_id: {
    context: "",
    domain: [],
    is_function: false,
    relation: "res.partner.category",
    string: "Categorías",
    type: "many2many",
    views: {},
  },
  codigo_contable: {
    is_function: false,
    size: 5,
    string: "Código contable",
    type: "char",
    views: {},
  },
  comercial: {
    is_function: false,
    select: true,
    size: 128,
    string: "Nombre comercial",
    type: "char",
    views: {},
  },
  comment: {
    is_function: false,
    string: "Notas",
    type: "text",
    views: {},
  },
  credit: {
    digits: [16, 2],
    help: "Importe total que este cliente le debe.",
    is_function: true,
    readonly: 1,
    string: "Total a cobrar",
    type: "float",
    views: {},
  },
  credit_limit: {
    is_function: false,
    string: "Crédito concedido",
    type: "float",
    views: {},
  },
  customer: {
    help: "Marque esta opción si la empresa es un cliente.",
    is_function: false,
    string: "Cliente",
    type: "boolean",
    views: {},
  },
  date: {
    is_function: false,
    select: 1,
    string: "Fecha",
    type: "date",
    views: {},
  },
  debit: {
    digits: [16, 2],
    help: "Importe total que debe pagar a este proveedor.",
    is_function: true,
    readonly: 1,
    string: "Total a pagar",
    type: "float",
    views: {},
  },
  emails: {
    digits: [16, 2],
    is_function: true,
    readonly: 1,
    string: "Emails",
    type: "text",
    views: {},
  },
  energy_sector: {
    digits: [16, 2],
    is_function: true,
    readonly: 1,
    selection: [
      ["electric", "Electric"],
      ["gas", "Gas"],
      ["elegas", "Electric & Gas"],
      ["undefined", "Indefinido"],
    ],
    string: "Sector de energía",
    type: "selection",
    views: {},
  },
  events: {
    context: "",
    domain: [],
    inv_field: "partner_id",
    is_function: false,
    relation: "res.partner.event",
    string: "Eventos",
    type: "one2many",
    views: {},
  },
  has_debt: {
    digits: [16, 2],
    is_function: true,
    readonly: 1,
    string: "Tiene deuda",
    type: "boolean",
    views: {},
  },
  lang: {
    help: "Si el idioma seleccionado está instalado en el sistema, todos los documentos relacionados con esta empresa serán mostrados en este idioma. Si no, serán mostrados en inglés.",
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
  name: {
    is_function: false,
    required: true,
    select: true,
    size: 128,
    string: "Nombre",
    type: "char",
    views: {},
  },
  ov_users_ids: {
    context: { active_test: false },
    domain: [],
    inv_field: "partner_id",
    is_function: false,
    relation: "ov.users",
    string: "Usuarios Oficina Virtual",
    type: "one2many",
    views: {},
  },
  parent_id: {
    context: "",
    domain: [],
    is_function: false,
    relation: "res.partner",
    select: 2,
    size: 64,
    string: "Empresa principal",
    type: "many2one",
    views: {},
  },
  payment_type_customer_switch: {
    type: "boolean",
    widget: "switch",
  },
  payment_type_customer: {
    context: "",
    domain: [],
    help: "Tipo de pago como cliente.",
    is_function: false,
    relation: "payment.type",
    size: 64,
    string: "Tipo de pago de cliente",
    type: "many2one",
    widget: "selection",
    views: {},
  },
  payment_type_supplier: {
    context: "",
    domain: [],
    help: "Tipo de pago como proveedor.",
    is_function: false,
    relation: "payment.type",
    size: 64,
    string: "Tipo de pago de proveedor",
    type: "many2one",
    views: {},
  },
  property_account_debtor: {
    context: "",
    digits: [16, 2],
    domain: "[('type', '=', 'receivable')]",
    help: "Esta cuenta se utilizará como la cuenta de deudor de la empresa actual",
    is_function: true,
    relation: "account.account",
    required: true,
    string: "Cuenta deudor",
    type: "many2one",
    views: {},
  },
  property_account_payable: {
    context: "",
    digits: [16, 2],
    domain: "[('type', '=', 'payable')]",
    help: "Este cuenta se utilizará en lugar de la cuenta por defecto como la cuenta a pagar para la empresa actual.",
    is_function: true,
    relation: "account.account",
    required: true,
    string: "Cuenta a pagar",
    type: "many2one",
    views: {},
  },
  property_account_position: {
    context: "",
    digits: [16, 2],
    domain: [],
    help: "La posición fiscal determinará los impuestos y las cuentas utilizadas para la empresa.",
    is_function: true,
    relation: "account.fiscal.position",
    string: "Posición fiscal",
    type: "many2one",
    views: {},
  },
  property_account_receivable: {
    context: "",
    digits: [16, 2],
    domain: "[('type', '=', 'receivable')]",
    help: "Esta cuenta se utilizará en lugar de la cuenta por defecto como la cuenta a cobrar para la empresa actual.",
    is_function: true,
    relation: "account.account",
    required: true,
    string: "Cuenta a cobrar",
    type: "many2one",
    views: {},
  },
  property_payment_term: {
    context: "",
    digits: [16, 2],
    domain: [],
    help: "Este plazo de pago se utilizará en lugar del plazo por defecto para la empresa actual.",
    is_function: true,
    relation: "account.payment.term",
    string: "Plazo de pago",
    type: "many2one",
    views: {},
  },
  property_product_pricelist: {
    context: "",
    digits: [16, 2],
    domain: [["type", "=", "sale"]],
    help: "Esta tarifa será usada en lugar de la tarifa por defecto para las ventas a la empresa actual.",
    is_function: true,
    relation: "product.pricelist",
    string: "Tarifa de venta",
    type: "many2one",
    views: {},
  },
  property_product_pricelist_purchase: {
    context: "",
    digits: [16, 2],
    domain: [["type", "=", "purchase"]],
    help: "Esta tarifa será utilizada en lugar de la por defecto para las compras de la empresa actual",
    is_function: true,
    relation: "product.pricelist",
    string: "Tarifa de compra",
    type: "many2one",
    views: {},
  },
  property_stock_customer: {
    context: "",
    digits: [16, 2],
    domain: [],
    help: "Esta ubicación de stock será utilizada, en lugar de la ubicación por defecto, como la ubicación de destino para enviar mercancías a esta empresa",
    is_function: true,
    relation: "stock.location",
    string: "Ubicación del cliente",
    type: "many2one",
    views: {},
  },
  property_stock_supplier: {
    context: "",
    digits: [16, 2],
    domain: [],
    help: "Esta ubicación de stock será utilizada, en lugar de la ubicación por defecto, como la ubicación de origen para recibir mercancías desde esta empresa",
    is_function: true,
    relation: "stock.location",
    string: "Ubicación del proveedor",
    type: "many2one",
    views: {},
  },
  property_switching_xml_encoding: {
    context: "",
    digits: [16, 2],
    domain: [["name", "!=", false]],
    help: "Encoding XML con el cual se generarán los XML's de switching ara esta empresa",
    is_function: true,
    relation: "giscedata.switching.xml.encoding",
    required: true,
    string: "Encoding XML switching",
    type: "many2one",
    views: {},
  },
  ref: {
    is_function: false,
    select: true,
    size: 64,
    string: "Código",
    type: "char",
    views: {},
  },
  ref2: {
    is_function: false,
    size: 6,
    string: "Ref2",
    type: "char",
    views: {},
  },
  representante_id: {
    context: "",
    domain: [],
    is_function: false,
    relation: "res.partner",
    size: 64,
    string: "Representante",
    type: "many2one",
    views: {},
  },
  supplier: {
    help: "Marque esta opción si la empresa es un proveedor. Si no está marcada no será visible al introducir un pedido de compra.",
    is_function: false,
    string: "Proveedor",
    type: "boolean",
    views: {},
  },
  title: {
    is_function: false,
    selection: [
      ["S.A.", "S.A."],
      ["ltd", "S.L."],
      ["", ""],
    ],
    size: 32,
    string: "Título",
    type: "selection",
    views: {},
  },
  total_debt: {
    digits: [16, 2],
    help: "Cantidad total que este cliente le debe.",
    is_function: true,
    readonly: 1,
    string: "Deuda Total",
    type: "float",
    views: {},
  },
  user_id: {
    context: "",
    domain: [],
    help: "﻿El usuario interno que se encarga de comunicarse con esta empresa si hay.",
    is_function: false,
    relation: "res.users",
    size: 64,
    string: "Comercial dedicado",
    type: "many2one",
    views: {},
  },
  vat: {
    help: "Número CIF/NIF. Marque esta caja si la empresa está sujeta al IVA. Se utiliza para la declaración legal del IVA.",
    is_function: false,
    select: true,
    size: 32,
    string: "CIF/NIF",
    type: "char",
    views: {},
  },
  vat_subjected: {
    help: "Marque esta casilla si el partner está sujeto al NIF. Se utilizará para la declaración legal del NIF.",
    is_function: false,
    string: "Declaración Legal del NIF",
    type: "boolean",
    views: {},
  },
  website: {
    is_function: false,
    size: 2048,
    string: "Sitio web",
    type: "char",
    views: {},
  },
  city: {
    digits: [16, 2],
    is_function: true,
    string: "Ciudad",
    type: "char",
    views: {},
  },
  country: {
    context: "",
    digits: [16, 2],
    domain: [],
    is_function: true,
    relation: "res.country",
    string: "País",
    type: "many2one",
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
    expect(searchFilter.simpleSearchContainer.rows[2].length).toBe(4);

    expect(searchFilter.advancedSearchContainer.rows.length).toBe(7);
    expect(searchFilter.advancedSearchContainer.rows[0].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[1].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[2].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[3].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[4].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[5].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[6].length).toBe(1);

    const nameWidget = searchFilter.findById("name");
    expect(nameWidget).toBeDefined();
    expect(nameWidget!.constructor.name).toBe("Char");
    const debitWidget = searchFilter.findById("debit");
    expect(debitWidget).toBeDefined();
    expect(debitWidget!.constructor.name).toBe("Float");
    const debitWidgetInSimpleSearch =
      searchFilter.simpleSearchContainer.findById("debit");
    expect(debitWidgetInSimpleSearch).toBeNull();
  });
  it("should parse fields with a specific widget property", () => {
    const searchFilter = new SearchFilter(
      {
        primary: ["polissa_company_search"],
        secondary: [],
      },
      {
        polissa_company_search: {
          context: "",
          digits: [16, 2],
          domain: [],
          is_function: true,
          readonly: 1,
          relation: "res.company",
          selection: [
            [false, ""],
            [1, "GISCE-TI"],
          ],
          string: "Buscar per Companyia",
          type: "many2one",
          views: {},
          widget: "selection",
        },
      }
    );
    searchFilter.parse();
    const widget = searchFilter.findById("polissa_company_search");
    expect(widget).toBeDefined();
    expect(widget!.constructor.name).toBe("Selection");
  });
  it("should parse a search field which has a custom widget defined in fields widget prop but it's not a default one so it should fallback", () => {
    const searchFilter = new SearchFilter(searchFields, fields);
    searchFilter.parse();

    const nameWidget = searchFilter.findById("payment_type_customer_switch");
    expect(nameWidget).toBeDefined();
    expect(nameWidget!.constructor.name).toBe("Boolean");
  });
});
