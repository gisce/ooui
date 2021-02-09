import Field from "./Field";

/**
 * One-line input with a length limit.
 */
class Char extends Field {
  /**
   * Field place holder
   */
  _placeholder: string = "";
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
  }

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

  _isPassword: boolean = false;
  get isPassword(): boolean {
    return this._isPassword;
  }
  set isPassword(value: boolean) {
    this._isPassword = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.size) {
        this._size = props.size;
      }

      if (props.string) {
        if (!props.colspan) {
          this.colspan = 2;
        }
      }

      if (props.password) {
        this.isPassword = props.password === "True" ? true : false;
      }
    }
  }
}

export default Char;
