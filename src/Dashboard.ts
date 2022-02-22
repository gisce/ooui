import Action from "./Action";
import { parseGenericNodes } from "./helpers/nodeParser";

class Dashboard {
  _string: string | null = null;
  get string(): string | null {
    return this._string;
  }

  _actions: Action[] = [];
  get actions(): Action[] {
    return this._actions;
  }

  constructor(xml: string) {
    const parser = new DOMParser();
    const view: Document = parser.parseFromString(xml, "text/xml");
    this._string = view.documentElement.getAttribute("string");
    const documentElement = view.documentElement;

    const actionsParsed = parseGenericNodes(documentElement.childNodes);

    actionsParsed.forEach((nodeParsed) => {
      if (nodeParsed.tag === "action") {
        this._actions.push(new Action(nodeParsed.tagAttributes));
      }
    });
  }
}

export default Dashboard;
