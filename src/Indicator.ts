import Selection from "./Selection";
import { replaceEntities } from "./helpers/attributeParser";
import { parseBoolAttribute } from "./helpers/nodeParser";

class Indicator extends Selection {
  _nolabel: boolean = true;

  _card: boolean;
  get card(): boolean {
    return this._card;
  }

  set card(value: boolean) {
    this._card = value;
  }

  _icon: string;
  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  _suffix: string;
  get suffix(): string {
    return this._suffix;
  }

  set suffix(value: string) {
    this._suffix = value;
  }

  _color: string = "";
  get color(): string {
    return this._color;
  }

  /**
   * Action id
   */
  _actionId: number | undefined = undefined;
  get actionId(): number | undefined {
    return this._actionId;
  }

  set actionId(value: number | undefined) {
    this._actionId = value;
  }

  /**
   * Action field
   */
  _actionField: string | undefined = undefined;
  get actionField(): string | undefined {
    return this._actionField;
  }

  set actionField(value: string | undefined) {
    this._actionField = value;
  }

  _height: number | undefined;
  get height(): number | undefined {
    return this._height;
  }

  set height(value: number | undefined) {
    this._height = value;
  }

  _autoRefresh: boolean;
  get autoRefresh(): boolean {
    return this._autoRefresh;
  }

  set autoRefresh(value: boolean) {
    this._autoRefresh = value;
  }

  constructor(props: any) {
    super(props);
    this._card = false;
    this._icon = "";
    this._suffix = "";
    this._autoRefresh = false;
    if (this._parsedWidgetProps) {
      this._card = this._parsedWidgetProps.card || false;
      this._icon = replaceEntities(this._parsedWidgetProps.icon) || "";
      this._suffix = this._parsedWidgetProps.suffix || "";
      this._color = replaceEntities(this._parsedWidgetProps.color) || "";
      this._autoRefresh = parseBoolAttribute(
        this._parsedWidgetProps.autorefresh,
      );
    }
    if (props) {
      if (props.action_id) {
        this._actionId = parseInt(props.action_id);
      }
      if (props.action_field) {
        this._actionField = props.action_field;
      }
      if (props.height) {
        try {
          this._height = parseInt(props.height);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}

export default Indicator;
