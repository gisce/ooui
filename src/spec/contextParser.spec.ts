import { parseContext } from "../helpers/contextParser";

describe("A Context Parser", () => {
  describe("in parseContext method", () => {
    it("should properly parse a blank context", () => {
      const str = "";

      const parsedContext = parseContext({ context: str });

      expect(parsedContext).toBeUndefined();
    });

    it("should properly parse a context", () => {
      const context =
        "{'power': potencia, 'tarifa_id': tarifa, 'o2m': tensio_o2m, 'tensio_id': tensio_normalitzada, 'model': 'giscedata.polissa', 'field': 'potencia'}";
      const values = {
        potencia: 45,
        tarifa: "test",
        tensio_normalitzada: [43, "Test"],
        tensio_o2m: [
          { operation: "original", id: 1 },
          { operation: "original", id: 2 },
        ],
      };
      const fields = {
        potencia: {
          type: "float",
        },
        tarifa: {
          type: "char",
        },
        tensio_normalitzada: {
          type: "many2one",
        },
        tensio_o2m: {
          type: "one2many",
        },
      };

      const parsedContext: any = parseContext({ context, values, fields });
      expect(parsedContext!["power"]).toBe(45);
      expect(parsedContext!["tarifa_id"]).toBe("test");
      expect(parsedContext!["tensio_id"]).toBe(43);
      expect(parsedContext!["o2m"][0]).toBe(1);
      expect(parsedContext!["o2m"][1]).toBe(2);
    });

    it("should properly parse a boolean context", () => {
      const str = "{'active_test': False}";

      const parsedContext = parseContext({ context: str });

      expect(parsedContext!["active_test"]).toBeDefined();
      expect(parsedContext!["active_test"]).toBeFalsy();
    });

    it("should properly parse a boolean context", () => {
      const str = "{'active_test': True}";

      const parsedContext = parseContext({ context: str });

      expect(parsedContext!["active_test"]).toBeDefined();
      expect(parsedContext!["active_test"]).toBeTruthy();
    });

    it("should properly parse a number context", () => {
      const str = "{'active_id': 3}";

      const parsedContext = parseContext({ context: str });

      expect(parsedContext!["active_id"]).toBeDefined();
      expect(parsedContext!["active_id"]).toBe(3);
    });

    it("should properly parse with double quotes", () => {
      const str = "{\"active_id\": 3}";

      const parsedContext = parseContext({ context: str });

      expect(parsedContext!["active_id"]).toBeDefined();
      expect(parsedContext!["active_id"]).toBe(3);
    });

    it("should properly parse with double quotes", () => {
      const str = '{"active_id": 3}';

      const parsedContext = parseContext({ context: str });

      expect(parsedContext!["active_id"]).toBeDefined();
      expect(parsedContext!["active_id"]).toBe(3);
    });

    it("should properly return a object when context is a object", () => {
      const ctx = {
        person: {
          name: "John Doe",
          age: 30,
          address: {
            street: "123 Main St",
            city: "Exampleville",
            country: "Exampleland",
          },
        },
      };

      const parsedContext = parseContext({ context: ctx });

      expect(parsedContext!["person"]).toBeDefined();
      expect(parsedContext!["person"].name).toBe("John Doe");
      expect(JSON.stringify(parsedContext)).toBe(JSON.stringify(ctx));
    });
  });

  it("should properly return a parsed object when context is a string json", () => {
    const ctx = {
      person: {
        name: "John Doe",
        age: 30,
        address: {
          street: "123 Main St",
          city: "Exampleville",
          country: "Exampleland",
        },
      },
    };

    const parsedContext = parseContext({ context: JSON.stringify(ctx) });
    expect(parsedContext!["person"]).toBeDefined();
    expect(parsedContext!["person"].name).toBe("John Doe");
    expect(JSON.stringify(parsedContext)).toBe(JSON.stringify(ctx));
  });

  it.only("should parse context with simple single quotes in a string", () => {
    const string = "{'contract_id': 1, 'contract_ids': [1, 3]}";
    const parsedContext = parseContext({ context: string });
    expect(parsedContext!["contract_id"]).toBe(1);
  });
});
