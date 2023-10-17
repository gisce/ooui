import { getValueForField } from "./fieldParser";

export const parseContext = ({
  context,
  values,
  fields,
}: {
  context?: any;
  values?: any;
  fields?: any;
}) => {
  // TODO: remove try/catch when we know for sure that all the incoming contexts formats are expected
  try {
    if (!context) return undefined;

    if (isObject(context)) {
      return context;
    }

    if (typeof context !== "string") {
      return context;
    }

    const parsedContextInJson = tryParseJSON(context);
    if (parsedContextInJson !== null) {
      return parsedContextInJson;
    }

    if (context.trim().length === 0) {
      return undefined;
    }

    // TODO: maybe this can be accomplished more performant and elegant with regex
    const singleQuotesReplace = context.replace(/"/g, "'");
    const strNoWhitespaces = singleQuotesReplace.replace(/\s/g, "");
    const replaceTrue = strNoWhitespaces.replace(/True/g, "true");
    const replaceFalse = replaceTrue.replace(/False/g, "false");
    const strNoClauLeft = replaceFalse.replace(/\{/g, "");
    const strNoClauRight = strNoClauLeft.replace(/\}/g, "");

    const entryValues = strNoClauRight.split(",");
    const valuesSplitted = entryValues.map((entry) => {
      return entry.split(":");
    });

    const parsedContext: any = {};

    valuesSplitted.forEach((entry) => {
      const fieldName = entry[1];

      if (
        !entry[1].includes("'") &&
        entry[1] !== "true" &&
        entry[1] !== "false"
      ) {
        const valueForField = getValueForField({
          values,
          fields,
          fieldName: fieldName === "active_id" ? "id" : fieldName,
        });
        parsedContext[entry[0].replace(/'/g, "")] = valueForField || undefined;
      } else {
        if (entry[1] === "true") {
          parsedContext[entry[0].replace(/'/g, "")] = true;
        } else if (entry[1] === "false") {
          parsedContext[entry[0].replace(/'/g, "")] = false;
        } else {
          parsedContext[entry[0].replace(/'/g, "")] = entry[1].replace(
            /'/g,
            "",
          );
        }
      }
    });

    return parsedContext;
  } catch (e) {
    return undefined;
  }
};

export const parseContextFields = (context: string): string[] => {
  const fields: string[] = [];
  try {
    if (!context) return fields;

    if (isObject(context)) {
      return fields;
    }

    if (typeof context !== "string") {
      return fields;
    }

    const parsedContextInJson = tryParseJSON(context);
    if (parsedContextInJson !== null) {
      return [];
    }

    if (context.trim().length === 0) {
      return fields;
    }

    // TODO: maybe this can be accomplished more performant and elegant with regex
    const singleQuotesReplace = context.replace(/"/g, "'");
    const strNoWhitespaces = singleQuotesReplace.replace(/\s/g, "");
    const replaceTrue = strNoWhitespaces.replace(/True/g, "true");
    const replaceFalse = replaceTrue.replace(/False/g, "false");
    const strNoClauLeft = replaceFalse.replace(/\{/g, "");
    const strNoClauRight = strNoClauLeft.replace(/\}/g, "");

    const entryValues = strNoClauRight.split(",");
    const valuesSplitted = entryValues.map((entry) => {
      return entry.split(":");
    });

    valuesSplitted.forEach((entry) => {
      if (
        !entry[1].includes("'") &&
        entry[1] !== "true" &&
        entry[1] !== "false"
      ) {
        fields.push(entry[1].replace(/'/g, ""));
      }
    });

    return fields;
  } catch (e) {}
  return fields;
};

function tryParseJSON(str: string): any | null {
  try {
    const parsedJSON = JSON.parse(str.replace(/'/g, '"'));
    return parsedJSON;
  } catch (error) {
    return null;
  }
}

function isObject(variable: any): boolean {
  return (
    typeof variable === "object" &&
    variable !== null &&
    typeof variable !== "string"
  );
}
