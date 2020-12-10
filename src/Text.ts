import Field from "./Field";

/**
 * Multiline input with no length limit.
 */
class Text extends Field {

  /**
   * Field place holder
   */
  _placeholder: string = '';
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.placeholder) {
        this._placeholder = props.placeholder;
      }
    }
  }
}

export default Text;