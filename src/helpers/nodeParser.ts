type ParsedNode = {
  tag: string;
  tagAttributes: any;
  child: Element;
};

const parseNodes = (
  nodes: NodeListOf<ChildNode>,
  fields: any
): ParsedNode[] => {
  const parsedNodes: ParsedNode[] = [];
  Array.prototype.forEach.call(nodes, (child: Element) => {
    if (child.nodeType === child.ELEMENT_NODE) {
      let tag = child.nodeName;

      let tagAttributes: any = {};
      Array.prototype.forEach.call(child.attributes, (attr: Attr) => {
        tagAttributes[attr.name] = attr.value;
      });

      if (tag === "field") {
        const name = child.getAttribute("name");
        const attrWidget = child.getAttribute("widget");
        if (attrWidget) {
          tag = attrWidget;
        } else if (name) {
          if (!fields[name]) {
            throw new Error(`Field ${name} doesn't exist in fields defintion`);
          }
          tag = fields[name].type;
        }

        // We do this in order to ignore the blank domain attribute in fields and to prioritize the attributes value 
        if (
          ((Array.isArray(fields[name!].domain) &&
            fields[name!].domain.length === 0) ||
            fields[name!].domain === false) &&
          tagAttributes["domain"] &&
          tagAttributes["domain"].length > 0
        ) {
          delete fields[name!].domain;
        }

        tagAttributes = { ...tagAttributes, ...fields[name!] };
      }

      parsedNodes.push({ tag, tagAttributes, child });
    }
  });
  return parsedNodes;
};

export { parseNodes };
