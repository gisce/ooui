import { decode } from "html-entities";
import {
  Condition,
  evaluateCondition as evaluateConscheckCondition,
} from "@gisce/conscheck";

type JsonAttributes = Record<string, Condition>;

export const isTrue = (value: string | boolean | number = false) => {
  value = JSON.parse(value.toString().toLowerCase());
  return +value > 0;
};

const evaluateCondition = ({
  entry,
  values,
  fields,
}: {
  entry: any[];
  values: any;
  fields: any;
}) => {
  const [fieldName, operator, expectedValue] = entry;

  if (fields[fieldName] === undefined) {
    return false;
  }

  if (
    values[fieldName] === undefined &&
    fields[fieldName].type !== "boolean" &&
    fields[fieldName].type !== "many2one"
  ) {
    return false;
  }

  let filteredExpectedValue = expectedValue;

  let value =
    fields[fieldName].type === "boolean"
      ? !!values[fieldName]
      : values[fieldName];

  if (
    fields[fieldName].type === "many2one" &&
    expectedValue === false &&
    values[fieldName] === undefined
  ) {
    filteredExpectedValue = undefined;
  } else {
    value = value === undefined ? false : value;
    value = value === null ? false : value;
  }

  if (
    fields[fieldName].type === "many2one" &&
    Array.isArray(value) &&
    value[0] === undefined
  ) {
    value = false;
  }

  if (
    fields[fieldName].type === "boolean" &&
    (expectedValue === 0 || expectedValue === 1)
  ) {
    filteredExpectedValue = expectedValue !== 0;
  }

  switch (operator.toLowerCase()) {
    case "=":
    case "==":
      return value == filteredExpectedValue;
    case "<>":
    case "!=":
      return value != filteredExpectedValue;
    case ">":
      return value > filteredExpectedValue;
    case ">=":
      return value >= filteredExpectedValue;
    case "<":
      return value < filteredExpectedValue;
    case "<=":
      return value <= filteredExpectedValue;
    case "in":
      return filteredExpectedValue.includes(value);
    case "not in":
      return !filteredExpectedValue.includes(value);
    default:
      return false;
  }
};

const replaceEntities = (string: string): string => {
  return decode(string, { level: "xml" });
};

const parseAttributes = ({
  attrs,
  values,
  fields,
  widgetType,
}: {
  attrs: string;
  values: any;
  fields: any;
  widgetType?: string;
}) => {
  const leftP = attrs.replace(/\(/g, "[");
  const rightP = leftP.replace(/\)/g, "]");
  const clearQuotes = rightP.replace(/'/g, '"');
  const replaceTrue = clearQuotes.replace(/True/g, "true");
  const replaceFalse = replaceTrue.replace(/False/g, "false");
  const replaceTags = replaceEntities(replaceFalse);
  const parsedObject = JSON.parse(replaceTags);
  const newAttributes: any = {};

  for (const attrField of Object.keys(parsedObject)) {
    const entries = parsedObject[attrField];
    const evaluatedEntries: boolean[] = entries.map((entry: any) => {
      return evaluateCondition({ entry, values, fields });
    });
    const attrIsTrue = evaluatedEntries.every((i: boolean) => i);

    if (attrIsTrue) {
      newAttributes[attrField] = true;
    } else if (
      attrField === "readonly" &&
      !attrIsTrue &&
      widgetType === "button"
    ) {
      // Buttons with readonly false will have to override the default readonly
      newAttributes[attrField] = false;
    }
  }

  return newAttributes;
};

export const parseJsonAttributes = ({
  attrs,
  values,
}: {
  attrs: string;
  values: any;
}) => {
  try {
    const jsonAttributes = JSON.parse(
      attrs.replace(/'/g, '"'),
    ) as JsonAttributes;
    const finalAttributes: Record<string, boolean> = {};

    for (const attrField of Object.keys(jsonAttributes)) {
      finalAttributes[attrField] = evaluateConscheckCondition(
        values,
        jsonAttributes[attrField],
      );
    }

    return finalAttributes;
  } catch (error) {
    console.error(error);
    throw new Error("Error parsing json_attrs. Original string: " + attrs);
  }
};

const evaluateAttributes = ({
  tagAttributes,
  values,
  fields,
  widgetType,
}: {
  tagAttributes: any;
  values: any;
  fields: any;
  widgetType?: string;
}) => {
  let newTagAttributes = {};

  if (tagAttributes.json_attrs) {
    newTagAttributes = parseJsonAttributes({
      attrs: tagAttributes.json_attrs,
      values,
    });
  } else if (tagAttributes.attrs) {
    newTagAttributes = parseAttributes({
      attrs: tagAttributes.attrs,
      values,
      fields,
      widgetType,
    });
  }

  return {
    ...tagAttributes,
    ...newTagAttributes,
    attrs: undefined,
    json_attrs: undefined,
  };
};

export { evaluateAttributes, replaceEntities };
