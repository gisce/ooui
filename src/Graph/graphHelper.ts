import { Axis, GraphAxis, Operator } from ".";
import { Label } from "..";

export type XYAxis = {
  x: GraphAxis;
  y: GraphAxis;
};

export const parseXYAxis = (nodes: NodeListOf<ChildNode>): XYAxis => {
  const xyAxis: any = {};

  Array.prototype.forEach.call(nodes, (child: Element) => {
    if (child.nodeType === child.ELEMENT_NODE) {
      if (child.nodeName === "field") {
      }
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
        xyAxis.x = graphAxis;
      } else if (axis === "y") {
        xyAxis.y = graphAxis;
      }
    }
  });

  return xyAxis as XYAxis;
};
