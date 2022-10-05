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

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.string) {
        this._label = replaceEntities(props.string);
      }
    }
  }

  findById(id: string): null {
    return null;
  }
}

export default Separator;
