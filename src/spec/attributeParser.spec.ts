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
    it.only("should properly parse a boolean attribute with '=' operator with True", () => {
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
  });
});
