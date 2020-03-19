import Container from "./Container";

let WIDGET_FACTORIES = {};

class Widget {
  constructor(type) {
    this.type = type;
    this.colspan = 1;
  }
}

class ContainerWidget extends Widget {
  constructor(type, columns) {
    super(type);
    this.container = new Container(columns);
  }
}

class Notebook extends ContainerWidget {}

class Page extends ContainerWidget {}

class Group extends ContainerWidget {}

class Field extends Widget {}

WIDGET_FACTORIES["notebook"] = Notebook;
WIDGET_FACTORIES["page"] = Page;
WIDGET_FACTORIES["group"] = Group;
WIDGET_FACTORIES["field"] = Field;
WIDGET_FACTORIES["newline"] = Widget;
WIDGET_FACTORIES["separator"] = Widget;
WIDGET_FACTORIES["label"] = Widget;
WIDGET_FACTORIES["button"] = Widget;

class WidgetFactory {
  constructor(type) {
    console.log(type);
    return new WIDGET_FACTORIES[type]();
  }
}

const DEFAULT_COLSPAN = {
  notebook: 3
};

class Form {
  constructor(fields, columns = 6) {
    this.fields = fields;
    this.container = new Container(columns);
  }

  parse(xml) {
    const parser = new DOMParser();
    const view = parser.parseFromString(xml, "text/xml");
    this.parseNode(view.documentElement, this.container);
  }

  parseNode(node, container) {
    node.childNodes.forEach(child => {
      if (child.nodeType === child.ELEMENT_NODE) {
        const tag = child.nodeName;
        const w = new WidgetFactory(tag);
        if (w instanceof ContainerWidget) {
          const colspan = child.getAttribute("colspan") || 1;
          const columns = child.getAttribute("col") || 4;
          const w = new ContainerWidget(tag, columns);
          w["colspan"] = DEFAULT_COLSPAN[tag] || colspan;
          Array.prototype.forEach.call(child.attributes, attr => {
            w[attr.name] = attr.value;
          });
          this.parseNode(child, w.container);
          container.addWidget(w);
        }
        if (tag === "field") {
          const name = child.getAttribute("name");
          const widget =
            child.getAttribute("widget") || this.fields[name]["type"];
          const colspan = child.getAttribute("colspan") || 2;
          const w = new Widget(widget);
          w["colspan"] = colspan;
          Array.prototype.forEach.call(child.attributes, attr => {
            w[attr.name] = attr.value;
          });
          container.addWidget(w);
        }
      }
    });
  }
}

export default Form;
