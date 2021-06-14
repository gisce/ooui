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

  if (values[fieldName] === undefined || fields[fieldName] === undefined) {
    return false;
  }

  let filteredExpectedValue = expectedValue;

  if (
    fields[fieldName].type === "boolean" &&
    (expectedValue === 0 || expectedValue === 1)
  ) {
    filteredExpectedValue = expectedValue === 0 ? false : true;
  }

  switch (operator.toLowerCase()) {
    case "=":
    case "==":
      return values[fieldName] === filteredExpectedValue;
    case "<>":
    case "!=":
      return values[fieldName] !== filteredExpectedValue;
    case ">":
      return values[fieldName] > filteredExpectedValue;
    case ">=":
      return values[fieldName] >= filteredExpectedValue;
    case "<":
      return values[fieldName] < filteredExpectedValue;
    case "<=":
      return values[fieldName] <= filteredExpectedValue;
    case "in":
      return filteredExpectedValue.includes(values[fieldName]);
    case "not in":
      return !filteredExpectedValue.includes(values[fieldName]);
    default:
      return false;
  }
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
  const parsedObject = JSON.parse(replaceFalse);
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

export { evaluateAttributes };
