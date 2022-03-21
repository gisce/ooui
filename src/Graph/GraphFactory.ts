import { GraphIndicator } from "./GraphIndicator";
import { GraphLine } from "./GraphLine";

const GraphTypes: { [key: string]: any } = {
  indicator: GraphIndicator,
  line: GraphLine,
};

export const parseGraph = (xml: string): GraphIndicator | GraphLine => {
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

  return new graphModel(view.documentElement);
};
