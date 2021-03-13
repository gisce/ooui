import domainParser from "../helpers/domainParser";

describe("A Domain Parser", () => {
  it("should properly parse a false domain", () => {
    const parsedDomain = domainParser(false);
    expect(Array.isArray(parsedDomain)).toBeTruthy();
    expect(parsedDomain!.length).toBe(0);
  });
  it("should properly parse a basic string domain", () => {
    const parsedDomain = domainParser("[('municipi_id.id', '=', id_municipi)]");
    expect(Array.isArray(parsedDomain)).toBeTruthy();
  });
  it("should properly parse multiple string domain", () => {
    const parsedDomain = domainParser(
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
    const parsedDomain = domainParser("[('test', '=', True)]");
    expect(Array.isArray(parsedDomain)).toBeTruthy();
    expect(parsedDomain.length).toBe(1);
    expect(parsedDomain[0][0]).toBe("test");
    expect(parsedDomain[0][1]).toBe("=");
    expect(parsedDomain[0][2]).toBe("True");
  });
  it("should properly parse a basic boolean false domain", () => {
    const parsedDomain = domainParser("[('test', '=', False)]");
    expect(Array.isArray(parsedDomain)).toBeTruthy();
    expect(parsedDomain.length).toBe(1);
    expect(parsedDomain[0][0]).toBe("test");
    expect(parsedDomain[0][1]).toBe("=");
    expect(parsedDomain[0][2]).toBe("False");
  });
  it("should properly parse a float numeric domain", () => {
    const parsedDomain = domainParser("[('test', '=', 50.3)]");
    expect(Array.isArray(parsedDomain)).toBeTruthy();
    expect(parsedDomain.length).toBe(1);
    expect(parsedDomain[0][0]).toBe("test");
    expect(parsedDomain[0][1]).toBe("=");
    expect(parsedDomain[0][2]).toBe("50.3");
  });
  it("should properly parse a integer numeric domain", () => {
    const parsedDomain = domainParser("[('test', '=', 15000)]");
    expect(Array.isArray(parsedDomain)).toBeTruthy();
    expect(parsedDomain.length).toBe(1);
    expect(parsedDomain[0][0]).toBe("test");
    expect(parsedDomain[0][1]).toBe("=");
    expect(parsedDomain[0][2]).toBe("15000");
  });
});
