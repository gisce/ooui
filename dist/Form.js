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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import ContainerWidget from "./ContainerWidget";
import { parseNodes } from "./helpers/nodeParser";
import { evaluateAttributes } from "./helpers/attributeParser";
import { evaluateStates, evaluateButtonStates } from "./helpers/stateParser";
import { parseContext } from "./helpers/contextParser";
import { parseOnChange } from "./helpers/onChangeParser";
var Form = /** @class */ (function () {
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
    function Form(fields, columns) {
        if (columns === void 0) { columns = 4; }
        this._string = null;
        /**
         * Widget type
         */
        this._type = "form";
        /**
         * Determines if form is read only (default is false)
         */
        this._readOnly = false;
        /**
         * Context
         */
        this._context = {};
        /**
         * Collection of onChange actions for fields
         */
        this._onChangeFields = {};
        /**
         * Domain
         */
        this._domain = [];
        this._fields = fields;
        this._container = new Container(columns);
    }
    Object.defineProperty(Form.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "container", {
        get: function () {
            return this._container;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "string", {
        get: function () {
            return this._string;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "readOnly", {
        get: function () {
            return this._readOnly;
        },
        set: function (value) {
            this._readOnly = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (value) {
            this._context = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "onChangeFields", {
        get: function () {
            return this._onChangeFields;
        },
        set: function (value) {
            this._onChangeFields = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "domain", {
        get: function () {
            return this._domain;
        },
        set: function (value) {
            this._domain = value;
        },
        enumerable: false,
        configurable: true
    });
    Form.prototype.parse = function (xml, options) {
        var _a = options || {}, _b = _a.values, values = _b === void 0 ? {} : _b, _c = _a.readOnly, readOnly = _c === void 0 ? false : _c, _d = _a.domain, domain = _d === void 0 ? [] : _d;
        var parser = new DOMParser();
        var view = parser.parseFromString(xml, "text/xml");
        this._string = view.documentElement.getAttribute("string");
        this._readOnly = readOnly;
        this._context = values["id"]
            ? { active_id: values["id"], active_ids: [values["id"]] }
            : {};
        var domainString = view.documentElement.getAttribute("domain");
        this._domain = domain;
        if (domainString) {
            this._domain = __spreadArrays(this._domain, [domainString]);
        }
        this.parseNode({
            node: view.documentElement,
            container: this._container,
            values: values,
        });
    };
    Form.prototype.parseNode = function (_a) {
        var _this = this;
        var node = _a.node, container = _a.container, values = _a.values;
        var widgetFactory = new WidgetFactory();
        var nodesParsed = parseNodes(node.childNodes, this._fields);
        nodesParsed.forEach(function (nodeParsed) {
            var tag = nodeParsed.tag, tagAttributes = nodeParsed.tagAttributes, child = nodeParsed.child;
            var evaluatedTagAttributes = evaluateAttributes({
                tagAttributes: tagAttributes,
                values: values,
                fields: _this._fields,
            });
            var evaluatedStateAttributes;
            if (tag === "button" && tagAttributes.states) {
                evaluatedStateAttributes = evaluateButtonStates({
                    states: tagAttributes.states,
                    values: values,
                });
            }
            else {
                evaluatedStateAttributes = evaluateStates({
                    fieldName: tagAttributes.name,
                    values: values,
                    fields: _this._fields,
                });
            }
            var widgetContext = parseContext({
                context: tagAttributes["context"] || _this._fields["context"],
                values: values,
                fields: _this._fields,
            });
            if (tag !== "button") {
                _this._context = __assign(__assign({}, _this._context), widgetContext);
            }
            if (tagAttributes["on_change"]) {
                _this._onChangeFields[tagAttributes.name] = parseOnChange(tagAttributes["on_change"]);
            }
            var domain = [];
            if (tagAttributes["domain"]) {
                domain = __spreadArrays(_this._domain, [tagAttributes["domain"]]);
            }
            if (_this._fields[tagAttributes.name] &&
                _this._fields[tagAttributes.name].domain) {
                domain = __spreadArrays(_this._domain, [_this._fields[tagAttributes.name].domain]);
            }
            var widget = widgetFactory.createWidget(tag, __assign(__assign(__assign({}, evaluatedTagAttributes), evaluatedStateAttributes), { context: widgetContext, domain: domain }));
            if (widget instanceof ContainerWidget) {
                _this.parseNode({ node: child, container: widget.container, values: values });
            }
            // If the form is set to readonly, reflect it to its children
            widget.readOnly = widget.readOnly || _this.readOnly;
            container.addWidget(widget);
        });
    };
    /**
     * Calls container's findById method to find the widgets matching with param id
     * @param {string} id id to find
     */
    Form.prototype.findById = function (id) {
        return this.container.findById(id);
    };
    return Form;
}());
export default Form;
//# sourceMappingURL=Form.js.map