import ContainerWidget from "./ContainerWidget";
import Page from "./Page";

export type TabPosition = "top" | "bottom" | "left" | "right";

class Notebook extends ContainerWidget {
  static _defaultColspan: number = 3;
  static get defaultColspan(): number {
    return Notebook._defaultColspan;
  }
  static set defaultColspan(value: number) {
    Notebook._defaultColspan = value;
  }

  _tabPosition: TabPosition = "top";
  get tabPosition(): TabPosition {
    return this._tabPosition;
  }
  set tabPosition(value: TabPosition) {
    this._tabPosition = value;
  }

  _pages: Page[] = [];
  get pages(): Page[] {
    return this._container.rows.flat() as Page[];
  }

  constructor(props: any) {
    super(props);
    this.colspan = Notebook._defaultColspan;

    if (props) {
      if (props.colspan) {
        this.colspan = props.colspan;
      }
      if (props.tabpos) {
        this._tabPosition = props.tabpos;
      }
    }
  }
}

export default Notebook;
