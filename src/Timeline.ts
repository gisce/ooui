import One2many from "./One2many";

class Timeline extends One2many {
  /**
   * Title field
   */
  _titleField: string;
  get titleField(): string {
    return this._titleField;
  }

  set titleField(value: string) {
    this._titleField = value;
  }

  /**
   * Summary field
   */
  _summaryField: string;
  get summaryField(): string {
    return this._summaryField;
  }

  set summaryField(value: string) {
    this._summaryField = value;
  }

  get iconField(): string {
    return this.parsedWidgetProps.iconField;
  }

  get colorField(): string {
    return this.parsedWidgetProps.colorField;
  }

  constructor(props: any) {
    super(props);
    this._titleField = "";
    this._summaryField = "";
    if (this._parsedWidgetProps) {
      this._titleField = this._parsedWidgetProps.titleField;
      this._summaryField = this.parsedWidgetProps.summaryField;
    }
  }
}

export default Timeline;
