export const parseContext = ({
  context,
  values,
}: {
  context?: string;
  values?: any;
}) => {
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
    if (entry[1].indexOf("'") === -1) {
      parsedContext[entry[0].replace(/'/g, "")] = values[entry[1]] || undefined;
    } else {
      parsedContext[entry[0].replace(/'/g, "")] = entry[1].replace(/'/g, "");
    }
  });

  return parsedContext;
};
