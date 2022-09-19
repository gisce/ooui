import { Graph, GraphType } from "./Graph";
import { parseBoolAttribute, ParsedNode } from "../helpers/nodeParser";

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

  constructor(type: GraphType, element: ParsedNode) {
    super(element);

    this._type = type;
    this._color = element.attributes.color || null;
    this._icon = element.attributes.icon || null;
    this._suffix = element.attributes.suffix || null;
    this._totalDomain = element.attributes.totalDomain || null;
    this._showPercent = parseBoolAttribute(element.attributes.showPercent);
  }
}
