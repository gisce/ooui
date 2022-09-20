import { Graph, GraphType } from "./Graph";
import { parseBoolAttribute, ParsedNode } from "../helpers/nodeParser";
import { replaceEntities } from "../helpers/attributeParser";

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
    if (this._color) {
      this._color = replaceEntities(this._color);
    }
    this._icon = element.attributes.icon || null;
    if (this._icon) {
      this._icon = replaceEntities(this._icon);
    }
    this._suffix = element.attributes.suffix || null;
    this._totalDomain = element.attributes.totalDomain || null;
    this._showPercent = parseBoolAttribute(element.attributes.showPercent);
  }
}
