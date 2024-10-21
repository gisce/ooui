import ContainerWidget from "./ContainerWidget";
import Button from "./Button";

type AlertType = "success" | "warning" | "info" | "error" | undefined;

class Alert extends ContainerWidget {
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

  get buttons(): Button[] {
    return this._container.rows.flat().filter((b) => !b.invisible) as Button[];
  }

  constructor(props: any) {
    super(props);
    if (props) {
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
