import { GraphChart, Operator } from "..";
import { getValueAndLabelForField } from "./fieldUtils";

export type GroupedValues = {
  [key: string]: { label: string; entries: { [key: string]: any }[] };
};

export const labelsForOperator = {
  count: "count",
  "+": "sum",
  "-": "subtract",
  "*": "multiply",
  avg: "average",
  min: "min",
  max: "max",
};

export const processGraphData = ({
  ooui,
  values,
  fields,
}: {
  ooui: GraphChart;
  values: { [key: string]: any }[];
  fields: { [key: string]: any };
}) => {
  const valuesGroupedByX = getValuesGroupedByField({
    fieldName: ooui.x.name,
    values,
    fields,
  });

  const data: { [key: string]: any }[] = [];

  ooui.y.forEach((yField) => {
    Object.keys(valuesGroupedByX).forEach((xValue) => {
      const label = valuesGroupedByX[xValue].label;
      const objectsForXValue = valuesGroupedByX[xValue].entries;

      const valuesForYField = objectsForXValue
        .map((obj) => {
          return getValueAndLabelForField({
            fieldName: yField.name,
            values: obj,
            fields: fields,
          });
        })
        .map(({ value, label }) => {
          return label;
        });

      const finalValue = getValueForOperator({
        values: valuesForYField,
        operator: yField.operator,
      });

      data.push({
        [ooui.x.name]: label || false,
        [`${yField.name}_${labelsForOperator[yField.operator!]}`]: finalValue,
      });
    });
  });

  // We now merge the results with the same name key
  const uniqueXkeys = [...new Set(data.map((item) => item[ooui.x.name]))];

  console.log(uniqueXkeys);
  const processedData = uniqueXkeys.map((key) => {
    const mergedRecord = {};
    const valuesForKey = data.filter((item) => item[ooui.x.name] === key);
    valuesForKey.forEach((item) => {
      Object.assign(mergedRecord, item);
    });
    return mergedRecord as { [key: string]: any };
  });

  return { data: processedData };
};

export function getValueForOperator({
  operator,
  values,
}: {
  operator: Operator;
  values: any[];
}) {
  switch (operator) {
    case "count": {
      return values.length;
    }
    case "+": {
      return roundNumber(
        values.reduce(function (previousValue: any, currentValue: any) {
          return previousValue + currentValue;
        })
      );
    }
    case "-": {
      return roundNumber(
        values.reduce(function (previousValue: any, currentValue: any) {
          return previousValue - currentValue;
        })
      );
    }
    case "*": {
      return roundNumber(
        values.reduce(function (previousValue: any, currentValue: any) {
          return previousValue * currentValue;
        })
      );
    }
    case "avg": {
      const sum = values.reduce((a: any, b: any) => a + b, 0);
      const avg = sum / values.length || 0;
      return roundNumber(avg);
    }
    case "min": {
      return Math.min(...values);
    }
    case "max": {
      return Math.max(...values);
    }
  }
}

function roundNumber(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function getValuesGroupedByField({
  fieldName,
  fields,
  values,
}: {
  fieldName: string;
  values: { [key: string]: any }[];
  fields: { [key: string]: any };
}) {
  const groupedValues: GroupedValues = {};

  values.forEach((entry) => {
    const { value, label } = getValueAndLabelForField({
      fields,
      values: entry,
      fieldName,
    });

    if (!groupedValues[value]) {
      groupedValues[value] = { label, entries: [] };
    }

    groupedValues[value].entries.push(entry);
  });

  return groupedValues;
}

export function getAllObjectsInGroupedValues(grouped: GroupedValues) {
  let totalObjects: any[] = [];
  Object.keys(grouped).forEach((key) => {
    const group = grouped[key];
    totalObjects = totalObjects.concat(group.entries);
  });
  return totalObjects;
}
