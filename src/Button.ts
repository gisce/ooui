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
   * Button icon
   */
  _icon: string | undefined;
  get icon(): string | undefined {
    return this._icon;
  }
  set icon(value: string | undefined) {
    this._icon = value;
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

  _primary: boolean = false;
  get primary(): boolean {
    return this._primary;
  }
  set primary(value: boolean) {
    this._primary = value;
  }

  _danger: boolean = false;
  get danger(): boolean {
    return this._danger;
  }
  set danger(value: boolean) {
    this._danger = value;
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

      if (props.buttonType) {
        this._buttonType = props.buttonType;
      }

      if (props.confirm) {
        this._confirmMessage = props.confirm;
      }

      if (props.special && props.special === "cancel") {
        this._buttonType = "cancel";
      }

      if (props.icon) {
        this._icon = props.icon;
      }
      if (props.primary) {
        const primary = props.primary;
        if (primary === "1" || primary === 1 || primary === true) {
          this._primary = true
        }
      }
      if (props.danger) {
        const danger = props.danger;
        if (danger === "1" || danger === 1 || danger === true) {
          this._danger = true
        }
      }
    }
  }
}

export default Button;
