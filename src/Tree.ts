import WidgetFactory from "./WidgetFactory";
import Widget from "./Widget";
import { parseNodes } from "./helpers/nodeParser";
import { parseColors } from "./helpers/colorParser";

class Tree {
  /**
   * Object containing fields specification of the form.
   */
  _fields: any;
  get fields() {
    return this._fields;
  }

  _columns: Array<any> = [];
  get columns(): Array<any> {
    return this._columns;
  }

  _string: string | null = null;
  get string(): string | null {
    return this._string;
  }

  /**
   * Widget type
   */
  _type: string = "tree";
  get type(): string {
    return this._type;
  }

  /**
   * Widget type
   */
  _colorExpressions: any[] | undefined;
  get colorExpressions(): any[] | undefined {
    return this._colorExpressions;
  }

  constructor(fields: Object) {
    this._fields = fields;
  }

  parse(xml: string) {
    const parser = new DOMParser();
    const view: Document = parser.parseFromString(xml, "text/xml");
    this.parseNode(view.documentElement);
    this._string = view.documentElement.getAttribute("string");
    const colorString = view.documentElement.getAttribute("colors");
    if (colorString) {
      this._colorExpressions = parseColors(colorString);
    }
  }

  parseNode(node: Element) {
    const widgetFactory = new WidgetFactory();

    const nodesParsed = parseNodes(node.childNodes, this._fields);

    nodesParsed.forEach((nodeParsed) => {
      const { tag, tagAttributes } = nodeParsed;
      const widget = widgetFactory.createWidget(tag, tagAttributes);
      this._columns.push(widget);
    });
  }

  /**
   * Find the widgets matching with param id
   * @param {string} id id to find
   */
  findById(id: string): Widget | null {
    return this._columns.find((item) => {
      if (item.findById) {
        return item.findById(id);
      }
    });
  }
}

export default Tree;
