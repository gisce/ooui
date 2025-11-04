import Field from "./Field";

class Icon extends Field {
  /**
   * Icon name
   */
  _name: string = "";
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  /**
   * Icon size
   */
  _size: number = 16;
  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  /**
   * Icon color
   */
  _color: string = "";
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  constructor(props?: any) {
    super({ ...props, nolabel: true });

    if (props) {
      if (props.name) {
        this._name = props.name;
      }

      if (props.size) {
        this._size = props.size;
      }

      if (props.color) {
        this._color = props.color;
      }
    }
  }
}

export default Icon;
