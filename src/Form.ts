import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import ContainerWidget from "./ContainerWidget";
import Widget from "./Widget";

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

  constructor(fields: Object, columns: number = 8) {
    this._fields = fields;
    this._container = new Container(columns);
  }

  parse(xml: string) {
    const parser = new DOMParser();
    const view: Document = parser.parseFromString(xml, "text/xml");
    this.parseNode(view.documentElement, this._container);
  }

  parseNode(node: Element, container: Container) {
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
        
        if (widget instanceof ContainerWidget) {
          this.parseNode(child, widget.container);
        }

        container.addWidget(widget);
      }
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