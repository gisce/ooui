import ContainerWidget from "./ContainerWidget";
import {replaceEntities} from "./helpers/attributeParser";

class Group extends ContainerWidget {

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
        if (props.icon) {
          this._icon = props.icon;
        }
      }
    }
}

export default Group;