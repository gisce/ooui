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
    domain = convertArrayDomainToString(domainValue);

    if (!domain) {
      return;
    }
  }

  let outputDomain = "[";

  const firstParse = domain.slice(1, -1).replace(/\s/g, "").replace(/\"/g, "'");
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
        value === "True" ||
        value === "False" ||
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

  return outputDomain + "]";
};

function combineDomains(domains: any) {
  const filteredDomains = domains
    .filter((entry: any) => entry !== undefined)
    .filter(function (item: string, pos: number, self: string[]) {
      return self.indexOf(item) == pos;
    })
    .map((entry: any) => entry.slice(1, -1));

  const joined = filteredDomains.join(",");
  if (joined === "") {
    return undefined;
  }
  return `[${joined}]`;
}

function convertArrayDomainToString(domainValue?: boolean | any) {
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

export { parseDomain, combineDomains, convertArrayDomainToString };
