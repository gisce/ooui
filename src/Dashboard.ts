import DashboardItem from "./DashboardItem";
import { parseGenericNodes } from "./helpers/nodeParser";

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
    const parser = new DOMParser();
    const view: Document = parser.parseFromString(xml, "text/xml");
    this._string = view.documentElement.getAttribute("string");
    const documentElement = view.documentElement;

    const actionsParsed = parseGenericNodes(documentElement.childNodes);

    actionsParsed.forEach((nodeParsed) => {
      if (nodeParsed.tag === "dashboard_item") {
        this._items.push(new DashboardItem(nodeParsed.tagAttributes));
      }
    });
  }
}

export default Dashboard;
