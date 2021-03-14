const isNumeric = (str: any) => {
  if (typeof str !== "string") return false; // we only process strings!
  return !isNaN(str as any) && !isNaN(parseFloat(str));
};

const parseDomain = (domainValue: any) => {
  if (!domainValue || typeof domainValue !== "string") {
    return [];
  }
  const parsedDomain: Array<string[]> = [];

  const regex = /\(([^\)]+)\)/g;
  const tupples = [];
  let matches;

  while ((matches = regex.exec(domainValue))) {
    tupples.push(matches[1]);
  }

  tupples.forEach((tupple: string) => {
    const splitted = tupple.replace(/\s/g, "").split(",");
    const field = splitted[0].replace(/'/g, "");
    const operator = splitted[1].replace(/'/g, "");

    let value = splitted[2];

    if (value.indexOf("'") === -1 && isNumeric(value)) {
      // Do nothing
    } else if (
      value.indexOf("'") === -1 &&
      !(value === "True" || value === "False")
    ) {
      // If the value references to an actual field, add curly braces around it
      value = `\{${value}\}`;
    } else {
      value = value.replace(/'/g, "");
    }

    parsedDomain.push([field, operator, value]);
  });

  return parsedDomain;
};

const getParamsForDomain = ({
  values,
  domain,
}: {
  values: any;
  domain: Array<any[]>;
}) => {
  const valuesToSearchIn = { ...values, active_id: values.id };

  return domain.map((entry: any[]) => {
    const [field, operator, value] = entry;
    let resolvedValue = value;
    if (typeof value === "string" && value.indexOf("{") !== -1) {
      const key = value.replace("{", "").replace("}", "");
      if (valuesToSearchIn[key]) resolvedValue = valuesToSearchIn[key];
    }
    return [field, operator, resolvedValue];
  });
};

export { parseDomain, getParamsForDomain };
