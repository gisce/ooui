import ContainerWidget from "./ContainerWidget";

class Page extends ContainerWidget {

  _icon: string | null = null;
  get icon(): string | null {
    return this._icon;
  }
  set icon(value: string | null) {
    this._icon = value;
  }

  constructor(props: any) {
    super(props);
    if (props.icon) {
      this._icon = props.icon;
    }
  }
}

export default Page;
