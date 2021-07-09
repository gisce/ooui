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
  domainValue: string;
  values: any;
  fields: any;
}) => {
  // [('municipi_id','=',id_municipi)]

  let outputDomain = "[";

  const firstParse = domainValue
    .replace(/\s/g, "")
    .replace(/\"/g, "'")
    .replace(/\[/g, "")
    .replace(/\]/g, "");

  const entries = firstParse.split(",");

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
        value === "True" ||
        value === "False" ||
        stringHasNumber(value) ||
        element.indexOf("'") !== -1
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

  return outputDomain + "]";
};

function combineDomains(domains: string[]) {
  const joined = domains.join(",").replace(/\[/g, "").replace(/\]/g, "");
  return `[${joined}]`;
}

function convertDomainFromFields(domainValue?: boolean | any) {
  if (!domainValue) {
    return undefined;
  }

  if (domainValue.length === 0) {
    return undefined;
  }

  let outputDomain = "[";

  domainValue.forEach((entry: any[], idx: number) => {
    outputDomain += "(";

    entry.forEach((element, idy) => {
      if (typeof element !== "boolean" && !isNaN(element)) {
        outputDomain += `${element}`;
      } else if (typeof element === "boolean") {
        outputDomain += `${element ? "True" : "False"}`;
      } else {
        outputDomain += `'${element}'`;
      }

      if (idy < entry.length - 1) {
        outputDomain += ",";
      }
    });

    outputDomain += ")";

    if (idx < domainValue.length - 1) {
      outputDomain += ",";
    }
  });

  return outputDomain + "]";
}

export { parseDomain, combineDomains, convertDomainFromFields };
