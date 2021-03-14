import { parseDomain, getParamsForDomain } from "../helpers/domainParser";

describe("A Domain Parser", () => {
  describe("in parseDomain method", () => {
    it("should properly parse a false domain", () => {
      const parsedDomain = parseDomain(false);
      expect(Array.isArray(parsedDomain)).toBeTruthy();
      expect(parsedDomain!.length).toBe(0);
    });
    it("should properly parse a basic string domain", () => {
      const parsedDomain = parseDomain(
        "[('municipi_id.id', '=', id_municipi)]"
      );
      expect(Array.isArray(parsedDomain)).toBeTruthy();
    });
    it("should properly parse multiple string domain", () => {
      const parsedDomain = parseDomain(
        "[('municipi_id.id', '=', id_municipi),('test.id', '=', id_test)]"
      );
      expect(Array.isArray(parsedDomain)).toBeTruthy();
      expect(parsedDomain.length).toBe(2);
      expect(parsedDomain[0][0]).toBe("municipi_id.id");
      expect(parsedDomain[0][1]).toBe("=");
      expect(parsedDomain[0][2]).toBe("{id_municipi}");
      expect(parsedDomain[1][0]).toBe("test.id");
      expect(parsedDomain[1][1]).toBe("=");
      expect(parsedDomain[1][2]).toBe("{id_test}");
    });
    it("should properly parse a basic boolean true domain", () => {
      const parsedDomain = parseDomain("[('test', '=', True)]");
      expect(Array.isArray(parsedDomain)).toBeTruthy();
      expect(parsedDomain.length).toBe(1);
      expect(parsedDomain[0][0]).toBe("test");
      expect(parsedDomain[0][1]).toBe("=");
      expect(parsedDomain[0][2]).toBe("True");
    });
    it("should properly parse a basic boolean false domain", () => {
      const parsedDomain = parseDomain("[('test', '=', False)]");
      expect(Array.isArray(parsedDomain)).toBeTruthy();
      expect(parsedDomain.length).toBe(1);
      expect(parsedDomain[0][0]).toBe("test");
      expect(parsedDomain[0][1]).toBe("=");
      expect(parsedDomain[0][2]).toBe("False");
    });
    it("should properly parse a float numeric domain", () => {
      const parsedDomain = parseDomain("[('test', '=', 50.3)]");
      expect(Array.isArray(parsedDomain)).toBeTruthy();
      expect(parsedDomain.length).toBe(1);
      expect(parsedDomain[0][0]).toBe("test");
      expect(parsedDomain[0][1]).toBe("=");
      expect(parsedDomain[0][2]).toBe("50.3");
    });
    it("should properly parse a integer numeric domain", () => {
      const parsedDomain = parseDomain("[('test', '=', 15000)]");
      expect(Array.isArray(parsedDomain)).toBeTruthy();
      expect(parsedDomain.length).toBe(1);
      expect(parsedDomain[0][0]).toBe("test");
      expect(parsedDomain[0][1]).toBe("=");
      expect(parsedDomain[0][2]).toBe("15000");
    });
  });
  describe("in getParamsForDomain method", () => {
    it("should properly return a basic domain", () => {
      const domain = [["test", "=", 15000]];
      const params = getParamsForDomain({
        values: {},
        domain,
      });
      expect(params.length).toBe(1);
      expect(params[0].length).toBe(3);
      expect(params[0][0]).toBe("test");
      expect(params[0][1]).toBe("=");
      expect(params[0][2]).toBe(15000);
    });
  });
  describe("in getParamsForDomain method", () => {
    it("should properly return a basic domain", () => {
      const domain = [["municipi_id.id", "=", "{id_municipi}"]];
      const params = getParamsForDomain({
        values: {
          id_municipi: 1337,
        },
        domain,
      });
      expect(params.length).toBe(1);
      expect(params[0].length).toBe(3);
      expect(params[0][0]).toBe("municipi_id.id");
      expect(params[0][1]).toBe("=");
      expect(params[0][2]).toBe(1337);
    });
  });
});
