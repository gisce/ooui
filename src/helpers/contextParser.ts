function getValueForField({
  values,
  fieldName,
  fields,
}: {
  values: any;
  fieldName: string;
  fields: any;
}) {
  if (!fields) {
    return undefined;
  }

  if (!fields[fieldName]) {
    return values[fieldName] || undefined;
  }

  const fieldType = fields[fieldName].type;

  if (fieldType === "many2one") {
    return values[fieldName][0] || null;
  } else if (fieldType === "one2many" || fieldType === "many2many") {
    return values[fieldName].map((item: any) => item.id);
  } else {
    return values[fieldName];
  }
}

export const parseContext = ({
  context,
  values,
  fields,
}: {
  context?: string;
  values?: any;
  fields?: any;
}) => {
  // TODO: remove try/catch when we know for sure that all the incoming contexts formats are expected
  try {
    if (!context) return undefined;

    if (context.trim().length === 0) {
      return undefined;
    }

    // TODO: maybe this can be accomplished more performant and elegant with regex
    const strNoWhitespaces = context.replace(/\s/g, "");
    const strNoClauLeft = strNoWhitespaces.replace(/\{/g, "");
    const strNoClauRight = strNoClauLeft.replace(/\}/g, "");

    const entryValues = strNoClauRight.split(",");
    const valuesSplitted = entryValues.map((entry) => {
      return entry.split(":");
    });

    const parsedContext: any = {};

    valuesSplitted.forEach((entry) => {
      const fieldName = entry[1];

      if (entry[1].indexOf("'") === -1) {
        const valueForField = getValueForField({
          values,
          fields,
          fieldName,
        });
        parsedContext[entry[0].replace(/'/g, "")] = valueForField || undefined;
      } else {
        parsedContext[entry[0].replace(/'/g, "")] = entry[1].replace(/'/g, "");
      }
    });

    return parsedContext;
  } catch (e) {
    return undefined;
  }
};
