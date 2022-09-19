import { GraphXAxis, GraphYAxis } from ".";
import { Graph, GraphType } from "./Graph";
import { parseXYAxis } from "./graphHelper";

export class GraphChart extends Graph {
  _x: GraphXAxis;
  get x(): GraphXAxis {
    return this._x;
  }

  _y: GraphYAxis[];
  get y(): GraphYAxis[] {
    return this._y;
  }
  constructor(type: GraphType, element: any) {
    super(element);

    this._type = type;
    const xyAxis = parseXYAxis(element.children);
    this._x = xyAxis.x;
    this._y = xyAxis.y;
  }
}
