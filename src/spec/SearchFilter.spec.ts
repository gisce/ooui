import SearchFilter from "../SearchFilter";

const searchFields = {
  primary: [
    "name",
    "ref",
    "emails",
    "customer",
    "address",
    "payment_type_customer",
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

const formXml = `<form string="Empresas">
<group colspan="4" col="6">
    <field name="energy_sector" select="2" invisible="1"/>
<field name="name" select="1"/>
    <group colspan="2" col="4">
    <field name="ref" select="1"/>
    <field name="ref2"/>
</group>
<field name="emails" invisible="1" select="1"/>
<field name="customer" select="1"/>
    <field domain="[('domain', '=', 'partner')]" name="title"/>
    <field name="lang" select="2"/>
    <field name="supplier" select="2"/>
</group>
<notebook colspan="4">
    <page string="General">
                                            <group string="Test" colspan="4" attrs="{'invisible': [('address', '=', 0)]}">
                    <field name="name" select="1"/>
                </group>

        <field colspan="4" mode="form,tree,graph" name="address" nolabel="1" select="1">
            </field>
        <separator colspan="4" string="Categorías"/>
        <field colspan="4" name="category_id" nolabel="1" select="2"/><button name="crear_com_a_participant" type="object" string="Dar de alta como participante"/>

    </page>
    <page string="Ventas &amp; Compras">
        <separator string="Información general" colspan="4"/>
        <field name="user_id" select="2"/>
        <group colspan="2" col="4">
    <group colspan="2" col="4">
    <field name="active" select="2"/>
    <button name="deactivate_partner" string="Desactivar" type="object" icon="gtk-cancel"/>
</group>
<button name="deactivate_partner" string="Desactivar" type="object" icon="gtk-cancel"/>
</group>
<field name="website" widget="url"/>
        <field name="date" select="2"/>
        <field name="parent_id"/>
        <field name="representante_id"/>
<field name="comercial"/>
<newline/>
    <group colspan="2" col="2">
<separator string="Propiedades de stock" colspan="2"/>
<field name="property_stock_customer"/>
<field name="property_stock_supplier"/>
</group>
<newline/>
<group col="2" colspan="2" name="sale_list">
    <separator string="Propiedades de venta" colspan="2"/>
    <field name="property_product_pricelist"/>
</group>
<group colspan="2" col="2">
    <separator string="Propiedades de compra" colspan="2"/>
    <field name="property_product_pricelist_purchase"/>
</group>
<separator string="Gestión ATR" colspan="4"/>
    <field name="property_switching_xml_encoding"/>
</page>
    <page string="Privacy">
    <group colspan="4" col="4">
    <separator string="Gestión SIPS" colspan="4"/>
    <button string="Solicitar no cesión" type="action" icon="gtk-no" name="1621" colspan="1" readonly="0"/>
</group>
</page>
    <page string="Historial">
        <field colspan="4" name="events" nolabel="1" widget="timeline" widget_props="{'titleField':'date','summaryField':'name'}" readonly="1"/>
    </page>
    <page string="Notas">
        <field colspan="4" name="comment" nolabel="1"/>
    </page>
<page string="Contabilidad" position="inside">
<group col="2" colspan="2">
    <separator string="Propiedades de contabilidad del cliente" colspan="2"/>
    <field name="property_account_receivable"/>
    <field name="payment_type_customer" select="1" widget="selection"/>
<field name="property_account_debtor"/>
<field name="codigo_contable" select="1"/>
<field name="property_account_position"/>
    <field name="vat" on_change="vat_change(vat)" select="1"/>
<field name="vat_subjected"/>
<field name="property_payment_term"/>
</group>
<group col="2" colspan="2">
    <separator string="Propiedades de contabilidad del proveedor" colspan="2"/>
    <field name="property_account_payable"/><field name="payment_type_supplier" select="1"/>

</group>
<group col="2" colspan="2">
    <separator string="Haber del cliente" colspan="2"/>
    <field name="credit" select="2"/>
    <field name="total_debt"/>
<field name="has_debt" invisible="1" select="2"/>
<field name="credit_limit" select="2"/>
</group>
<group col="2" colspan="2">
    <separator string="Debe del proveedor" colspan="2"/>
    <field name="debit" select="2"/>
</group>
<field colspan="4" context="address=address" name="bank_ids" nolabel="1" select="2">
    </field>
</page>
<page string="Oficina Virtual" position="after">
    <field name="ov_users_ids" nolabel="1" colspan="4"/>
</page>
</notebook>
</form>`;

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
    views: {
      form: {
        arch: '<form string="Contactos de la empresa">\n\n                                    <notebook>\n                                        <page string="General">\n                                            <field name="name" select="2" required="True"/>\n                                            <field domain="[(\'domain\', \'=\', \'contact\')]" name="title" string="Tipo"/>\n                                            <field name="function"/>\n                                            <field name="type" select="2"/>\n                                            <separator string="Calle" colspan="4"/>\n                                            <field name="street" select="2" colspan="4" width="200"/>\n                                            <group colspan="2" col="4">\n                        <field name="tv" select="2"/>\n                        <newline/>\n                        <field name="nv" colspan="4"/>\n                    </group>\n                    <group colspan="2" col="8">\n                        <field name="pnp"/>\n                        <field name="es"/>\n                        <field name="pt"/>\n                        <field name="pu"/>\n                        <field name="bq" colspan="1"/>\n                        <field name="aclarador" colspan="5"/>\n                    </group>\n                <field name="street2"/>\n                                            <newline/>\n                                            <field name="zip" select="2"/>\n                                            <field name="apartat_correus"/>\n                    <newline/>\n                <newline/>\n                                            <field name="id_municipi" on_change="onchange_municipi_id(id_municipi,context)"/>\n                    <field name="id_poblacio" domain="[(\'municipi_id\',\'=\',id_municipi)]"/>\n                <field name="state_id" select="2"/>\n                                            <field completion="1" name="country_id" select="2"/>\n                                            <newline/>\n                                            <separator string="Catastro" colspan="4"/>\n                    <field name="ref_catastral"/>\n                <separator string="Comunication channels" colspan="4"/>\n                                            <field name="phone"/>\n                                            <field name="fax"/>\n                                            <newline/>\n                                            <field name="mobile"/>\n                                            <field name="email" select="2" widget="email"/>\n                                        </page>\n                                        <page string="Notas">\n                                            <field name="notes" nolabel="1" colspan="4"/>\n                                        </page>\n                                    </notebook>\n                                </form>\n                                ',
        fields: {
          aclarador: {
            is_function: false,
            size: 256,
            string: "Aclarador",
            type: "char",
            views: {},
          },
          apartat_correus: {
            is_function: false,
            size: 5,
            string: "Apartado de Correos",
            type: "char",
            views: {},
          },
          bq: {
            is_function: false,
            size: 4,
            string: "Bloque",
            type: "char",
            views: {},
          },
          country_id: {
            context: "",
            domain: [],
            is_function: false,
            relation: "res.country",
            size: 64,
            string: "País",
            type: "many2one",
            views: {},
          },
          email: {
            is_function: false,
            size: 240,
            string: "Email",
            type: "char",
            views: {},
          },
          es: {
            is_function: false,
            size: 10,
            string: "Escala",
            type: "char",
            views: {},
          },
          fax: {
            is_function: false,
            size: 64,
            string: "Fax",
            type: "char",
            views: {},
          },
          function: {
            context: "",
            domain: [],
            is_function: false,
            relation: "res.partner.function",
            size: 64,
            string: "Función",
            type: "many2one",
            views: {},
          },
          id_municipi: {
            context: "",
            domain: [],
            is_function: false,
            relation: "res.municipi",
            size: 64,
            string: "Municipio",
            type: "many2one",
            views: {},
          },
          id_poblacio: {
            context: "",
            domain: [],
            is_function: false,
            relation: "res.poblacio",
            size: 64,
            string: "Población",
            type: "many2one",
            views: {},
          },
          mobile: {
            is_function: false,
            size: 64,
            string: "Móvil",
            type: "char",
            views: {},
          },
          name: {
            is_function: false,
            size: 128,
            string: "Nombre",
            type: "char",
            views: {},
          },
          notes: {
            is_function: false,
            string: "Notas",
            type: "text",
            views: {},
          },
          nv: {
            is_function: false,
            size: 256,
            string: "Calle",
            type: "char",
            views: {},
          },
          phone: {
            is_function: false,
            size: 64,
            string: "Teléfono",
            type: "char",
            views: {},
          },
          pnp: {
            is_function: false,
            size: 10,
            string: "Número",
            type: "char",
            views: {},
          },
          pt: {
            is_function: false,
            size: 10,
            string: "Planta",
            type: "char",
            views: {},
          },
          pu: {
            is_function: false,
            size: 10,
            string: "Puerta",
            type: "char",
            views: {},
          },
          ref_catastral: {
            is_function: false,
            size: 20,
            string: "Ref Catastral (c)",
            type: "char",
            views: {},
          },
          state_id: {
            context: "",
            domain: "[('country_id','=',country_id)]",
            is_function: false,
            relation: "res.country.state",
            size: 64,
            string: "Provincia",
            type: "many2one",
            views: {},
          },
          street: {
            digits: [16, 2],
            is_function: true,
            readonly: 1,
            size: 128,
            string: "Calle",
            type: "char",
            views: {},
          },
          street2: {
            is_function: false,
            size: 128,
            string: "Calle2",
            type: "char",
            views: {},
          },
          title: {
            is_function: false,
            selection: [
              ["Sra.", "Sra."],
              ["Srta", "Sra."],
              ["M.", "Sr."],
              ["", ""],
            ],
            size: 32,
            string: "Título",
            type: "selection",
            views: {},
          },
          tv: {
            context: "",
            domain: [],
            is_function: false,
            relation: "res.tipovia",
            size: 64,
            string: "Tipo Vía",
            type: "many2one",
            views: {},
          },
          type: {
            help: "﻿Utilizado para seleccionar automáticamente la dirección correcta según el contexto en documentos de ventas y compras.",
            is_function: false,
            selection: [
              ["default", "Por defecto"],
              ["invoice", "Factura"],
              ["delivery", "Envío"],
              ["contact", "Contacto"],
              ["other", "Otro"],
              ["ov", "Oficina Virtual"],
            ],
            string: "Tipo de dirección",
            type: "selection",
            views: {},
          },
          zip: {
            change_default: true,
            is_function: false,
            size: 24,
            string: "C.P.",
            type: "char",
            views: {},
          },
        },
      },
      tree: {
        arch: '<tree string="Contactos de la empresa">\n                                    <field name="name"/>\n                                    <field name="street"/>\n                    <field name="type"/>\n                <field name="zip"/>\n                                    <field name="city"/>\n                                    <field name="country_id"/>\n                                    <field name="phone"/>\n                                    <field name="email"/>\n                                </tree>\n                            ',
        fields: {
          city: {
            is_function: false,
            size: 128,
            string: "Ciudad",
            type: "char",
            views: {},
          },
          country_id: {
            context: "",
            domain: [],
            is_function: false,
            relation: "res.country",
            size: 64,
            string: "País",
            type: "many2one",
            views: {},
          },
          email: {
            is_function: false,
            size: 240,
            string: "Email",
            type: "char",
            views: {},
          },
          name: {
            is_function: false,
            size: 128,
            string: "Nombre",
            type: "char",
            views: {},
          },
          phone: {
            is_function: false,
            size: 64,
            string: "Teléfono",
            type: "char",
            views: {},
          },
          street: {
            digits: [16, 2],
            is_function: true,
            readonly: 1,
            size: 128,
            string: "Calle",
            type: "char",
            views: {},
          },
          type: {
            help: "﻿Utilizado para seleccionar automáticamente la dirección correcta según el contexto en documentos de ventas y compras.",
            is_function: false,
            selection: [
              ["default", "Por defecto"],
              ["invoice", "Factura"],
              ["delivery", "Envío"],
              ["contact", "Contacto"],
              ["other", "Otro"],
              ["ov", "Oficina Virtual"],
            ],
            string: "Tipo de dirección",
            type: "selection",
            views: {},
          },
          zip: {
            change_default: true,
            is_function: false,
            size: 24,
            string: "C.P.",
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
    is_function: false,
    relation: "res.partner.bank",
    string: "Bancos",
    type: "one2many",
    views: {
      form: {
        arch: '<form string="Cuenta bancaria">\n                            <field name="state" select="2"/>\n                            <newline/>\n                            <field name="acc_number" on_change="onchange_banco(acc_number, acc_country_id, context)"/>\n                <field name="acc_country_id" on_change="onchange_banco(acc_number, acc_country_id, context)"/>\n            <newline/>\n                    <field name="iban" on_change="onchange_iban(iban, context)"/>\n            <newline/>\n                    <field name="printable_iban"/>\n                    <newline/>\n                <newline/>\n                            <field name="bank"/>\n                            <newline/>\n                            <field name="sequence"/>\n                            <field name="default_bank"/>\n            <field colspan="4" name="name" select="2"/>\n                            <separator colspan="4" string="Titular de la cuenta bancaria"/>\n                            <field colspan="4" name="owner_name" select="2" invisible="1"/>\n                    <field colspan="4" name="owner_id" required="0"/>\n                <field colspan="4" name="street" invisible="1"/>\n                    <field colspan="4" name="owner_address_id" domain="[(\'partner_id\', \'=\', owner_id)]"/>\n                <newline/>\n                            <field name="zip" invisible="1"/>\n                <field name="city" invisible="1"/>\n                <newline/>\n                            <field invisible="1" name="country_id" select="2"/>\n                <field name="state_id" select="2" invisible="1"/>\n                </form>\n                        ',
        fields: {
          acc_country_id: {
            context: "",
            domain: [],
            help: "Si el país de la cuenta bancaria es España, valida el número de la cuenta. Sólo mira los caracteres de la cuenta que sean dígitos:\n- Si el número de dígitos es 18, calcula los dos dígitos de control.\n- Si el número de dígitos es 20, calcula los dos dígitos de control e ignora los actuales.\n- Si el número de dígitos es diferente de 18 o 20, deja el valor inalterado.\nPresenta el resultado con el formato '1234 5678 06 1234567890'.",
            is_function: false,
            relation: "res.country",
            required: true,
            size: 64,
            string: "País de la cuenta",
            type: "many2one",
            views: {},
          },
          acc_number: {
            is_function: false,
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
            string: "Número de cuenta",
            type: "char",
            views: {},
          },
          bank: {
            context: "",
            domain: [],
            is_function: false,
            relation: "res.bank",
            size: 64,
            string: "Banco",
            type: "many2one",
            views: {},
          },
          city: {
            digits: [16, 2],
            is_function: true,
            readonly: 1,
            size: 128,
            string: "Ciudad",
            type: "char",
            views: {},
          },
          country_id: {
            context: "",
            digits: [16, 2],
            domain: [],
            is_function: true,
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
            string: "País",
            type: "many2one",
            views: {},
          },
          default_bank: {
            is_function: false,
            string: "Por defecto",
            type: "boolean",
            views: {},
          },
          iban: {
            help: "Núm. cuenta bancaria internacional IBAN",
            is_function: false,
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
            is_function: false,
            size: 128,
            string: "Descripción",
            type: "char",
            views: {},
          },
          owner_address_id: {
            context: "",
            domain: [],
            is_function: false,
            relation: "res.partner.address",
            select: true,
            size: 64,
            string: "Dirección del propietario",
            type: "many2one",
            views: {},
          },
          owner_id: {
            context: "",
            domain: [],
            help: "Si no tiene propietario, el contacto relacionado se utilizará como propietario",
            is_function: false,
            relation: "res.partner",
            required: true,
            select: true,
            size: 64,
            string: "Propietario",
            type: "many2one",
            views: {},
          },
          owner_name: {
            digits: [16, 2],
            is_function: true,
            readonly: 1,
            size: 128,
            string: "Propietario cuenta",
            type: "char",
            views: {},
          },
          printable_iban: {
            digits: [16, 2],
            help: "Núm. cuenta bancaria internacional IBAN",
            is_function: true,
            readonly: 1,
            size: 42,
            string: "IBAN impreso",
            type: "char",
            views: {},
          },
          sequence: {
            is_function: false,
            string: "Secuencia",
            type: "integer",
            views: {},
          },
          state: {
            change_default: true,
            is_function: false,
            required: true,
            selection: [
              ["bank", "Cuenta bancaria"],
              ["iban", "Cuenta IBAN"],
            ],
            string: "Tipo de banco",
            type: "selection",
            views: {},
          },
          state_id: {
            context: "",
            digits: [16, 2],
            domain: [],
            is_function: true,
            readonly: 1,
            relation: "res.country.state",
            string: "Estado",
            type: "many2one",
            views: {},
          },
          street: {
            digits: [16, 2],
            is_function: true,
            readonly: 1,
            size: 128,
            string: "Calle",
            type: "char",
            views: {},
          },
          zip: {
            digits: [16, 2],
            is_function: true,
            readonly: 1,
            size: 24,
            states: {
              iban: [
                ["readonly", false],
                ["required", false],
              ],
            },
            string: "C.P.",
            type: "char",
            views: {},
          },
        },
      },
      tree: {
        arch: '<tree string="Detalles del banco">\n                            <field name="state"/>\n                            <field name="bank"/>\n                            <field name="owner_name"/>\n                            <field name="acc_number"/>\n                        <field name="iban"/>\n                <field name="default_bank"/>\n            </tree>\n                    ',
        fields: {
          acc_number: {
            is_function: false,
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
            string: "Número de cuenta",
            type: "char",
            views: {},
          },
          bank: {
            context: "",
            domain: [],
            is_function: false,
            relation: "res.bank",
            size: 64,
            string: "Banco",
            type: "many2one",
            views: {},
          },
          default_bank: {
            is_function: false,
            string: "Por defecto",
            type: "boolean",
            views: {},
          },
          iban: {
            help: "Núm. cuenta bancaria internacional IBAN",
            is_function: false,
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
            is_function: true,
            readonly: 1,
            size: 128,
            string: "Propietario cuenta",
            type: "char",
            views: {},
          },
          state: {
            change_default: true,
            is_function: false,
            required: true,
            selection: [
              ["bank", "Cuenta bancaria"],
              ["iban", "Cuenta IBAN"],
            ],
            string: "Tipo de banco",
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
    context: {
      active_test: false,
    },
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
  payment_type_customer: {
    context: "",
    domain: [],
    help: "Tipo de pago como cliente.",
    is_function: false,
    relation: "payment.type",
    size: 64,
    string: "Tipo de pago de cliente",
    type: "many2one",
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
};

describe("A SearchFilter", () => {
  it("should parse search fields correctly", () => {
    const searchFilter = new SearchFilter(searchFields, fields);
    searchFilter.parse();

    expect(searchFilter.fields).toBeDefined();
    expect(searchFilter.simpleSearchContainer.rows.length).toBe(3);
    expect(searchFilter.simpleSearchContainer.rows[0].length).toBe(4);
    expect(searchFilter.simpleSearchContainer.rows[1].length).toBe(4);
    expect(searchFilter.simpleSearchContainer.rows[2].length).toBe(3);

    expect(searchFilter.advancedSearchContainer.rows.length).toBe(6);
    expect(searchFilter.advancedSearchContainer.rows[0].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[1].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[2].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[3].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[4].length).toBe(4);
    expect(searchFilter.advancedSearchContainer.rows[5].length).toBe(4);

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
  it("should parse a search field which has a custom widget defined in form xml", () => {
    const searchFilter = new SearchFilter(searchFields, fields);
    searchFilter.parse();

    const nameWidget = searchFilter.findById("payment_type_customer");
    expect(nameWidget).toBeDefined();
    expect(nameWidget!.constructor.name).toBe("Selection");
  });
});
