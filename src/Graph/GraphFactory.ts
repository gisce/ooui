import { GraphIndicator } from "./GraphIndicator";
import { GraphChart } from "./GraphChart";

const GraphTypes: { [key: string]: any } = {
  indicator: GraphIndicator,
  line: GraphChart,
  bar: GraphChart,
  pie: GraphChart,
};

export const parseGraph = (xml: string): GraphIndicator | GraphChart => {
  const parser = new DOMParser();
  const view: Document = parser.parseFromString(xml, "text/xml");

  const type = view.documentElement.getAttribute("type");

  if (!type) {
    throw new Error(`${type} is not a valid graph`);
  }

  const graphModel = GraphTypes[type];

  if (!graphModel) {
    throw new Error(`${type} not found as a GraphModel`);
  }

  return new graphModel(type, view.documentElement);
};
