import WidgetFactory from "./WidgetFactory";
import { parseNodes } from "./helpers/nodeParser";
var Tree = /** @class */ (function () {
    function Tree(fields) {
        this._columns = [];
        this._string = null;
        /**
         * Widget type
         */
        this._type = "tree";
        /**
         * Color expression value
         */
        this._colors = null;
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
    Object.defineProperty(Tree.prototype, "string", {
        get: function () {
            return this._string;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "colors", {
        get: function () {
            return this._colors;
        },
        enumerable: false,
        configurable: true
    });
    Tree.prototype.parse = function (xml) {
        var parser = new DOMParser();
        var view = parser.parseFromString(xml, "text/xml");
        this.parseNode(view.documentElement);
        this._string = view.documentElement.getAttribute("string");
        this._colors = view.documentElement.getAttribute("colors");
    };
    Tree.prototype.parseNode = function (node) {
        var _this = this;
        var widgetFactory = new WidgetFactory();
        var nodesParsed = parseNodes(node.childNodes, this._fields);
        nodesParsed.forEach(function (nodeParsed) {
            var _a;
            var tag = nodeParsed.tag, tagAttributes = nodeParsed.tagAttributes;
            var invisible = tagAttributes.invisible || ((_a = _this._fields[tagAttributes.name]) === null || _a === void 0 ? void 0 : _a.invisible);
            if (invisible === 1 ||
                invisible === "1" ||
                invisible === true ||
                invisible === "True") {
                invisible = true;
            }
            else {
                invisible = false;
            }
            if (!invisible) {
                var widget = widgetFactory.createWidget(tag, tagAttributes);
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
            if (item.findById) {
                return item.findById(id);
            }
        });
    };
    return Tree;
}());
export default Tree;
//# sourceMappingURL=Tree.js.map