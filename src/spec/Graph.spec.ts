import Graph from "../Graph";

describe("A Graph", () => {
  it("should parse a basic XML title and type indicator", () => {
    const xml = `<?xml version="1.0"?>
    <graph string="My indicator" type="indicator" color="red:debt>0;green:debt==0" icon="slack" />
    `;

    const graph = new Graph(xml);

    expect(graph.string).toBe("My indicator");
    expect(graph.type).toBe("indicator");
    expect(graph.color).toBe("red:debt>0;green:debt==0");
    expect(graph.icon).toBe("slack");
  });
});
