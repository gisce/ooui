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

    if (value.indexOf("'") === -1 && !(value === "True" || value === "False")) {
      // If the value references to an actual field, add curly braces around it
      value = `\{${value}\}`;
    } else {
      value = value.replace(/'/g, "");
    }

    parsedDomain.push([field, operator, value]);
  });

  return parsedDomain;
};

export default parseDomain;
