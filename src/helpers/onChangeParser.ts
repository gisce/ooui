const parseOnChange = (onChangeString: string) => {
  const splitted = onChangeString.trim().replace(")", "").split("(");

  const method = splitted[0];
  const argsGross = splitted[1];
  const argsSplitted = argsGross.split(",").map((arg) => arg.trim());

  return {
    method,
    args: argsSplitted,
  };
};

export { parseOnChange };
