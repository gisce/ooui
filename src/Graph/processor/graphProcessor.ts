import { GraphChart, GraphYAxis, Operator } from "..";
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
  // First we group all the results by the x field. This way we will have one or more items in an array for every occurrence of ooui.x.name
  // Result of this will be an object which keys will be unique keys for values of ooui.x.name for each item
  const valuesGroupedByX = getValuesGroupedByField({
    fieldName: ooui.x.name,
    values,
    fields,
  });

  const data: { [key: string]: any }[] = [];

  // We iterate through the y axis items found in the ooui object
  ooui.y.forEach((yField) => {
    // We iterate now for every single key of the grouped results by x
    Object.keys(valuesGroupedByX).forEach((xValue) => {
      const xLabel = valuesGroupedByX[xValue].label;
      const objectsForXValue = valuesGroupedByX[xValue].entries;

      // If the y field hasn't got label defined
      if (!yField.label) {
        // We calculate the final value using the entries of this unique x key
        const valuesForYField = getValuesForYField({
          entries: objectsForXValue,
          fields,
          fieldName: yField.name,
        });

        const finalValue = getValueForOperator({
          values: valuesForYField,
          operator: yField.operator,
        });

        data.push({
          x: xLabel || false,
          value: finalValue,
          type: getYAxisFieldname({
            yAxis: yField,
            fields,
          }),
          stacked: yField.stacked,
        });
      }
      // The field has label
      else {
        // We retrieve an object with unique keys and grouped values for the label
        const valuesGroupedByYLabel = getValuesGroupedByField({
          fieldName: yField.label,
          values: objectsForXValue,
          fields,
        });

        // For every key of the grouped results by label
        Object.keys(valuesGroupedByYLabel).forEach((yUniqueValue) => {
          const entries = valuesGroupedByYLabel[yUniqueValue].entries;
          const label = valuesGroupedByYLabel[yUniqueValue].label;

          // We calculate the final value using the entries of this unique x key
          const valuesForYField = getValuesForYField({
            entries,
            fields,
            fieldName: yField.name,
          });

          const finalValue = getValueForOperator({
            values: valuesForYField,
            operator: yField.operator,
          });
          data.push({
            x: xLabel || false,
            value: finalValue,
            type: label,
            stacked: yField.stacked,
          });
        });
      }
    });
  });

  // Check if we have to flag isGroup
  const isGroup = ooui.y.some((y) => y.label !== undefined);

  // Check if we have to flag isStacked
  const isStack = data.some((entry) => entry.stacked !== undefined);

  // We sort the data by x
  const sortedData = data.sort((a, b) => {
    if (a["x"] < b["x"]) {
      return -1;
    }
    if (a["x"] > b["x"]) {
      return 1;
    }
    return 0;
  });

  let adjustedStackedData = [...sortedData];
  // If it's an stacked graph and we have more than one group stacked, we have to change the type description in order to add
  // the stacked group
  if (
    isStack &&
    data.filter((entry) => entry.stacked !== undefined).length > 1
  ) {
    adjustedStackedData = adjustedStackedData.map((entry) => {
      return { ...entry, type: `${entry.type} - ${entry.stacked}` };
    });
  }

  return {
    data: adjustedStackedData,
    isGroup: isStack || isGroup,
    isStack,
  };
};

export function getValuesForYField({
  entries,
  fieldName,
  fields,
}: {
  entries: { [key: string]: any }[];
  fieldName: string;
  fields: { [key: string]: any };
}) {
  return entries
    .map((obj) => {
      return getValueAndLabelForField({
        fieldName: fieldName,
        values: obj,
        fields: fields,
      });
    })
    .map(({ value, label }) => {
      return label;
    });
}

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

export function getYAxisFieldname({
  yAxis,
  fields,
}: {
  yAxis: GraphYAxis;
  fields: { [key: string]: any };
}) {
  const fieldProps = fields[yAxis.name];

  if (fieldProps && fieldProps.string) {
    // return `${fieldProps.string} (${labelsForOperator[yAxis.operator]})`;
    return fieldProps.string;
  }

  // return yAxis.name + "_" + labelsForOperator[yAxis.operator];
  return yAxis.name;
}
