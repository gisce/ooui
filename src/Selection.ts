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

  /**
   * Label
   */
  _label: string = "";
  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value;
  }

  /**
   * Values and keys
   */
  _selectionValues: Map<string, string> = new Map([]);
  get selectionValues(): Map<string, string> {
    return this._selectionValues;
  }
  set selectionValues(value: Map<string, string>) {
    this._selectionValues = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.size) {
        this._size = props.size;
      }

      if (props.string) {
        this._label = props.string;
        if (!props.colspan) {
          this.colspan = 2;
        }
      }

      if (props.selection) {
        this._selectionValues = new Map(props.selection);
      }
    }
  }
}

export default Selection;
