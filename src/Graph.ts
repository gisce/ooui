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

  _color: string | null = null;
  get color(): string | null {
    return this._color;
  }

  _icon: string | null = null;
  get icon(): string | null {
    return this._icon;
  }

  _totalDomain: string | null = null;
  get totalDomain(): string | null {
    return this._totalDomain;
  }

  constructor(xml: string) {
    const parser = new DOMParser();
    const view: Document = parser.parseFromString(xml, "text/xml");
    this._string = view.documentElement.getAttribute("string");
    const type = view.documentElement.getAttribute("type");

    this._color = view.documentElement.getAttribute("color");
    this._icon = view.documentElement.getAttribute("icon");
    this._totalDomain = view.documentElement.getAttribute("totalDomain");

    if (type === "indicator") {
      this._type = "indicator";
    }
  }
}

export default Graph;
