import { GraphXAxis, GraphYAxis, Operator } from ".";
import { ParsedNode } from "../helpers/nodeParser";

export type XYAxis = {
  x: GraphXAxis;
  y: GraphYAxis[];
};

export const parseXYAxis = (nodes: ParsedNode[]): XYAxis => {
  const yAxisElements: GraphYAxis[] = [];
  let xAxis;

  nodes.forEach((child) => {
    if (child.tagName === "field") {
      const axis = child.attributes.axis;
      const operator = child.attributes.operator;
      const name = child.attributes.name;
      const label = child.attributes.label || undefined;
      const stacked = child.attributes.stacked || undefined;

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
            stacked,
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
