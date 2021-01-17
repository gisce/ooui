import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import ContainerWidget from "./ContainerWidget";
import Widget from "./Widget";

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

  constructor(fields: Object) {
    this._fields = fields;
  }

  parse(xml: string) {
    const parser = new DOMParser();
    const view: Document = parser.parseFromString(xml, "text/xml");
    this.parseNode(view.documentElement);
  }

  parseNode(node: Element) {
    const widgetFactory = new WidgetFactory();
    Array.prototype.forEach.call(node.childNodes, (child: Element) => {
      if (child.nodeType === child.ELEMENT_NODE) {
        let tag = child.nodeName;

        let tagAttributes: any = {};
        Array.prototype.forEach.call(child.attributes, (attr: Attr) => {
          tagAttributes[attr.name] = attr.value;
        });

        if (tag === "field") {
          const name = child.getAttribute("name");
          const attrWidget = child.getAttribute("widget");
          if (attrWidget) {
            tag = attrWidget;
          } else if (name) {
            tag = this._fields[name].type;
          }

          tagAttributes = { ...tagAttributes, ...this._fields[name!] };
        }

        const widget = widgetFactory.createWidget(tag, tagAttributes);

        this._columns.push(widget);
      }
    });
  }

  /**
   * Find the widgets matching with param id
   * @param {string} id id to find
   */
  findById(id: string): Widget | null {
    return this._columns.find((item) => {
      return item.findById(id);
    });
  }
}

export default Tree;
