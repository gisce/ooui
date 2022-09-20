import DashboardItem from "./DashboardItem";
import * as txml from 'txml';
import { ParsedNode } from "./helpers/nodeParser";

class Dashboard {
  _string: string | null = null;
  get string(): string | null {
    return this._string;
  }

  _items: DashboardItem[] = [];
  get items(): DashboardItem[] {
    return this._items;
  }

  constructor(xml: string) {
    const view = txml.parse(xml).filter((el: ParsedNode) => el.tagName === "dashboard")[0];
    this._string = view.attributes.string || null;

    const { children } = view;

    children.forEach((item: ParsedNode) => {
      if (item.tagName === "dashboard_item") {
        this._items.push(new DashboardItem(item.attributes));
      }
    });
  }
}

export default Dashboard;
