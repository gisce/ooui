import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import Widget from "./Widget";
import ContainerWidget from "./ContainerWidget";

const DEFAULT_COLSPAN = {
  notebook: 3,
};

class Form {
  static defaultColspan = {
    notebook: 3,
  };

  _fields;

  get fields() {
    return this._fields;
  }
  
  _container;

  get container() {
    return this._container;
  }

  constructor(fields, columns = 6) {
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
    node.childNodes.forEach((child) => {
      if (child.nodeType === child.ELEMENT_NODE) {
        const tag = child.nodeName;
        const w = widgetFactory.createWidget(tag);
        if (w instanceof ContainerWidget) {
          const colspan = child.getAttribute("colspan") || 1;
          const columns = child.getAttribute("col") || 4;
          const w = new ContainerWidget(tag, columns);
          w["colspan"] = colspan || DEFAULT_COLSPAN[tag];
          console.log(typeof child.attributes);
          Array.prototype.forEach.call(child.attributes, (attr) => {
            w[attr.name] = attr.value;
          });
          this.parseNode(child, w.container);
          container.addWidget(w);
        }
        if (tag === "field") {
          const name = child.getAttribute("name");
          const widget =
            child.getAttribute("widget") || this._fields[name]["type"];
          const colspan = child.getAttribute("colspan") || 2;
          const w = new Widget(widget);
          w["colspan"] = colspan;
          Array.prototype.forEach.call(child.attributes, (attr) => {
            w[attr.name] = attr.value;
          });
          container.addWidget(w);
        }
      }
    });
  }
}

export default Form;
