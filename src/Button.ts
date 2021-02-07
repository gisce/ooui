import Field from "./Field";

class Button extends Field {
  /**
   * Type (primary or default)
   */
  _type: "primary" | "default" = "default";
  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value;
  }

  /**
   * Button caption
   */
  _caption: string = "";
  get caption(): string {
    return this._caption;
  }
  set caption(value: string) {
    this._caption = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.string) {
        this._caption = props.string;
      }
    }
  }
}

export default Button;
