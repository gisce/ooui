import { getValueForField } from "./fieldParser";

const stringHasNumber = (str: any) => {
  if (typeof str !== "string") return false; // we only process strings!
  return !isNaN(str as any) && !isNaN(parseFloat(str));
};

const parseDomain = ({
  domainValue,
  values,
  fields,
}: {
  domainValue: any;
  values: any;
  fields: any;
}) => {
  let domain: string | undefined;

  if (typeof domainValue === "string") {
    domain = domainValue;
  } else {
    return domainValue;
  }

  let outputDomain = "";

  const firstParse = domain
    .slice(1, -1)
    .replace(/, /g, ",")
    .replace(/\) /g, ")")
    .replace(/\"/g, "'")
    .replace(/True/g, "true")
    .replace(/False/g, "false");
  const splittedEntries = firstParse.split(",").filter((entry) => entry !== "");

  let entries = [];
  let arrayStart = false;
  let arrayEntries = [];

  for (let i = 0; i <= splittedEntries.length - 1; i += 1) {
    const entry = splittedEntries[i];
    if (entry.indexOf("[]") !== -1) {
      entries.push(entry);
    } else if (entry.startsWith("[")) {
      arrayStart = true;
      arrayEntries = [];
      arrayEntries.push(entry);
    } else if (entry.indexOf("]") !== -1) {
      arrayStart = false;
      arrayEntries.push(entry);
      entries.push(arrayEntries.join(","));
    } else if (arrayStart) {
      arrayEntries.push(entry);
    } else {
      entries.push(entry);
    }
  }

  entries.forEach((element, idx) => {
    if (element.indexOf("(") !== -1) {
      outputDomain += element + ",";
      return;
    }

    if (element.indexOf("(") === -1 && element.indexOf(")") === -1) {
      outputDomain += element + ",";
      return;
    }

    if (element.indexOf(")") !== -1) {
      const value = element.replace(/\)/g, "").replace(/\'/g, "");
      if (
        value === "true" ||
        value === "false" ||
        stringHasNumber(value) ||
        element.indexOf("'") !== -1 ||
        element.indexOf("[") !== -1
      ) {
        outputDomain += element;
      } else {
        const foundValue = getValueForField({
          values,
          fieldName: value,
          fields,
        });

        if (!isNaN(foundValue)) {
          outputDomain += `${foundValue})`;
        } else {
          outputDomain += `'${foundValue}')`;
        }
      }

      if (idx < entries.length - 1) {
        outputDomain += ",";
      }

      return;
    }
  });

  const output = `[${outputDomain
    .replace(/\(/g, "[")
    .replace(/\)/g, "]")
    .replace(/\'/g, '"')}]`;

  const outputParsed = JSON.parse(output);

  return outputParsed;
};

const transformDomainForChildWidget = ({
  domain,
  widgetFieldName,
}: {
  domain: any;
  widgetFieldName: string;
}) => {
  const transformedDomain: any[] = [];

  domain.forEach((domainEntry: any) => {
    if (!Array.isArray(domainEntry)) {
      return;
    }
    
    const [fieldName, operator, value] = domainEntry;

    let rootFieldName;
    let targetFieldName;

    if (fieldName.indexOf(".") !== -1) {
      rootFieldName = fieldName.substr(0, fieldName.indexOf("."));
      targetFieldName = fieldName.substr(
        fieldName.indexOf(".") + 1,
        fieldName.length - 1
      );
    } else {
      rootFieldName = fieldName;
      targetFieldName = "id";
    }

    if (rootFieldName === widgetFieldName) {
      transformedDomain.push([targetFieldName, operator, value]);
    }
  });

  return transformedDomain;
};

export { parseDomain, transformDomainForChildWidget };
