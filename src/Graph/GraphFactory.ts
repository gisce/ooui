import { GraphIndicator } from "./GraphIndicator";
import { GraphIndicatorField } from "./GraphIndicatorField";
import { GraphChart } from "./GraphChart";
import * as txml from 'txml';

const GraphTypes: { [key: string]: any } = {
  indicator: GraphIndicator,
  indicatorField: GraphIndicatorField,
  line: GraphChart,
  bar: GraphChart,
  pie: GraphChart,
};

export const parseGraph = (xml: string): GraphIndicator | GraphChart => {
  const view = txml.parse(xml).filter((el: any) => el.tagName === "graph")[0];
  const type = view.attributes.type;

  if (!type) {
    throw new Error(`${type} is not a valid graph`);
  }

  const graphModel = GraphTypes[type];

  if (!graphModel) {
    throw new Error(`${type} not found as a GraphModel`);
  }

  return new graphModel(type, view);
};
