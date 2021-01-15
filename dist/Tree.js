import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import ContainerWidget from "./ContainerWidget";
var Tree = /** @class */ (function () {
    function Tree(fields, columns) {
        if (columns === void 0) { columns = 8; }
        this._fields = fields;
        this._container = new Container(columns);
    }
    Object.defineProperty(Tree.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "container", {
        get: function () {
            return this._container;
        },
        enumerable: false,
        configurable: true
    });
    Tree.prototype.parse = function (xml) {
        var parser = new DOMParser();
        var view = parser.parseFromString(xml, "text/xml");
        this.parseNode(view.documentElement, this._container);
    };
    Tree.prototype.parseNode = function (node, container) {
        var _this = this;
        var widgetFactory = new WidgetFactory();
        Array.prototype.forEach.call(node.childNodes, function (child) {
            if (child.nodeType === child.ELEMENT_NODE) {
                var tag = child.nodeName;
                var tagAttributes_1 = {};
                Array.prototype.forEach.call(child.attributes, function (attr) {
                    tagAttributes_1[attr.name] = attr.value;
                });
                if (tag === "field") {
                    var name_1 = child.getAttribute("name");
                    var attrWidget = child.getAttribute("widget");
                    if (attrWidget) {
                        tag = attrWidget;
                    }
                    else if (name_1) {
                        tag = _this._fields[name_1].type;
                    }
                }
                var widget = widgetFactory.createWidget(tag, tagAttributes_1);
                if (widget instanceof ContainerWidget) {
                    _this.parseNode(child, widget.container);
                }
                container.addWidget(widget);
            }
        });
    };
    /**
     * Calls container's findById method to find the widgets matching with param id
     * @param {string} id id to find
     */
    Tree.prototype.findById = function (id) {
        return this.container.findById(id);
    };
    return Tree;
}());
export default Tree;
//# sourceMappingURL=Tree.js.map