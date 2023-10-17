import { GraphChart } from "../GraphChart";

export const getFieldsToRetrieve = ({ ooui }: { ooui: GraphChart }) => {
  const xField: string = ooui.x.name;
  const fields = [xField];

  if (!ooui.y) {
    return [];
  }

  ooui.y.forEach((y) => {
    if (y.operator !== "count" && !fields.includes(y.name)) {
      fields.push(y.name);
    }

    if (y.label && !fields.includes(y.label)) {
      fields.push(y.label);
    }
  });

  return fields;
};

export function getValueAndLabelForField({
  fields,
  values,
  fieldName,
}: {
  fields: Record<string, any>;
  values: Record<string, any>;
  fieldName: string;
}) {
  const xFieldData = fields[fieldName];
  const value = values[fieldName];

  if (!xFieldData) {
    throw new Error(`Field ${fieldName} not found`);
  }

  if (xFieldData.type === "many2one") {
    if (!value) {
      return { value: false, label: undefined };
    }
    return { value: value[0], label: value[1] };
  } else if (xFieldData.type === "selection") {
    const selectionValues: Array<[number, string]> = xFieldData.selection;

    const valuePair = selectionValues.find((selectionPair) => {
      return selectionPair[0] === value;
    });

    if (!valuePair) {
      return { value: false, label: undefined };
    }

    return { value, label: valuePair[1] };
  }

  return { value, label: value };
}
