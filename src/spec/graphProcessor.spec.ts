import models from "./mockData/graphs";
import {
  getAllObjectsInGroupedValues,
  getValuesGroupedByField,
  processGraphData,
} from "../Graph/processor/graphProcessor";
import { GraphChart, parseGraph } from "../Graph";

describe("in getValuesGroupedByField method", () => {
  it("should properly group a lectura values for field 'name' - char", () => {
    const lecturaModel = models.find((m) => m.key === "lectura");
    expect(lecturaModel).toBeDefined();
    if (!lecturaModel) {
      throw new Error("Model not found");
    }
    const lecturaValues = lecturaModel.data;
    const lecturaFields = lecturaModel.fields;

    const grouped = getValuesGroupedByField({
      fieldName: "name",
      values: lecturaValues as any,
      fields: lecturaFields as any,
    });

    expect(getAllObjectsInGroupedValues(grouped).length).toBe(23);
    expect(Object.keys(grouped).length).toBe(12);
    expect(grouped["2020-09-30"].label).toBe("2020-09-30");
    expect(grouped["2020-09-30"].entries.length).toBe(1);
    expect(grouped["2020-09-30"].entries[0].name).toBe("2020-09-30");
    expect(grouped["2020-07-31"].entries.length).toBe(6);
    expect(grouped["2020-07-08"].entries.length).toBe(4);
    expect(grouped["2020-05-31"].entries.length).toBe(2);
    expect(grouped["2015-10-31"].entries.length).toBe(1);
  });
  it("should properly group a lectura values for field 'comptador' - many2one", () => {
    const lecturaModel = models.find((m) => m.key === "lectura");
    expect(lecturaModel).toBeDefined();
    if (!lecturaModel) {
      throw new Error("Model not found");
    }
    const lecturaValues = lecturaModel.data;
    const lecturaFields = lecturaModel.fields;

    const grouped = getValuesGroupedByField({
      fieldName: "comptador",
      values: lecturaValues as any,
      fields: lecturaFields as any,
    });

    expect(getAllObjectsInGroupedValues(grouped).length).toBe(23);
    expect(Object.keys(grouped).length).toBe(5);
    expect(Object.keys(grouped).toString()).toBe("1,3,13,14,15");
    expect(grouped["1"].label).toBe("B63011077");
    expect(grouped["3"].label).toBe("42553686");
    expect(grouped["13"].label).toBe("1234567898");
    expect(grouped["1"].entries.length).toBe(5);
    expect(grouped["3"].entries.length).toBe(1);
    expect(grouped["13"].entries.length).toBe(6);
  });
  it("should properly group a lectura values for field 'motiu_ajust' - selection", () => {
    const lecturaModel = models.find((m) => m.key === "lectura");
    expect(lecturaModel).toBeDefined();
    if (!lecturaModel) {
      throw new Error("Model not found");
    }
    const lecturaValues = lecturaModel.data;
    const lecturaFields = lecturaModel.fields;

    const grouped = getValuesGroupedByField({
      fieldName: "motiu_ajust",
      values: lecturaValues as any,
      fields: lecturaFields as any,
    });

    expect(getAllObjectsInGroupedValues(grouped).length).toBe(23);
    expect(Object.keys(grouped).length).toBe(2);
    expect(Object.keys(grouped).toString()).toBe("false,01");
    expect(grouped["false"].label).toBeUndefined();
    expect(grouped["false"].entries.length).toBe(21);
    expect(grouped["01"].label).toBe("Verificación equipo de medida");
    expect(grouped["01"].entries.length).toBe(2);
  });
  it("should properly throw an error if the field is not found", () => {
    const lecturaModel = models.find((m) => m.key === "lectura");
    expect(lecturaModel).toBeDefined();
    if (!lecturaModel) {
      throw new Error("Model not found");
    }
    const lecturaValues = lecturaModel.data;
    const lecturaFields = lecturaModel.fields;

    const test = () => {
      getValuesGroupedByField({
        fieldName: "data_alta",
        values: lecturaValues as any,
        fields: lecturaFields as any,
      });

      expect(test).toThrowError();
    };
  });
});

describe("in processGraphData method", () => {
  it("should do basic test", () => {
    const parsedGraph = parseGraph(`<?xml version="1.0"?>
    <graph type="bar">
      <field name="name" axis="x"/>
      <field name="consum" operator="+" axis="y"/>
    </graph>
    `) as GraphChart;
    const lecturaModel = models.find((m) => m.key === "lectura");
    expect(lecturaModel).toBeDefined();
    if (!lecturaModel) {
      throw new Error("Model not found");
    }
    const lecturaValues = lecturaModel.data;
    const lecturaFields = lecturaModel.fields;

    const data = processGraphData({
      ooui: parsedGraph,
      values: lecturaValues as any,
      fields: lecturaFields as any,
    });

    console.log(JSON.stringify(data, null, 2));
    expect(data).toBeTruthy();
  });
});
