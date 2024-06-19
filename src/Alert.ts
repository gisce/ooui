import Field from "./Field";

type AlertType = "success" | "warning" | "info" | "error" | undefined;

class Alert extends Field {
  /**
   * Alert type
   */
  _alertType: AlertType = "info";
  get alertType(): AlertType {
    return this._alertType;
  }

  set alertType(value: AlertType) {
    this._alertType = value;
  }

  _title: string = "";
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  _text: string = "";
  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  _icon: string | null = null;
  get icon(): string | null {
    return this._icon;
  }

  set icon(value: string | null) {
    this._icon = value;
  }

  constructor(props: any) {
    super(props);
    if (props) {
      this._nolabel = true;
      if (props.alert_type) {
        this._alertType = props.alert_type;
      }
      if (props.title) {
        this._title = props.title;
      }
      if (props.text) {
        this._text = props.text;
      }
      if (props.icon) {
        this._icon = props.icon;
      }
    }
  }
}

export default Alert;
