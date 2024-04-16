import { ParsedNode } from "../helpers/nodeParser";

export type GraphType = "indicator" | "indicatorField" | "line" | "bar" | "pie";

export class Graph {
  _string: string | null = null;
  get string(): string | null {
    return this._string;
  }

  _type?: GraphType;
  get type(): GraphType | undefined {
    return this._type;
  }

  _timerange: string | null = null;
  get timerange(): string | null {
    return this._timerange;
  }

  _interval: number = 1;
  get interval(): number {
    return this._interval;
  }

  constructor(element: ParsedNode) {
    this._string = element.attributes.string || null;
    this._timerange = element.attributes.timerange || null;
    if (element.attributes.interval) {
      this._interval = parseInt(element.attributes.interval);
    }
  }
}
