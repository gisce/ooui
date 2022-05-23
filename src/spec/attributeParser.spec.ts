import { evaluateAttributes } from "../helpers/attributeParser";

const fields = {
  force_potencia_adscrita: {
    type: "boolean",
  },
  per_enviar: {
    type: "char",
  },
  rectificative_type: {
    type: "char",
  },
  in_refund: {
    type: "char",
  },
  check_total: {
    type: "float",
  },
  type: {
    type: "char",
  },
  id: {
    type: "integer",
  },
  link: {
    type: "char",
  },
  change_adm: {
    type: "boolean",
  },
  autoconsum_id: {
    type: "many2one",
  },
};

describe("An Attribute Parser", () => {
  describe("in evaluateAttributes method", () => {
    it("should properly parse a simple attribute with = operator", () => {
      const tagAttributes = {
        attrs: "{'invisible':[('per_enviar', '=', 'postal')]}",
      };
      const values = {
        per_enviar: "postal",
      };
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.invisible).toBeTruthy();
    });
    it("should properly parse a simple attribute with == operator and numeric value", () => {
      const tagAttributes = {
        attrs: "{'invisible': [('check_total', '==',0.00)]}",
      };
      const values = {
        check_total: 0.0,
      };
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.invisible).toBeTruthy();
    });
    it("should properly parse a simple attribute with 'in' operator", () => {
      const tagAttributes = {
        attrs: "{'invisible': [('rectificative_type', 'in', ('N', 'C', 'G'))]}",
      };
      const values = {
        rectificative_type: "G",
      };
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.invisible).toBeTruthy();
    });
    it("should properly parse a simple attribute with 'not_in' operator", () => {
      const tagAttributes = {
        attrs: "{'invisible': [('type','not in',('in_refund','in_invoice'))]}",
      };
      const values = {
        type: "not_found_type",
      };
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.invisible).toBeTruthy();
    });
    it("should properly parse a boolean attribute with '=' operator", () => {
      const tagAttributes = {
        attrs: "{'readonly':[('force_potencia_adscrita','=',0)]}",
      };
      const values = {
        force_potencia_adscrita: false,
      };
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.readonly).toBeTruthy();
    });
    it("should properly parse a boolean attribute with '=' operator", () => {
      const tagAttributes = {
        attrs: "{'readonly':[('force_potencia_adscrita','=',0)]}",
      };
      const values = {
        force_potencia_adscrita: true,
      };
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.readonly).toBeFalsy();
    });
    it("should properly parse a boolean attribute with '=' operator with True", () => {
      const tagAttributes = {
        attrs: "{'readonly':[('force_potencia_adscrita','=',True)]}",
      };
      const values = {
        force_potencia_adscrita: true,
      };
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.readonly).toBeTruthy();
    });
    it("should properly parse a boolean attribute with several conditions", () => {
      const tagAttributes = {
        attrs: "{'invisible': [('id', '!=', False), ('link', '!=', False)]}",
      };
      const values = {
        id: 1,
        link: false,
      };
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.invisible).toBeFalsy();
    });
    it("should properly parse a boolean attribute without value (default false)", () => {
      const tagAttributes = {
        attrs: "{'invisible': [('change_adm', '!=', True)]}",
      };
      const values = {};
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.invisible).toBeTruthy();
    });
    it("should properly parse a boolean attribute without value (default true)", () => {
      const tagAttributes = {
        attrs: "{'invisible': [('change_adm', '=', False)]}",
      };
      const values = {};
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.invisible).toBeTruthy();
    });
    it("should properly parse a many2one attribute with false value", () => {
      const tagAttributes = {
        attrs: "{'invisible': [('autoconsum_id', '=', False)]}",
      };
      const values = { autoconsum_id: false };
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.invisible).toBeTruthy();
    });
    it("should properly parse a many2one attribute with undefined value", () => {
      const tagAttributes = {
        attrs: "{'invisible': [('autoconsum_id', '=', False)]}",
      };
      const values = { autoconsum_id: undefined };
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.invisible).toBeTruthy();
    });
  });
});
