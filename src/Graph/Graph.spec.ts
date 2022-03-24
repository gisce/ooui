import { GraphIndicator, GraphLine } from ".";
import { parseGraph } from "..";

describe("A Graph", () => {
  it("should parse a basic XML title and type indicator", () => {
    const xml = `<?xml version="1.0"?>
    <graph string="My indicator" type="indicator" color="red:debt>0;green:debt==0" icon="slack" />
    `;

    const graph = parseGraph(xml) as GraphIndicator;

    expect(graph.string).toBe("My indicator");
    expect(graph.type).toBe("indicator");
    expect(graph.color).toBe("red:debt>0;green:debt==0");
    expect(graph.icon).toBe("slack");
  });
  it("should parse a chart graph XML with type line", () => {
    const xml = `<?xml version="1.0"?>
    <graph type="line">
      <field name="data_alta" axis="x"/>
      <field name="data_alta" operator="+" axis="y"/>
    </graph>
    `;

    const graph = parseGraph(xml) as GraphLine;
    expect(graph.type).toBe("line");
    expect(graph.x).toBeDefined();
    expect(graph.y).toBeDefined();
    expect(graph.x?.name).toBe("data_alta");
    expect(graph.y?.name).toBe("data_alta");
    expect(graph.x?.axis).toBe("x");
    expect(graph.y?.axis).toBe("y");
    expect(graph.x?.operator).toBeNull();
    expect(graph.y?.operator).toBe("+");
  });
});
