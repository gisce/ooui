const parseOnChange = (onChangeString: string) => {
  const splitted = onChangeString.trim().replace(")", "").split("(");

  const method = splitted[0];
  const argsGross = splitted[1];

  // Handle case where there are no parentheses (no arguments)
  const argsSplitted = argsGross
    ? argsGross
        .split(",")
        .map((arg) => arg.trim())
        .filter((arg) => arg.length > 0)
    : [];

  return {
    method,
    args: argsSplitted,
  };
};

export { parseOnChange };
