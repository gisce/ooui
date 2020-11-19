import Form from '../Form';
import Widget from '../Widget';


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
    'aclarador': {
        'size': 256,
        'string': 'Aclarador',
        'type': 'char',
        'views': {}
    },
    'apartat_correus': {
        'size': 5,
        'string': 'Apartat de Correus',
        'type': 'char',
        'views': {}
    },
    'bq': { 'size': 4, 'string': 'Bloc', 'type': 'char', 'views': {} },
    'country_id': {
        'context': '',
        'domain': [],
        'relation': 'res.country',
        'size': 64,
        'string': 'Country',
        'type': 'many2one',
        'views': {}
    },
    'email': { 'size': 240, 'string': 'E-Mail', 'type': 'char', 'views': {} },
    'es': { 'size': 10, 'string': 'Escala', 'type': 'char', 'views': {} },
    'fax': { 'size': 64, 'string': 'Fax', 'type': 'char', 'views': {} },
    'function': {
        'context': '',
        'domain': [],
        'relation': 'res.partner.function',
        'size': 64,
        'string': 'Function',
        'type': 'many2one',
        'views': {}
    },
    'id_municipi': {
        'context': '',
        'domain': [],
        'relation': 'res.municipi',
        'size': 64,
        'string': 'Municipi',
        'type': 'many2one',
        'views': {}
    },
    'id_poblacio': {
        'context': '',
        'domain': [],
        'relation': 'res.poblacio',
        'size': 64,
        'string': 'Població',
        'type': 'many2one',
        'views': {}
    },
    'mobile': { 'size': 64, 'string': 'Mobile', 'type': 'char', 'views': {} },
    'name': { 'size': 128, 'string': 'Contact Name', 'type': 'char', 'views': {} },
    'notes': { 'string': 'Notes', 'type': 'text', 'views': {} },
    'nv': { 'size': 256, 'string': 'Carrer', 'type': 'char', 'views': {} },
    'partner_id': {
        'context': '',
        'domain': [],
        'help': 'Keep empty for a private address, not related to partner.',
        'relation': 'res.partner',
        'select': true,
        'size': 64,
        'string': 'Partner',
        'type': 'many2one',
        'views': {}
    },
    'phone': { 'size': 64, 'string': 'Phone', 'type': 'char', 'views': {} },
    'pnp': { 'size': 10, 'string': 'Número', 'type': 'char', 'views': {} },
    'pt': { 'size': 10, 'string': 'Planta', 'type': 'char', 'views': {} },
    'pu': { 'size': 10, 'string': 'Porta', 'type': 'char', 'views': {} },
    'ref_catastral': {
        'size': 20,
        'string': 'Ref Catastral (c)',
        'type': 'char',
        'views': {}
    },
    'state_id': {
        'context': '',
        'domain': "[('country_id','=',country_id)]",
        'relation': 'res.country.state',
        'size': 64,
        'string': 'Fed. State',
        'type': 'many2one',
        'views': {}
    },
    'street': {
        'digits': [16, 2],
        'readonly': 1,
        'size': 128,
        'string': 'Street',
        'type': 'char',
        'views': {}
    },
    'street2': { 'size': 128, 'string': 'Street2', 'type': 'char', 'views': {} },
    'title': {
        'selection': [['Ms.', 'Madam'],
        ['Mss', 'Miss'],
        ['M.', 'Sir'],
        ['', '']],
        'size': 32,
        'string': 'Title',
        'type': 'selection',
        'views': {}
    },
    'tv': {
        'context': '',
        'domain': [],
        'relation': 'res.tipovia',
        'size': 64,
        'string': 'Tipus Via',
        'type': 'many2one',
        'views': {}
    },
    'type': {
        'help': 'Used to select automatically the right address according to the context in sales and purchases documents.',
        'selection': [['default', 'Default'],
        ['invoice', 'Invoice'],
        ['delivery', 'Delivery'],
        ['contact', 'Contact'],
        ['other', 'Other'],
        ['ov', 'Oficina Virtual']],
        'string': 'Address Type',
        'type': 'selection',
        'views': {}
    },
    'zip': {
        'change_default': true,
        'size': 24,
        'string': 'Zip',
        'type': 'char',
        'views': {}
    }
};

function printRow(row, tab) {
    console.log('-'.repeat(80))
    row.forEach(el => {
        const container = el.container || false;
        const prefix = ' '.repeat(tab);
        if (container) {
            console.log(prefix, el.type, el.container.columns);
            tab = tab + 4;
            container.rows.forEach(row => {
                printRow(row, tab)
            });
        } else {
            console.log(prefix, el);
        }
    })
}

describe('A Form', () => {
    it('should parse xml', () => {
        const form = new Form(FIELDS);
        form.parse(XML_VIEW_FORM);
        form.container.rows.forEach(row => {
            //    printRow(row, 0);
        });
    });
});

describe('A Widget', () => {
    it('should have colspan 1 by default', () => {
        const widget = new Widget("Button");
        expect(widget.colspan).toBe(1);
    });
});
