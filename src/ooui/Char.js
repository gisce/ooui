import Form from "./Form";
import { Field } from "./Form";

class Char extends Field {
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
}

export default Char;