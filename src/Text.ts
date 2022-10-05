import Field from "./Field";
import { replaceEntities } from "./helpers/attributeParser";

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

  /**
   * Height
   */
  _height: number | undefined;
  get height(): number | undefined {
    return this._height;
  }
  set height(value: number | undefined) {
    this._height = value;
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
      if (props.placeholder) {
        this._placeholder = replaceEntities(props.placeholder);
      }

      if (!props.colspan) {
        this._mustExpand = true;
      }

      if (props.height) {
        try {
          this._height = parseInt(props.height);
        } catch (e) {
          this._height = undefined;
        }
      }

      if (props.translate) {
        this.translatable =
          props.translate === "True" || props.translate === true ? true : false;
      }
    }
  }
}

export default Text;
