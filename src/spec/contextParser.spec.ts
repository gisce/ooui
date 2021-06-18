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
        "{'power': potencia, 'tarifa_id': tarifa, 'tensio_id': tensio_normalitzada, 'model': 'giscedata.polissa', 'field': 'potencia'}";
      const values = {
        potencia: 45,
        tarifa: "test",
        tensio_normalitzada: [43],
      };

      const parsedContext: any = parseContext({ context, values });
      expect(parsedContext!["power"]).toBe(45);
      expect(parsedContext!["tarifa_id"]).toBe("test");
      expect(parsedContext!["tensio_id"][0]).toBe(43);
    });
  });
});
