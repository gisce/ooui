import Field from "./Field";

class Label extends Field {
  /**
   * Label text
   */
  _text: string = "";
  get text(): string {
    return this._text;
  }
  set text(value: string) {
    this._text = value;
  }

  constructor(props: any) {
    super(props);
  }
}

export default Label;