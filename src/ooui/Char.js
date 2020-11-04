import Field from "./Field";

/**
 * One-line input with a length limit.
 */
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

  /**
   * Field size
   */
  _size;
  get size() {
    return this._size;
  }
  set size(value) {
    this._size = value;
  }

  constructor(props) {
    super("char", props);
    
    if (props) {
      if (props.size) {
        this._size = props.size;
      }
    }
  }
}

export default Char;