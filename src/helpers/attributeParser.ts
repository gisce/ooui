import { decode } from "html-entities";
import {
  Condition,
  FieldComparisonParams,
  FieldComparisonResult,
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
  let [fieldName, operator, expectedValue] = entry;
  let valueInObject = values[fieldName];

  const comparisonResult = evaluateFieldComparison({
    fieldName,
    valueInObject,
    expectedValue,
    fields,
  });

  if (comparisonResult.directOutcome !== undefined) {
    return comparisonResult.directOutcome;
  }
  if (comparisonResult.modifiedValueInObject !== null) {
    valueInObject = comparisonResult.modifiedValueInObject;
  }
  if (comparisonResult.modifiedExpectedValue !== null) {
    expectedValue = comparisonResult.modifiedExpectedValue;
  }

  switch (operator.toLowerCase()) {
    case "=":
    case "==":
      return valueInObject == expectedValue;
    case "<>":
    case "!=":
      return valueInObject != expectedValue;
    case ">":
      return valueInObject > expectedValue;
    case ">=":
      return valueInObject >= expectedValue;
    case "<":
      return valueInObject < expectedValue;
    case "<=":
      return valueInObject <= expectedValue;
    case "in":
      return expectedValue.includes(valueInObject);
    case "not in":
      return !expectedValue.includes(valueInObject);
    default:
      return false;
  }
};

const replaceEntities = (string: string): string => {
  return decode(string, { level: "xml" });
};

const evaluateFieldComparison = ({
  fieldName,
  valueInObject,
  expectedValue,
  fields = {},
}: FieldComparisonParams & { fields: any }): FieldComparisonResult => {
  const result: FieldComparisonResult = {
    modifiedValueInObject: valueInObject,
    modifiedExpectedValue: null,
    directOutcome: undefined,
  };

  if (fields[fieldName] === undefined) {
    return {
      modifiedValueInObject: null,
      modifiedExpectedValue: null,
      directOutcome: false,
    };
  }

  if (
    valueInObject === undefined &&
    fields[fieldName].type !== "boolean" &&
    fields[fieldName].type !== "many2one" &&
    fields[fieldName].type !== "selection" &&
    typeof expectedValue !== "boolean"
  ) {
    return {
      modifiedValueInObject: null,
      modifiedExpectedValue: null,
      directOutcome: false,
    };
  }

  result.modifiedValueInObject =
    fields[fieldName].type === "boolean" ? !!valueInObject : valueInObject;

  if (
    fields[fieldName].type === "many2one" &&
    expectedValue === false &&
    valueInObject === undefined
  ) {
    result.modifiedExpectedValue = undefined;
  } else {
    result.modifiedValueInObject =
      result.modifiedValueInObject === undefined
        ? false
        : result.modifiedValueInObject;
    result.modifiedValueInObject =
      result.modifiedValueInObject === null
        ? false
        : result.modifiedValueInObject;
  }

  if (
    fields[fieldName].type === "many2one" &&
    Array.isArray(result.modifiedValueInObject) &&
    result.modifiedValueInObject[0] === undefined
  ) {
    result.modifiedValueInObject = false;
  }

  if (
    fields[fieldName].type === "boolean" &&
    (expectedValue === 0 || expectedValue === 1)
  ) {
    result.modifiedExpectedValue = expectedValue !== 0;
  }

  return result;
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
  fields,
  widgetType,
}: {
  attrs: string;
  values: any;
  fields: any;
  widgetType?: string;
}) => {
  try {
    const attrsWithReplacedEntities = replaceEntities(attrs);
    const jsonAttributes = JSON.parse(
      attrsWithReplacedEntities.replace(/'/g, '"'),
    ) as JsonAttributes;
    const finalAttributes: Record<string, boolean> = {};
    for (const attrField of Object.keys(jsonAttributes)) {
      const evaluatedEntry = evaluateConscheckCondition({
        object: values,
        condition: jsonAttributes[attrField],
        evaluateFieldComparison: ({
          fieldName,
          valueInObject,
          expectedValue,
        }: FieldComparisonParams) => {
          return evaluateFieldComparison({
            fieldName,
            valueInObject,
            expectedValue,
            fields,
          });
        },
      });

      if (evaluatedEntry) {
        finalAttributes[attrField] = true;
      } else if (
        attrField === "readonly" &&
        !evaluatedEntry &&
        widgetType === "button"
      ) {
        // Buttons with readonly false will have to override the default readonly
        finalAttributes[attrField] = false;
      }
    }

    return finalAttributes;
  } catch (error) {
    console.error(error);
    if (error instanceof SyntaxError) {
      throw new Error(
        "Error parsing new json_attrs. Original string: " + attrs,
      );
    } else {
      throw error;
    }
  }
};

const evaluateAttributes = ({
  tagAttributes,
  values,
  fields,
  widgetType,
  fallbackMode = true,
}: {
  tagAttributes: any;
  values: any;
  fields: any;
  widgetType?: string;
  fallbackMode?: boolean;
}) => {
  let finalTagAttributes = {};
  let oldTagAttributes = {};
  if (tagAttributes.attrs) {
    oldTagAttributes = parseAttributes({
      attrs: tagAttributes.attrs,
      values,
      fields,
      widgetType,
    });
  }

  if (tagAttributes.json_attrs) {
    try {
      finalTagAttributes = parseJsonAttributes({
        attrs: tagAttributes.json_attrs,
        values,
        fields,
        widgetType,
      });
    } catch (error) {
      if (fallbackMode && tagAttributes.attrs) {
        finalTagAttributes = oldTagAttributes;
      } else {
        throw error;
      }
    }
  } else if (tagAttributes.attrs) {
    finalTagAttributes = oldTagAttributes;
  }

  return {
    ...tagAttributes,
    ...finalTagAttributes,
    attrs: undefined,
    json_attrs: undefined,
  };
};

export { evaluateAttributes, replaceEntities };
