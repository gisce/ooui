import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import ContainerWidget from "./ContainerWidget";
import Widget from "./Widget";
import { parseNodes } from "./helpers/nodeParser";
class Form {
  /**
   * Object containing fields specification of the form.
   */
  _fields: any;
  get fields() {
    return this._fields;
  }

  _container: Container;
  get container(): Container {
    return this._container;
  }

  _string: string | null = null;
  get string(): string | null {
    return this._string;
  }

  /**
   * Widget type
   */
  _type: string = "form";
  get type(): string {
    return this._type;
  }

  /**
   * Determines if form is read only (default is false)
   */
  _readOnly: boolean = false;
  get readOnly(): boolean {
    return this._readOnly;
  }
  set readOnly(value: boolean) {
    this._readOnly = value;
  }

  /*
  _widgets = {
    *[Symbol.iterator]() {
      if (this._container && this._container.length) {
        this._container.forEach((item) => {
          
          // yield item
        });
      }
    }
  };
  get widgets() {
    return this._widgets;
  }
  */

  constructor(fields: Object, columns: number = 4) {
    this._fields = fields;
    this._container = new Container(columns);
  }

  parse(xml: string, readOnly: boolean = false) {
    const parser = new DOMParser();
    const view: Document = parser.parseFromString(xml, "text/xml");
    this._string = view.documentElement.getAttribute("string");
    this._readOnly = readOnly;
    this.parseNode(view.documentElement, this._container);
  }

  parseNode(node: Element, container: Container) {
    const widgetFactory = new WidgetFactory();

    const nodesParsed = parseNodes(node.childNodes, this._fields);

    nodesParsed.forEach((nodeParsed) => {
      const { tag, tagAttributes, child } = nodeParsed;
      const widget = widgetFactory.createWidget(tag, tagAttributes);

      if (widget instanceof ContainerWidget) {
        this.parseNode(child, widget.container);
      }

      // If the form is set to readonly, reflect it to its children
      widget.readOnly = widget.readOnly || this.readOnly;
      container.addWidget(widget);
    });
  }

  /**
   * Calls container's findById method to find the widgets matching with param id
   * @param {string} id id to find
   */
  findById(id: string): Widget | null {
    return this.container.findById(id);
  }
}

export default Form;
