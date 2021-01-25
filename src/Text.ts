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

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.placeholder) {
        this._placeholder = props.placeholder;
      }
      if (props.string) {
        this._label = props.string;
      }  
    }
  }
}

export default Text;