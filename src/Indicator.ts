import Field from "./Field";

class Indicator extends Field {
  _nolabel: boolean = true;

  _card: boolean;
  get card(): boolean {
    return this._card;
  }
  set card(value: boolean) {
    this._card = value;
  }

  constructor(props: any) {
    super(props);
    this._card = false;
    if (this._parsedWidgetProps) {
      this._card = this._parsedWidgetProps.card;
    }
  }
}


export default Indicator;
