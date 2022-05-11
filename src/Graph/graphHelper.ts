import { GraphXAxis, GraphYAxis, Operator } from ".";

export type XYAxis = {
  x: GraphXAxis;
  y: GraphYAxis[];
};

export const parseXYAxis = (nodes: NodeListOf<ChildNode>): XYAxis => {
  const yAxisElements: GraphYAxis[] = [];
  let xAxis;

  Array.prototype.forEach.call(nodes, (child: Element) => {
    if (child.nodeType === child.ELEMENT_NODE && child.nodeName === "field") {
      const axis = child.getAttribute("axis");
      const operator = child.getAttribute("operator");
      const name = child.getAttribute("name");
      const label = child.getAttribute("label") || undefined;

      if (!axis) {
        throw new Error(`Field ${name} doesn't have an axis`);
      }

      if (!name) {
        throw new Error("Missing name attribute for field");
      }

      if (axis === "x") {
        xAxis = new GraphXAxis({
          name,
        });
      } else if (axis === "y") {
        yAxisElements.push(
          new GraphYAxis({
            name,
            operator: operator as Operator,
            label,
          })
        );
      }
    }
  });

  if (!xAxis) {
    throw new Error("No x axis found");
  }

  if (!yAxisElements.length) {
    throw new Error("No y axis found. At least we need one y axis");
  }

  return {
    x: xAxis,
    y: yAxisElements,
  };
};
