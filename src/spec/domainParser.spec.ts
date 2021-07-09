import {
  parseDomain,
  combineDomains,
  convertArrayDomainToString,
} from "../helpers/domainParser";

describe("A Domain Parser", () => {
  describe("in parseDomain method", () => {
    it("should properly parse a basic string domain", () => {
      const domain = "[('test', '=', 'foo')]";

      const parsedDomain = parseDomain({
        domainValue: domain,
        values: {},
        fields: {},
      });

      expect(parsedDomain).toBe(domain.replace(/\s/g, ""));
    });
    it("should properly parse a multiple string domain", () => {
      const domain = "[('test', '=', 'foo'),('test', '=', 'bar')]";

      const parsedDomain = parseDomain({
        domainValue: domain,
        values: {},
        fields: {},
      });

      expect(parsedDomain).toBe(domain.replace(/\s/g, ""));
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

      expect(parsedDomain).toBe("[('municipi_id.id','=',6)]");
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

      expect(parsedDomain).toBe(
        "[('municipi_id.id','=',6),('test.id','=',10)]"
      );
    });
    it("should properly parse a basic boolean true domain", () => {
      const domain = "[('test', '=', True)]";

      const parsedDomain = parseDomain({
        domainValue: domain,
        values: {},
        fields: {},
      });

      expect(parsedDomain).toBe(domain.replace(/\s/g, ""));
    });
    it("should properly parse a basic boolean false domain", () => {
      const domain = "[('test', '=', False)]";
      const parsedDomain = parseDomain({
        domainValue: domain,
        values: {},
        fields: {},
      });

      expect(parsedDomain).toBe(domain.replace(/\s/g, ""));
    });
    it("should properly parse a float numeric domain", () => {
      const domain = "[('test', '=', 50.3)]";
      const parsedDomain = parseDomain({
        domainValue: domain,
        values: {},
        fields: {},
      });

      expect(parsedDomain).toBe(domain.replace(/\s/g, ""));
    });
    it("should properly parse a integer numeric domain", () => {
      const domain = "[('test', '=', 15000)]";
      const parsedDomain = parseDomain({
        domainValue: domain,
        values: {},
        fields: {},
      });

      expect(parsedDomain).toBe(domain.replace(/\s/g, ""));
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

      expect(parsedDomain).toBe(
        "['&',('test','=',15000),'|',('municipi_id.id','=',6),('bool','=',True)]"
      );
    });
  });
  describe("in combineDomains method", () => {
    it("should combine multiple domains in a unique string", () => {
      const domains = [
        "['&',('test','=',15000),'|',('municipi_id.id','=',6),('bool','=',True)]",
        "[('test', '=', 50.3)]",
      ];
      const combinedDomains = combineDomains(domains);
      expect(combinedDomains).toBe(
        "['&',('test','=',15000),'|',('municipi_id.id','=',6),('bool','=',True),('test', '=', 50.3)]"
      );
    });
  });
  describe("in convertArrayDomainToString method", () => {
    it("Should return undefined when receiving domain false", () => {
      const domainValue = false;
      const converted = convertArrayDomainToString(domainValue);
      expect(converted).toBeUndefined();
    });
    it("hould return undefined when receiving an empty array as a domain", () => {
      const domainValue: any[] = [];
      const converted = convertArrayDomainToString(domainValue);
      expect(converted).toBeUndefined();
    });
    it("Should convert an array domain to string", () => {
      const domainValue = [["type", "=", "sale"]];
      const converted = convertArrayDomainToString(domainValue);
      expect(converted).toBe("[('type','=','sale')]");
    });
    it("Should convert an array domain with boolean to string", () => {
      const converted = convertArrayDomainToString([["type", "=", false]]);
      expect(converted).toBe("[('type','=',False)]");
      const converted2 = convertArrayDomainToString([["type", "=", true]]);
      expect(converted2).toBe("[('type','=',True)]");
    });
    it("Should convert an array domain with numeric to string", () => {
      const converted = convertArrayDomainToString([["type", "=", 5]]);
      expect(converted).toBe("[('type','=',5)]");
      const converted2 = convertArrayDomainToString([["type", "=", 10.32]]);
      expect(converted2).toBe("[('type','=',10.32)]");
    });
    it("Should convert an array domain with multiple entries to string", () => {
      const domainValue = [
        ["type", "=", "sale"],
        ["foo", ">", "bar"],
      ];
      const converted = convertArrayDomainToString(domainValue);
      expect(converted).toBe("[('type','=','sale'),('foo','>','bar')]");
    });
  });
});
