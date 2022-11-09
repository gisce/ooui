import { decode } from "html-entities";

const evaluateCondition = ({
  entry,
  values,
  fields,
}: {
  entry: Array<any>;
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
    filteredExpectedValue = expectedValue === 0 ? false : true;
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
}: {
  attrs: string;
  values: any;
  fields: any;
}) => {
  const leftP = attrs.replace(/\(/g, "[");
  const rightP = leftP.replace(/\)/g, "]");
  const clearQuotes = rightP.replace(/\'/g, '"');
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
    newAttributes[attrField] = evaluatedEntries.every(
      (i: boolean) => i === true
    );
  }

  return newAttributes;
};

const evaluateAttributes = ({
  tagAttributes,
  values,
  fields,
}: {
  tagAttributes: any;
  values: any;
  fields: any;
}) => {
  const newTagAttributes = tagAttributes.attrs
    ? parseAttributes({
        attrs: tagAttributes.attrs,
        values,
        fields,
      })
    : {};

  return { ...tagAttributes, ...newTagAttributes, attrs: undefined };
};

export { evaluateAttributes, replaceEntities };
