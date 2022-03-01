import Selection from "./Selection";

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

  constructor(props: any) {
    super(props);
    this._card = false;
    this._icon = "";
    this._suffix = "";
    if (this._parsedWidgetProps) {
      this._card = this._parsedWidgetProps.card || false;
      this._icon = this._parsedWidgetProps.icon || "";
      this._suffix = this._parsedWidgetProps.suffix || "";
    }
  }
}


export default Indicator;
