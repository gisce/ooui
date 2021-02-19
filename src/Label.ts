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

  /**
   * Align text
   */
  _align: string = "left";
  get align(): string {
    return this._align;
  }
  set align(value: string) {
    this._align = value;
  }

  constructor(props: any) {
    super(props);
  }
}

export default Label;
