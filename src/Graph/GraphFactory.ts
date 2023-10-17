import { GraphIndicator } from "./GraphIndicator";
import { GraphIndicatorField } from "./GraphIndicatorField";
import { GraphChart } from "./GraphChart";
import { ParsedNode } from "../helpers/nodeParser";
import * as txml from "txml";

const GraphTypes: Record<string, any> = {
  indicator: GraphIndicator,
  indicatorField: GraphIndicatorField,
  line: GraphChart,
  bar: GraphChart,
  pie: GraphChart,
};

export const parseGraph = (xml: string): GraphIndicator | GraphChart => {
  const view = txml
    .parse(xml)
    .filter((el: ParsedNode) => el.tagName === "graph")[0];
  const type = view.attributes.type;

  if (!type) {
    throw new Error(`${type} is not a valid graph`);
  }

  const GraphModel = GraphTypes[type];

  if (!GraphModel) {
    throw new Error(`${type} not found as a GraphModel`);
  }

  return new GraphModel(type, view);
};
