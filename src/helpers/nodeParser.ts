type ParsedNode = {
  tagName: string;
  attributes: any;
  children: ParsedNode[];
};

const parseBoolAttribute = (attr: any): boolean => {
  if (
    attr === 1 ||
    attr === "1" ||
    attr === true ||
    attr === "True"
  ) {
    return true
  } else {
    return false
  }
}


export { ParsedNode, parseBoolAttribute };
