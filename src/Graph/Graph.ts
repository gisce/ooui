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

  constructor(element: HTMLElement) {
    this._string = element.getAttribute("string");
  }
}
