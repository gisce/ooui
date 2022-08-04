import Button from "./Button";
import ContainerWidget  from "./ContainerWidget";

class ButtonGroup extends ContainerWidget {

  _defaultName: string = "";
  get defaultName(): string {
    return this._defaultName;
  }

  get defaultButton(): Button | undefined {
    return this.buttons.find(button => button.id === this.defaultName);
  }

  get secondaryButtons(): Button[] {
    return this.buttons.filter(button => button.id !== this.defaultName);
  }

  get buttons(): Button[] {
    return this._container.rows[0] as Button[];
  }

  constructor(props: any) {
    super(props);
    if (props.default) {
      this._defaultName = props.default;
    }
  }
}

export default ButtonGroup;