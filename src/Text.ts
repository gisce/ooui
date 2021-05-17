import Field from "./Field";

/**
 * Multiline input with no length limit.
 */
class Text extends Field {
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
   * Must expand widget
   */
  _mustExpand: boolean = false;
  get mustExpand(): boolean {
    return this._mustExpand;
  }
  set mustExpand(value: boolean) {
    this._mustExpand = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.placeholder) {
        this._placeholder = props.placeholder;
      }

      if (!props.colspan) {
        this._mustExpand = true;
      }
    }
  }
}

export default Text;
