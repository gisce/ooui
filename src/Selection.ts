import Field from "./Field";

/**
 * Selection field for key-value lists
 */
class Selection extends Field {
  /**
   * Field size
   */
  _size: number = 150;
  get size(): number {
    return this._size;
  }
  set size(value: number) {
    this._size = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.size) {
        this._size = props.size;
      }
    }
  }
}

export default Selection;
