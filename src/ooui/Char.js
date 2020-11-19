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

  constructor(props) {
    super(props);
    
    if (props) {
      if (props.size) {
        this._size = props.size;
      }

      if (props.string) {
        this._label = props.string;
        this._colspan = 2;
      }

      if (props.colspan) {
        this._colspan = props.colspan;
      }
    }
  }
}

export default Char;