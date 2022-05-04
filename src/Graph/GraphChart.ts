import { GraphAxis } from ".";
import { Graph, GraphType } from "./Graph";
import { parseXYAxis } from "./graphHelper";

export class GraphChart extends Graph {
  _x: GraphAxis;
  get x(): GraphAxis {
    return this._x;
  }

  _y: GraphAxis[];
  get y(): GraphAxis[] {
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
