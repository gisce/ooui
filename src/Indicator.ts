import Selection from "./Selection";
import { replaceEntities } from "./helpers/attributeParser";

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

  _color: string | undefined = undefined;
  get color(): string | undefined {
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

  _height: number | undefined;
  get height(): number | undefined {
    return this._height;
  }

  set height(value: number | undefined) {
    this._height = value;
  }

  constructor(props: any) {
    super(props);
    this._card = false;
    this._icon = "";
    this._suffix = "";
    if (this._parsedWidgetProps) {
      this._card = this._parsedWidgetProps.card || false;
      this._icon = replaceEntities(this._parsedWidgetProps.icon) || "";
      this._suffix = this._parsedWidgetProps.suffix || "";
      this._color = replaceEntities(this._parsedWidgetProps.color) || "";
    }
    if (props) {
      if (props.action_id) {
        this._actionId = parseInt(props.action_id);
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
