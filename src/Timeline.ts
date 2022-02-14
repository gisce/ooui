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

  constructor(props: any) {
    super(props);
    this._titleField = "";
    this._summaryField = "";

    if (props?.widget_props) {

      try {
        const parsedWidgetProps = JSON.parse(props.widget_props.replace(/'/g, '"'));
        this._titleField = parsedWidgetProps.titleField;
        this._summaryField = parsedWidgetProps.summaryField;
      } catch(err) {
        throw new Error(`Timeline - error parsing widget_props: ${JSON.stringify(err)}`);
      }
    }
  }
}

export default Timeline;
