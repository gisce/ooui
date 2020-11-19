import Field from "./Field";

/**
 * Multiline input with no length limit.
 */
class Text extends Field {
  /**
   * Field place holder
   */
  _placeholder;
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(value) {
    this._placeholder = value;
  }

  constructor(props) {
    super(props);
  }
}

export default Text;