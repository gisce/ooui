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
  _size: number | undefined;
  get size(): number | undefined {
    return this._size;
  }
  set size(value: number | undefined) {
    this._size = value;
  }

  _isPassword: boolean = false;
  get isPassword(): boolean {
    return this._isPassword;
  }
  set isPassword(value: boolean) {
    this._isPassword = value;
  }

  _translatable: boolean = false;
  get translatable(): boolean {
    return this._translatable;
  }
  set translatable(value: boolean) {
    this._translatable = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.size) {
        this._size = props.size;
      }

      if (props.password) {
        this.isPassword = props.password === "True" ? true : false;
      }

      if (props.translate) {
        this.translatable =
          props.translate === "True" || props.translate === true ? true : false;
      }
    }
  }
}

export default Char;
