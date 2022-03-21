import { GraphAxis } from ".";
import { Graph } from "./Graph";
import { parseXYAxis } from "./graphHelper";

export class GraphLine extends Graph {
  _x: GraphAxis | undefined;
  get x(): GraphAxis | undefined {
    return this._x;
  }

  _y: GraphAxis | undefined;
  get y(): GraphAxis | undefined {
    return this._y;
  }
  constructor(element: HTMLElement) {
    super(element);

    this._type = "line";

    const xyAxis = parseXYAxis(element.childNodes);
    this._x = xyAxis.x;
    this._y = xyAxis.y;
  }
}
