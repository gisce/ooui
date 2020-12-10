import Field from "./Field";

class Label extends Field {
  /**
   * Label text
   */
  _text;
  get text() {
    return this._text;
  }
  set text(value) {
    this._text = value;
  }

  constructor() {
    super();
  }
}

export default Label;