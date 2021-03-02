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

        tagAttributes = { ...tagAttributes, ...fields[name!] };
      }

      parsedNodes.push({ tag, tagAttributes, child });
    }
  });
  return parsedNodes;
};

export { parseNodes };
