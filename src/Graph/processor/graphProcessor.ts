import { GraphChart, GraphYAxis, Operator } from "..";
import { getValueAndLabelForField } from "./fieldUtils";
import { processTimerangeData } from "./timerangeHelper";

export type GroupedValues = Record<
  string,
  { label: string; entries: Array<Record<string, any>> }
>;

type GraphValues = {
  value: number;
  [key: string]: any;
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

export type ProcessGraphDataOpts = {
  uninformedString: string;
};

export type YAxisOpts = {
  mode?: "auto" | "default" | "full" | "slider";
  valueOpts?: MinMaxValues;
};

export type MinMaxValues = {
  min: number;
  max: number;
};

export type Result = {
  data: any[];
  isGroup: boolean;
  isStack: boolean;
  yAxisOpts?: YAxisOpts;
};

export const processGraphData = ({
  ooui,
  values,
  fields,
  options,
}: {
  ooui: GraphChart;
  values: Array<Record<string, any>>;
  fields: Record<string, any>;
  options?: ProcessGraphDataOpts;
}) => {
  // First we group all the results by the x field. This way we will have one or more items in an array for every occurrence of ooui.x.name
  // Result of this will be an object which keys will be unique keys for values of ooui.x.name for each item
  const valuesGroupedByX = getValuesGroupedByField({
    fieldName: ooui.x.name,
    values,
    fields,
  });

  const data: GraphValues[] = [];
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
          operator: yField.operator,
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
            operator: yField.operator,
            stacked: yField.stacked,
          });
        });
      }
    });
  });

  // Check if we have to flag isGroup
  const isGroup = ooui.y.some((y) => y.label !== undefined);

  // Check if we have to flag isStacked
  const isStack = ooui.y.some((entry) => entry.stacked !== undefined);

  // We sort the data by x
  const sortedData = data.sort((a, b) => {
    if (a.x < b.x) {
      return -1;
    }
    if (a.x > b.x) {
      return 1;
    }
    return 0;
  });

  let adjustedStackedData = [...sortedData];
  // If it's an stacked graph and we have more than one group stacked, we have to change the type description in order to add
  // the stacked group
  if (
    isStack &&
    ooui.y.filter((entry) => entry.stacked !== undefined).length > 1
  ) {
    adjustedStackedData = adjustedStackedData.map((entry) => {
      return { ...entry, type: `${entry.type} - ${entry.stacked}` };
    });
  }

  let adjustedUninformedData = [...adjustedStackedData];
  // If the type of the graph is pie, we have to check for "false" (uninformed) computes values
  // in order to adjust the description to a localized string for "Unassigned / not introduced"
  // Else, we have to ignore those entries
  if (
    ooui.type === "pie" &&
    adjustedUninformedData.some((entry) => entry.x === false)
  ) {
    adjustedUninformedData = adjustedUninformedData.map((entry) => {
      if (entry.x === false) {
        return { ...entry, x: options?.uninformedString || "Not informed" };
      }
      return entry;
    });
  } else if (adjustedStackedData.some((entry) => entry.x === false)) {
    adjustedUninformedData = adjustedUninformedData.filter(
      (entry) => entry.x !== false,
    );
  }

  // If we have a timerange parameter defined in ooui, we must fill the gaps with the desired units and group results too
  let finalData = adjustedUninformedData;

  if (ooui.timerange) {
    finalData = processTimerangeData({
      values: finalData,
      timerange: ooui.timerange,
      interval: ooui.interval,
    });
  } else if (ooui.type == "pie") {
    finalData = adjustedUninformedData.sort((a, b) => b.value - a.value);
  }

  const result: Result = {
    data: finalData,
    isGroup: isStack || isGroup,
    isStack,
  };

  if (ooui.type === "line" && ooui.y_range) {
    result.yAxisOpts = {
      mode: ooui.y_range,
    };
    if (ooui.y_range === "auto") {
      const { min, max } = getMinMax(finalData);
      result.yAxisOpts.valueOpts = { min, max };
    }
  }

  return result;
};

export function getValuesForYField({
  entries,
  fieldName,
  fields,
}: {
  entries: Array<Record<string, any>>;
  fieldName: string;
  fields: Record<string, any>;
}) {
  return entries
    .map((obj) => {
      return getValueAndLabelForField({
        fieldName,
        values: obj,
        fields,
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
        values.reduce(function (previousValue: number, currentValue: number) {
          return previousValue + currentValue;
        }),
      );
    }
    case "-": {
      return roundNumber(
        values.reduce(function (previousValue: number, currentValue: number) {
          return previousValue - currentValue;
        }),
      );
    }
    case "*": {
      return roundNumber(
        values.reduce(function (previousValue: number, currentValue: number) {
          return previousValue * currentValue;
        }),
      );
    }
    case "avg": {
      const sum = values.reduce((a: number, b: number) => a + b, 0);
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
  values: Array<Record<string, any>>;
  fields: Record<string, any>;
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
  fields: Record<string, any>;
}) {
  const fieldProps = fields[yAxis.name];

  if (fieldProps?.string) {
    // return `${fieldProps.string} (${labelsForOperator[yAxis.operator]})`;
    return fieldProps.string;
  }

  // return yAxis.name + "_" + labelsForOperator[yAxis.operator];
  return yAxis.name;
}

export function getMinMax(values: GraphValues[], margin: number = 0.1) {
  if (values.length === 0) {
    throw new Error("The values array cannot be empty.");
  }
  const valueList = values.map((d) => d.value);
  const minValue = Math.min(...valueList);
  const maxValue = Math.max(...valueList);
  const calculatedMargin = (maxValue - minValue) * margin;

  return {
    min: minValue - calculatedMargin,
    max: maxValue + calculatedMargin,
  };
}
