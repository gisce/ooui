import Field from "./Field";

class Button extends Field {

  /**
   * Label
   */
  _label;
  get label() {
    return this._label;
  }
  set label(value) {
    this._label = value;
  }

  /**
   * Type (primary or default)
   */
  _type;
  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value;
  }

  /**
   * Button caption
   */
  _caption;
  get caption() {
    return this._caption;
  }
  set caption(value) {
    this._caption = value;
  }

  constructor(props) {
    super(props);

    if (props) {
      if (props.string) {
        this._caption = props.string;
      }
    }
  }

}

export default Button;
