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
  });
});
