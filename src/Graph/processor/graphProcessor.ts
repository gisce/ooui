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
  const valuesGroupedByX = getValuesGroupedByField({
    fieldName: ooui.x.name,
    values,
    fields,
  });

  let fieldsData = {
    xField: ooui.x.name,
    yFields: [...new Set(ooui.y.map((item) => getYAxisFieldname(item)))],
    seriesFields:
      ooui.y.filter((yField) => yField.label).length !== 0
        ? [...new Set(ooui.y.map((item) => item.label))]
        : undefined,
    isGroup: false,
    isStack: false,
  };

  const data: { [key: string]: any }[] = [];

  ooui.y.forEach((yField) => {
    Object.keys(valuesGroupedByX).forEach((xValue) => {
      const xLabel = valuesGroupedByX[xValue].label;
      const objectsForXValue = valuesGroupedByX[xValue].entries;

      if (yField.label) {
        const valuesGroupedByYLabel = getValuesGroupedByField({
          fieldName: yField.label,
          values: objectsForXValue,
          fields,
        });

        Object.keys(valuesGroupedByYLabel).forEach((yUniqueValue) => {
          const entries = valuesGroupedByYLabel[yUniqueValue].entries;
          const label = valuesGroupedByYLabel[yUniqueValue].label;
          const valuesForYField = entries
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
            [ooui.x.name]: xLabel || false,
            [`${yField.name}_${
              labelsForOperator[yField.operator!]
            }`]: finalValue,
            [yField.label!]: label,
          });
        });
      } else {
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
          [ooui.x.name]: xLabel || false,
          [getYAxisFieldname(yField)]: finalValue,
        });
      }
    });
  });

  // If we don't have y axis fields with label specified, we need to,
  // merge the results with the same name key
  if (ooui.y.filter((yField) => yField.label).length === 0) {
    const uniqueXkeys = [...new Set(data.map((item) => item[ooui.x.name]))];
    const processedData = uniqueXkeys.map((key) => {
      const mergedRecord = {};
      const valuesForKey = data.filter((item) => item[ooui.x.name] === key);
      valuesForKey.forEach((item) => {
        Object.assign(mergedRecord, item);
      });
      return mergedRecord as { [key: string]: any };
    });
    return { data: processedData, ...fieldsData };
  }

  const yFieldsWithLabel = ooui.y.filter((yField) => yField.label).length;
  const yFieldsWithStacked = ooui.y.filter((yField) => yField.stacked).length;

  if (yFieldsWithLabel > 0 && yFieldsWithStacked === 0) {
    fieldsData.isGroup = true;
    fieldsData.isStack = false;
  } else if (yFieldsWithLabel === 1 && yFieldsWithStacked === 1) {
    fieldsData.isGroup = false;
    fieldsData.isStack = true;
  } else if (yFieldsWithLabel > 1 && yFieldsWithStacked > 1) {
    fieldsData.isGroup = true;
    fieldsData.isStack = true;
  }

  return {
    data,
    ...fieldsData,
  };
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

export function getYAxisFieldname(y: GraphYAxis) {
  if (y.operator) {
    return y.name + "_" + labelsForOperator[y.operator];
  }
  return y.name!;
}
