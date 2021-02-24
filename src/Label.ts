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

  /**
   * Id of the field that this label goes with. Null if it's an independent label
   */
  _fieldForLabel: string | null = null;
  get fieldForLabel(): string | null {
    return this._fieldForLabel;
  }
  set fieldForLabel(value: string | null) {
    this._fieldForLabel = value;
  }

  constructor(props?: any) {
    super({ ...props, nolabel: true });

    if (props?.fieldForLabel) {
      this._fieldForLabel = props.fieldForLabel;
    }
  }
}

export default Label;
