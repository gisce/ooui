var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import WidgetFactory from "./WidgetFactory";
var Tree = /** @class */ (function () {
    function Tree(fields) {
        this._columns = [];
        this._fields = fields;
    }
    Object.defineProperty(Tree.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        enumerable: false,
        configurable: true
    });
    Tree.prototype.parse = function (xml) {
        var parser = new DOMParser();
        var view = parser.parseFromString(xml, "text/xml");
        this.parseNode(view.documentElement);
    };
    Tree.prototype.parseNode = function (node) {
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
                    tagAttributes_1 = __assign(__assign({}, tagAttributes_1), _this._fields[name_1]);
                }
                var widget = widgetFactory.createWidget(tag, tagAttributes_1);
                _this._columns.push(widget);
            }
        });
    };
    /**
     * Find the widgets matching with param id
     * @param {string} id id to find
     */
    Tree.prototype.findById = function (id) {
        return this._columns.find(function (item) {
            return item.findById(id);
        });
    };
    return Tree;
}());
export default Tree;
//# sourceMappingURL=Tree.js.map