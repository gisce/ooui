import Field from "./Field";

class Button extends Field {
  /**
   * Type (primary or default)
   */
  _buttonType: "primary" | "default" = "default";
  get buttonType() {
    return this._buttonType;
  }
  set buttonType(value) {
    this._buttonType = value;
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
    super({
      ...props,
      nolabel: props?.nolabel !== undefined ? props.nolabel : true,
    });

    if (props) {
      if (props.string) {
        this._caption = props.string;
      }
    }
  }
}

export default Button;
