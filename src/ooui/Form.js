import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import ContainerWidget from "./ContainerWidget";

class Form {
  _fields;
  get fields() {
    return this._fields;
  }
  
  _container;
  get container() {
    return this._container;
  }

  constructor(fields, columns = 8) {
    this._fields = fields;
    this._container = new Container(columns);
  }

  parse(xml) {
    const parser = new DOMParser();
    const view = parser.parseFromString(xml, "text/xml");
    this.parseNode(view.documentElement, this._container);
  }

  parseNode(node, container) {
    const widgetFactory = new WidgetFactory();
    Array.prototype.forEach.call(node.childNodes, (child) => {
      if (child.nodeType === child.ELEMENT_NODE) {
        let tag = child.nodeName;

        const tagAttributes = {};
        Array.prototype.forEach.call(child.attributes, (attr) => {
          tagAttributes[attr.name] = attr.value;
        });

        if (tag === "field") {
          const name = child.getAttribute("name");
          tag = child.getAttribute("widget") || this._fields[name].type;
        }
        
        const widget = widgetFactory.createWidget(tag, tagAttributes);
        
        if (widget instanceof ContainerWidget) {
          this.parseNode(child, widget.container);
        }

        container.addWidget(widget);
      }
    });
  }
}

export default Form;
