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
    .replace(/\s/g, "")
    .replace(/\"/g, "'")
    .replace(/True/g, "true")
    .replace(/False/g, "false");
  const entries = firstParse.split(",").filter((entry) => entry !== "");

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

export { parseDomain };
