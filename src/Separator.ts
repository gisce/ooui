import Widget from "./Widget";
import { replaceEntities } from "./helpers/attributeParser";

class Separator extends Widget {
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

  _icon: string | null = null;
  get icon(): string | null {
    return this._icon;
  }

  set icon(value: string | null) {
    this._icon = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.string) {
        this._label = replaceEntities(props.string);
      }
      if (props.icon) {
        this._icon = props.icon;
      }
    }
  }

  findById(id: string): null {
    return null;
  }
}

export default Separator;
