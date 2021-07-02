const parseOnChange = (onChangeString: string) => {
  const splitted = onChangeString
    .replace(/\s/g, "")
    .replace(/'/g, "")
    .replace(")", "")
    .split("(");

  const method = splitted[0];
  const argsGross = splitted[1];
  const argsSplitted = argsGross.split(",");

  return {
    method,
    args: argsSplitted
  };
};

export { parseOnChange };
