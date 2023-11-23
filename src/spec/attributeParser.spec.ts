import { it, expect, describe } from "vitest";
import {
  evaluateAttributes,
  isTrue,
  parseJsonAttributes,
} from "../helpers/attributeParser";

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
    it("should properly parse a boolean attribute with '>' operator", () => {
      const tagAttributes = {
        attrs: "{'readonly':[('force_potencia_adscrita','&gt;',0)]}",
      };
      const values = {
        force_potencia_adscrita: 10,
      };
      const evaluatedAttrs = evaluateAttributes({
        tagAttributes,
        values,
        fields,
      });
      expect(evaluatedAttrs.readonly).toBeTruthy();
    });
    it("should properly parse a boolean attribute with '<' operator", () => {
      const tagAttributes = {
        attrs: "{'readonly':[('force_potencia_adscrita','&lt;',10)]}",
      };
      const values = {
        force_potencia_adscrita: 5,
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
  describe("isTrue method", () => {
    it("should return true when value is 'True'", () => {
      expect(isTrue("True")).toBeTruthy();
    });
    it("should return true when value is 'true'", () => {
      expect(isTrue("true")).toBeTruthy();
    });
    it("should return true when value is true", () => {
      expect(isTrue(true)).toBeTruthy();
    });
    it("should return true when value is '1'", () => {
      expect(isTrue("1")).toBeTruthy();
    });
    it("should return true when value is 1", () => {
      expect(isTrue(1)).toBeTruthy();
    });
    it("should return false when value is 'False'", () => {
      expect(isTrue("False")).toBeFalsy();
    });
    it("should return false when value is 'false'", () => {
      expect(isTrue("false")).toBeFalsy();
    });
    it("should return false when value is false", () => {
      expect(isTrue(false)).toBeFalsy();
    });
    it("should return false when value is '0'", () => {
      expect(isTrue("0")).toBeFalsy();
    });
    it("should return false when value is 0", () => {
      expect(isTrue(0)).toBeFalsy();
    });
    it("should return false when value is undefined", () => {
      expect(isTrue(undefined)).toBeFalsy();
    });
  });
  describe("in parseJsonAttributes method", () => {
    it("should properly parse a simple invisible attribute", () => {
      const stringJson =
        '{"invisible":{"condition":"OR","rules":[{"field":"age","operator":"<","value":18},{"field":"citizenship","operator":"=","value":false}]}}';
      const sampleObject = { age: 17, citizenship: false };
      expect(
        parseJsonAttributes({ attrs: stringJson, values: sampleObject }),
      ).toStrictEqual({ invisible: true });
    });
    it("should properly parse attributes with special entities and singlequotes", () => {
      const stringJson =
        "{&quot;invisible&quot;: {&quot;rules&quot;: [{&quot;operator&quot;: &quot;!=&quot;, &quot;field&quot;: &quot;state&quot;, &quot;value&quot;: &quot;installed&quot;}], &quot;condition&quot;: &quot;AND&quot;}}";
      expect(
        parseJsonAttributes({
          attrs: stringJson,
          values: { state: "installed" },
        }),
      ).toStrictEqual({ invisible: false });
      expect(
        parseJsonAttributes({
          attrs: stringJson,
          values: { state: "pending" },
        }),
      ).toStrictEqual({ invisible: true });
    });
  });
});
