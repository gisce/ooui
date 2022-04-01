import { GraphAxis } from ".";
import { Graph, GraphType } from "./Graph";
import { parseXYAxis } from "./graphHelper";

export class GraphChart extends Graph {
  _x: GraphAxis | undefined;
  get x(): GraphAxis | undefined {
    return this._x;
  }

  _y: GraphAxis | undefined;
  get y(): GraphAxis | undefined {
    return this._y;
  }
  constructor(type: GraphType, element: HTMLElement) {
    super(element);

    this._type = type;

    const xyAxis = parseXYAxis(element.childNodes);
    this._x = xyAxis.x;
    this._y = xyAxis.y;
  }
}
