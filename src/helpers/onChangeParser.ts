const parseOnChange = (onChangeString: string, values: any) => {
  const splitted = onChangeString
    .replace(/\s/g, "")
    .replace(/'/g, "")
    .replace(")", "")
    .split("(");

  const method = splitted[0];
  const argsGross = splitted[1];
  const argsSplitted = argsGross.split(",");

  const args: any = {};

  argsSplitted.forEach((arg) => {
    if (arg === "context") {
      args.context = {};
    } else if (values[arg]) {
      args[arg] = values[arg];
    }
  });

  return {
    method,
    args,
  };
};

export { parseOnChange };
