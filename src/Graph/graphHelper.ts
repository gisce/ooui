import { Axis, GraphAxis, Operator } from ".";

export type XYAxis = {
  x: GraphAxis;
  y: GraphAxis[];
};

export const parseXYAxis = (nodes: NodeListOf<ChildNode>): XYAxis => {
  const yAxisElements: GraphAxis[] = [];
  let xAxis;

  Array.prototype.forEach.call(nodes, (child: Element) => {
    if (child.nodeType === child.ELEMENT_NODE && child.nodeName === "field") {
      const axis = child.getAttribute("axis");
      const operator = child.getAttribute("operator");
      const name = child.getAttribute("name");
      const label = child.getAttribute("label");

      if (!axis) {
        throw new Error(`Field ${name} doesn't have an axis`);
      }

      if (!name) {
        throw new Error("Missing name attribute for field");
      }

      const graphAxis = new GraphAxis({
        axis: axis as Axis,
        name,
        operator: operator as Operator,
        label: label || undefined,
      });

      if (axis === "x") {
        xAxis = graphAxis;
      } else if (axis === "y") {
        yAxisElements.push(graphAxis);
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
