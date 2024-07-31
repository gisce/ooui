import Button from "./Button";
import ContainerWidget from "./ContainerWidget";

class ButtonGroup extends ContainerWidget {
  _defaultName: string = "";
  get defaultName(): string {
    return this._defaultName;
  }

  get defaultButton(): Button | undefined {
    const btn = this.buttons.find((button) => button.id === this.defaultName);
    return btn || this.buttons[0];
  }

  get colspan(): number {
    return this.defaultButton?.colspan || 1;
  }

  set colspan(value: number) {
    if (this.defaultButton) {
      this.defaultButton.colspan = value;
    }
  }

  get secondaryButtons(): Button[] {
    const btns = this.buttons.filter(
      (button) => button.id !== this.defaultButton?.id,
    );
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
