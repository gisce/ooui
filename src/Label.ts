import Field from "./Field";

type LabelType = "secondary" | "success" | "warning" | "danger" | "default";
type LabelSize = 1 | 2 | 3 | 4 | 5 | undefined;

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
   * Label type
   */
  _labelType: LabelType = "default";
  get labelType(): LabelType {
    return this._labelType;
  }

  set labelType(value: LabelType) {
    this._labelType = value;
  }

  /**
   * Label size
   */
  _labelSize: LabelSize = undefined;
  get labelSize(): LabelSize {
    return this._labelSize;
  }

  set labelSize(value: LabelSize) {
    this._labelSize = value;
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
    if (props.widget_props) {
      if (this.parsedWidgetProps.label_type) {
        this.labelType = this.parsedWidgetProps.label_type;
      }
      if (this.parsedWidgetProps.label_size) {
        this.labelSize = this.parsedWidgetProps.label_size;
      }
    }
  }
}

export default Label;
