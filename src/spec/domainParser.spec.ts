import { parseDomain } from "../helpers/domainParser";

describe("A Domain Parser", () => {
  describe("in parseDomain method", () => {
    it("should properly parse a basic string domain", () => {
      const domain = "[('test', '=', 'foo')]";

      const parsedDomain = parseDomain({
        domainValue: domain,
        values: {},
        fields: {},
      });

      expect(parsedDomain!.length).toBe(1);
      expect(parsedDomain![0].length).toBe(3);
      expect(parsedDomain![0][0]).toBe("test");
      expect(parsedDomain![0][1]).toBe("=");
      expect(parsedDomain![0][2]).toBe("foo");
    });
    it("should properly parse a multiple string domain", () => {
      const domain = "[('test', '=', 'foo'),('test', '=', 'bar')]";

      const parsedDomain = parseDomain({
        domainValue: domain,
        values: {},
        fields: {},
      });

      expect(parsedDomain!.length).toBe(2);
      expect(parsedDomain![0].length).toBe(3);
      expect(parsedDomain![1].length).toBe(3);
      expect(parsedDomain![0][0]).toBe("test");
      expect(parsedDomain![0][1]).toBe("=");
      expect(parsedDomain![0][2]).toBe("foo");
      expect(parsedDomain![1][0]).toBe("test");
      expect(parsedDomain![1][1]).toBe("=");
      expect(parsedDomain![1][2]).toBe("bar");
    });

    it("should properly parse a basic domain value", () => {
      const domain = "[('municipi_id.id', '=', id_municipi)]";

      const values = {
        id_municipi: [6, "Sant Esteve de les Roures"],
      };

      const fields = {
        id_municipi: {
          type: "many2one",
        },
      };

      const parsedDomain = parseDomain({
        domainValue: domain,
        values,
        fields,
      });

      expect(parsedDomain!.length).toBe(1);
      expect(parsedDomain![0].length).toBe(3);
      expect(parsedDomain![0][0]).toBe("municipi_id.id");
      expect(parsedDomain![0][1]).toBe("=");
      expect(parsedDomain![0][2]).toBe(6);
    });
    it("should properly parse multiple domain value", () => {
      const domain =
        "[('municipi_id.id', '=', id_municipi),('test.id', '=', id_test)]";

      const values = {
        id_municipi: [6, "Sant Esteve de les Roures"],
        id_test: [10, "Pfizer"],
      };

      const fields = {
        id_municipi: {
          type: "many2one",
        },
        id_test: {
          type: "many2one",
        },
      };

      const parsedDomain = parseDomain({
        domainValue: domain,
        values,
        fields,
      });

      expect(parsedDomain!.length).toBe(2);
      expect(parsedDomain![0].length).toBe(3);
      expect(parsedDomain![1].length).toBe(3);
      expect(parsedDomain![0][0]).toBe("municipi_id.id");
      expect(parsedDomain![0][1]).toBe("=");
      expect(parsedDomain![0][2]).toBe(6);
      expect(parsedDomain![1][0]).toBe("test.id");
      expect(parsedDomain![1][1]).toBe("=");
      expect(parsedDomain![1][2]).toBe(10);
    });
    it("should properly parse a basic boolean true domain", () => {
      const domain = "[('test', '=', True)]";

      const parsedDomain = parseDomain({
        domainValue: domain,
        values: {},
        fields: {},
      });

      expect(parsedDomain!.length).toBe(1);
      expect(parsedDomain![0].length).toBe(3);
      expect(parsedDomain![0][0]).toBe("test");
      expect(parsedDomain![0][1]).toBe("=");
      expect(parsedDomain![0][2]).toBe(true);
    });
    it("should properly parse a basic boolean false domain", () => {
      const domain = "[('test', '=', False)]";
      const parsedDomain = parseDomain({
        domainValue: domain,
        values: {},
        fields: {},
      });

      expect(parsedDomain!.length).toBe(1);
      expect(parsedDomain![0].length).toBe(3);
      expect(parsedDomain![0][0]).toBe("test");
      expect(parsedDomain![0][1]).toBe("=");
      expect(parsedDomain![0][2]).toBe(false);
    });
    it("should properly parse a float numeric domain", () => {
      const domain = "[('test', '=', 50.3)]";
      const parsedDomain = parseDomain({
        domainValue: domain,
        values: {},
        fields: {},
      });

      expect(parsedDomain!.length).toBe(1);
      expect(parsedDomain![0].length).toBe(3);
      expect(parsedDomain![0][0]).toBe("test");
      expect(parsedDomain![0][1]).toBe("=");
      expect(parsedDomain![0][2]).toBe(50.3);
    });
    it("should properly parse a integer numeric domain", () => {
      const domain = "[('test', '=', 15000)]";
      const parsedDomain = parseDomain({
        domainValue: domain,
        values: {},
        fields: {},
      });

      expect(parsedDomain!.length).toBe(1);
      expect(parsedDomain![0].length).toBe(3);
      expect(parsedDomain![0][0]).toBe("test");
      expect(parsedDomain![0][1]).toBe("=");
      expect(parsedDomain![0][2]).toBe(15000);
    });
    it("should properly parse a domain with OR", () => {
      const domain =
        "['&',('test', '=', 15000),'|',('municipi_id.id', '=', id_municipi),('bool', '=', True)]";

      const values = {
        id_municipi: [6, "Sant Esteve de les Roures"],
      };

      const fields = {
        id_municipi: {
          type: "many2one",
        },
      };

      const parsedDomain = parseDomain({
        domainValue: domain,
        values,
        fields,
      });

      expect(parsedDomain!.length).toBe(5);
      expect(parsedDomain![0]).toBe("&");
      expect(parsedDomain![1][0]).toBe("test");
      expect(parsedDomain![1][1]).toBe("=");
      expect(parsedDomain![1][2]).toBe(15000);
      expect(parsedDomain![2]).toBe("|");
      expect(parsedDomain![3][0]).toBe("municipi_id.id");
      expect(parsedDomain![3][1]).toBe("=");
      expect(parsedDomain![3][2]).toBe(6);
      expect(parsedDomain![4][0]).toBe("bool");
      expect(parsedDomain![4][1]).toBe("=");
      expect(parsedDomain![4][2]).toBe(true);
    });
  });
  it("should properly parse a domain with not_in and array", () => {
    const domain = "[('section_id','not_in',[5, 10, 6])]";

    const parsedDomain = parseDomain({
      domainValue: domain,
      values: {},
      fields: {},
    });

    expect(parsedDomain!.length).toBe(1);
    expect(parsedDomain![0][0]).toBe("section_id");
    expect(parsedDomain![0][1]).toBe("not_in");
    expect(parsedDomain![0][2][0]).toBe(5);
    expect(parsedDomain![0][2][1]).toBe(10);
    expect(parsedDomain![0][2][2]).toBe(6);
  });
  it("should properly parse a domain with not_in and blank array", () => {
    const domain = "[('section_id','not_in',[])]";

    const parsedDomain = parseDomain({
      domainValue: domain,
      values: {},
      fields: {},
    });

    expect(parsedDomain!.length).toBe(1);
    expect(parsedDomain![0][0]).toBe("section_id");
    expect(parsedDomain![0][1]).toBe("not_in");
    expect(parsedDomain![0][2].length).toBe(0);
  });
});
