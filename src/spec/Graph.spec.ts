import {
  GraphIndicator,
  GraphChart,
  parseGraph,
  GraphAxis,
  GraphIndicatorField,
  GraphYAxis,
} from "..";
import { it, expect, describe } from "vitest";

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

    const graph = parseGraph(xml) as GraphChart;
    const y: GraphYAxis = graph.y[0];

    expect(graph.type).toBe("line");
    expect(graph.x).toBeDefined();
    expect(graph.y).toBeDefined();
    expect(graph.x.name).toBe("data_alta");
    expect(y.name).toBe("data_alta");
    expect(graph.x.axis).toBe("x");
    expect(y.axis).toBe("y");
    expect(y.operator).toBe("+");
  });
  it("should parse a basic XML title and type indicator field", () => {
    const xml = `<?xml version="1.0"?>
    <graph string="My indicator" type="indicatorField" color="red:debt>0;green:debt==0" icon="slack"><field name="potencia" operator="+" /></graph>
    `;

    const graph = parseGraph(xml) as GraphIndicatorField;

    expect(graph.string).toBe("My indicator");
    expect(graph.type).toBe("indicatorField");
    expect(graph.color).toBe("red:debt>0;green:debt==0");
    expect(graph.icon).toBe("slack");
    expect(graph.field).toBe("potencia");
    expect(graph.operator).toBe("+");
  });
  it("should parse a graph with timerange parameter", () => {
    const xml = `<?xml version="1.0"?>
    <graph type="line" timerange="day">
        <field name="data_alta" axis="x"/>
        <field name="data_alta" operator="count" axis="y"/>
    </graph>
    `;

    const graph = parseGraph(xml) as GraphChart;
    expect(graph.timerange).toBe("day");
  });
  it("should parse a graph with interval parameter", () => {
    const xml = `<?xml version="1.0"?>
    <graph type="line" timerange="minute" interval="5">
        <field name="data_alta" axis="x"/>
        <field name="data_alta" operator="count" axis="y"/>
    </graph>
    `;

    const graph = parseGraph(xml) as GraphChart;
    expect(graph.interval).toBe(5);
  });
});
