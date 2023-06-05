import Button from "./Button";
import ContainerWidget  from "./ContainerWidget";

class ButtonGroup extends ContainerWidget {

  _defaultName: string = "";
  get defaultName(): string {
    return this._defaultName;
  }

  get defaultButton(): Button | undefined {
    const btn = this.buttons.find(button => button.id === this.defaultName);
    return btn ? btn : this.buttons[0];
  }

  get secondaryButtons(): Button[] {
    const btns = this.buttons.filter(button => button.id !== this.defaultButton?.id);
    return btns;
  }

  get buttons(): Button[] {
    return this._container.rows[0].filter((b) => !b.invisible) as Button[];
  }

  constructor(props: any) {
    super(props);
    if (props.default) {
      this._defaultName = props.default;
    }
  }
}

export default ButtonGroup;