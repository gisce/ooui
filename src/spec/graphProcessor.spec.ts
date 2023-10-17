import models from "./mockData/graphs";
import {
  getAllObjectsInGroupedValues,
  getValuesGroupedByField,
  processGraphData,
} from "../Graph/processor/graphProcessor";
import { GraphChart, parseGraph } from "../Graph";
import { it, expect, describe } from "vitest";

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
  it("should do basic test with one y axis", () => {
    const { data, isGroup, isStack } = getGraphData(
      `<?xml version="1.0"?>
    <graph type="pie">
      <field name="llista_preu" axis="x"/>
      <field name="llista_preu" operator="count" axis="y"/>
    </graph>
    `,
      "polissa",
    );
    expect(data).toBeTruthy();

    expect(isGroup).toBe(false);
    expect(isStack).toBe(false);

    expect(data.length).toBe(6);
    expect(
      data.find(
        (d) =>
          d.x === "TARIFAS ELECTRICIDAD (EUR)" &&
          d.value === 8 &&
          d.type === "Tarifa Comercialitzadora",
      ),
    ).toBeTruthy();
    expect(
      data.find(
        (d) =>
          d.x === "Adeu (CHF)" &&
          d.value === 4 &&
          d.type === "Tarifa Comercialitzadora",
      ),
    ).toBeTruthy();
    expect(
      data.find(
        (d) =>
          d.x === "Hola bipartit (EUR)" &&
          d.value === 5 &&
          d.type === "Tarifa Comercialitzadora",
      ),
    ).toBeTruthy();
    expect(
      data.find(
        (d) =>
          d.x === "Mucha potencia (EUR)" &&
          d.value === 1 &&
          d.type === "Tarifa Comercialitzadora",
      ),
    ).toBeTruthy();

    expect(
      data.find(
        (d) =>
          d.x === "Hola (EUR)" &&
          d.value === 13 &&
          d.type === "Tarifa Comercialitzadora",
      ),
    ).toBeTruthy();

    expect(
      data.find(
        (d) =>
          d.x === false &&
          d.value === 2 &&
          d.type === "Tarifa Comercialitzadora",
      ),
    ).toBeUndefined();

    expect(
      data.find(
        (d) =>
          d.x === "random" &&
          d.value === 15 &&
          d.type === "Tarifa Comercialitzadora",
      ),
    ).toBeUndefined();
  });

  it("should do basic test with one y axis (line)", () => {
    const { data, isGroup, isStack } = getGraphData(
      `<?xml version="1.0"?>
      <graph type="line">
      <field name="data_alta" axis="x"/>
      <field name="data_alta" operator="count" axis="y"/>
  </graph>
    `,
      "polissa",
    );

    expect(isGroup).toBe(false);
    expect(isStack).toBe(false);

    expect(data).toBeTruthy();
    expect(data.length).toBe(13);
    expect(data.some((entry) => entry.x === false)).toBeFalsy();
  });

  it("should do basic test with one y axis with label", () => {
    const { data, isGroup, isStack } = getGraphData(
      `<?xml version="1.0"?>
    <graph type="bar">
      <field name="name" axis="x" />
      <field name="consum" operator="+" label="periode" axis="y"/>
    </graph>
    `,
      "lectura",
    );

    expect(isGroup).toBe(true);
    expect(isStack).toBe(false);

    expect(data.length).toBe(15);
    const obj1 = data.find((d) => d.x === "2020-09-30")!;
    expect(obj1).toBeTruthy();
    expect(obj1.value).toBe(0);
    expect(obj1.type).toBe("2.0A (P1)");
    const obj2 = data.filter((d) => d.x === "2020-07-31")!;
    expect(obj2).toBeTruthy();
    expect(obj2.length).toBe(3);
    expect(obj2.map((e) => e.type).toString()).toBe(
      "2.0A (P1),2.0DHA (P1),2.0DHA (P2)",
    );
  });

  it("should do basic test with one y axis with label and stacked", () => {
    const { data, isGroup, isStack } = getGraphData(
      `<?xml version="1.0"?>
    <graph type="bar">
      <field name="name" axis="x" />
      <field name="consum" operator="+" label="periode" stacked="periode" axis="y"/>
    </graph>
    `,
      "lectura",
    );

    expect(isGroup).toBe(true);
    expect(isStack).toBe(true);

    expect(data.length).toBe(15);
    const obj1 = data.find((d) => d.x === "2020-09-30")!;
    expect(obj1).toBeTruthy();
    expect(obj1.value).toBe(0);
    expect(obj1.type).toBe("2.0A (P1)");
    const obj2 = data.filter((d) => d.x === "2020-07-31")!;
    expect(obj2).toBeTruthy();
    expect(obj2.length).toBe(3);
    expect(obj2.map((e) => e.type).toString()).toBe(
      "2.0A (P1),2.0DHA (P1),2.0DHA (P2)",
    );
  });

  it("should do basic test with two y axis", () => {
    const { data, isGroup, isStack } = getGraphData(
      `<?xml version="1.0"?>
    <graph type="bar">
      <field name="name" axis="x"/>
      <field name="consum" operator="+" axis="y"/>
      <field name="ajust" operator="+" axis="y"/>
    </graph>
    `,
      "lectura",
    );

    expect(isGroup).toBe(false);
    expect(isStack).toBe(false);

    expect(data.length).toBe(24);

    const obj1 = data.find((d) => d.x === "2015-10-31" && d.type == "Consum");
    expect(obj1!).toBeTruthy();
    expect(obj1!.value).toBe(0);

    const obj2 = data.find((d) => d.x === "2015-10-31" && d.type == "Ajust");
    expect(obj2!).toBeTruthy();
    expect(obj2!.value).toBe(15);

    const obj3 = data.find((d) => d.x === "2020-07-31" && d.type == "Consum");
    expect(obj3!).toBeTruthy();
    expect(obj3!.value).toBe(400);

    const obj4 = data.find((d) => d.x === "2020-09-30" && d.type == "Consum");
    expect(obj4!).toBeTruthy();
    expect(obj4!.value).toBe(0);
  });

  it("should do basic test with 4 y axis, stacked but without labels", () => {
    const { data, isGroup, isStack } = getGraphData(
      `<?xml version="1.0"?>
    <graph type="bar">
      <field name="name" axis="x"/>
      <field name="consum" operator="+" axis="y" stacked="entrada" />
      <field name="ajust" operator="+" axis="y" stacked="entrada" />
      <field name="generacio" operator="+" axis="y" stacked="sortida" />
      <field name="ajust_exporta" operator="+" axis="y" stacked="sortida" />
    </graph>
    `,
      "lectura",
    );

    expect(isGroup).toBe(true);
    expect(isStack).toBe(true);

    expect(data.length).toBe(48);

    const obj1 = data.find(
      (d) => d.x === "2015-10-31" && d.type == "Consum - entrada",
    );
    expect(obj1!).toBeTruthy();
    expect(obj1!.value).toBe(0);
    expect(obj1!.stacked).toBe("entrada");

    const obj2 = data.find(
      (d) => d.x === "2015-10-31" && d.type == "Ajust - entrada",
    );
    expect(obj2!).toBeTruthy();
    expect(obj2!.value).toBe(15);
    expect(obj2!.stacked).toBe("entrada");

    const obj3 = data.find(
      (d) => d.x === "2015-10-31" && d.type == "Generació - sortida",
    );
    expect(obj3!).toBeTruthy();
    expect(obj3!.value).toBe(0);
    expect(obj3!.stacked).toBe("sortida");

    const obj4 = data.find(
      (d) => d.x === "2015-10-31" && d.type == "Ajust Exporta - sortida",
    );
    expect(obj4!).toBeTruthy();
    expect(obj4!.value).toBe(0);
    expect(obj4!.stacked).toBe("sortida");
  });

  it("should do basic test with 2 y axis, stacked and label", () => {
    const { data, isGroup, isStack } = getGraphData(
      `<?xml version="1.0"?>
    <graph type="bar">
      <field name="name" axis="x"/>
      <field name="consum" operator="+" label="periode" axis="y" stacked="entrada" />
      <field name="generacio" operator="+" label="periode" axis="y" stacked="sortida" />
    </graph>
    `,
      "lectura",
    );

    expect(isGroup).toBe(true);
    expect(isStack).toBe(true);

    expect(data.length).toBe(30);

    const obj1 = data.find(
      (d) => d.x === "2015-10-31" && d.stacked == "entrada",
    );
    expect(obj1!).toBeTruthy();
    expect(obj1!.value).toBe(0);
    expect(obj1!.type).toBe("2.0A (P1) - entrada");

    const obj2 = data.find(
      (d) => d.x === "2015-10-31" && d.stacked == "sortida",
    );
    expect(obj2!).toBeTruthy();
    expect(obj2!.value).toBe(0);
    expect(obj2!.type).toBe("2.0A (P1) - sortida");
  });

  it("should do basic test with 2 y axis, stacked, 1 label, 1 without label", () => {
    const { data, isGroup, isStack } = getGraphData(
      `<?xml version="1.0"?>
    <graph type="bar">
      <field name="name" axis="x"/>
      <field name="consum" operator="+" label="periode" axis="y" stacked="entrada" />
      <field name="generacio" operator="+" axis="y" stacked="sortida" />
    </graph>
    `,
      "lectura",
    );

    expect(isGroup).toBe(true);
    expect(isStack).toBe(true);

    expect(data.length).toBe(27);

    const obj1 = data.find(
      (d) => d.x === "2015-10-31" && d.stacked == "entrada",
    );
    expect(obj1!).toBeTruthy();
    expect(obj1!.value).toBe(0);
    expect(obj1!.type).toBe("2.0A (P1) - entrada");

    const obj2 = data.find(
      (d) => d.x === "2015-10-31" && d.stacked == "sortida",
    );
    expect(obj2!).toBeTruthy();
    expect(obj2!.value).toBe(0);
    expect(obj2!.type).toBe("Generació - sortida");
  });

  it("should do basic test with a timerange for days", () => {
    const { data, isGroup, isStack } = getGraphData(
      `<?xml version="1.0"?>
      <graph type="line" timerange="day">
      <field name="data_alta" axis="x"/>
      <field name="data_alta" operator="count" axis="y"/>
  </graph>
    `,
      "polissa",
    );

    expect(isGroup).toBe(false);
    expect(isStack).toBe(false);

    expect(data).toBeTruthy();
    expect(data.length).not.toBe(13);

    const obj1 = data.find((d) => d.x === "2019-01-01");
    expect(obj1).toBeTruthy();
    expect(obj1!.value).toBe(3);

    expect(data.some((entry) => entry.x === false)).toBeFalsy();
  });
});

function getModelData(model: string) {
  const modelObj = models.find((m) => m.key === model);
  if (!modelObj) {
    throw new Error("Model not found");
  }
  return modelObj;
}

function getGraphData(xml: string, model: string) {
  const parsedGraph = parseGraph(xml) as GraphChart;

  const { data: values, fields } = getModelData(model);

  return processGraphData({
    ooui: parsedGraph,
    values: values as any,
    fields: fields as any,
  });
}
