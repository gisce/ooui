import Field from "./Field";

class Button extends Field {
  /**
   * Type
   */
  _buttonType: "workflow" | "action" | "object" | "cancel" = "workflow";
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

  /**
   * Confirm string for modal in button types workflow
   */
  _confirmMessage: string = "";
  get confirmMessage(): string {
    return this._confirmMessage;
  }
  set confirm(value: string) {
    this._confirmMessage = value;
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

      if (props.type) {
        this._buttonType = props.type;
      }

      if (props.confirm) {
        this._confirmMessage = props.confirm;
      }

      if (props.special && props.special === "cancel") {
        this._buttonType = "cancel";
      }
    }
  }
}

export default Button;
