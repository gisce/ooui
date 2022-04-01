import { Graph, GraphType } from "./Graph";

export class GraphIndicator extends Graph {
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

  _showPercent: boolean = false;
  get showPercent(): boolean {
    return this._showPercent;
  }

  _suffix: string | null = null;
  get suffix(): string | null {
    return this._suffix;
  }

  constructor(type: GraphType, element: HTMLElement) {
    super(element);

    this._type = type;
    this._color = element.getAttribute("color");
    this._icon = element.getAttribute("icon");
    this._suffix = element.getAttribute("suffix");
    this._totalDomain = element.getAttribute("totalDomain");
    const showPercent = element.getAttribute("showPercent");

    if (
      showPercent &&
      (showPercent === "1" ||
        (typeof showPercent === "boolean" && showPercent === true))
    ) {
      this._showPercent = true;
    }
  }
}
