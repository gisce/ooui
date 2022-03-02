export type GraphType = "indicator";

class Graph {
  _string: string | null = null;
  get string(): string | null {
    return this._string;
  }

  _type?: GraphType;
  get type(): GraphType | undefined {
    return this._type;
  }

  constructor(xml: string) {
    const parser = new DOMParser();
    const view: Document = parser.parseFromString(xml, "text/xml");
    this._string = view.documentElement.getAttribute("string");
    const type = view.documentElement.getAttribute("type");

    if (type === "indicator") {
      this._type = "indicator";
    }
  }
}

export default Graph;
