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
import Notebook from "./Notebook";
import Page from "./Page";
import Group from "./Group";
import Button from "./Button";
import Label from "./Label";
import Char from "./Char";
import Text from "./Text";
import Selection from "./Selection";
import Many2one from "./Many2one";
import Boolean from "./Boolean";
import Integer from "./Integer";
import Widget from "./Widget";
import Float from "./Float";
import FloatTime from "./FloatTime";
import ProgressBar from "./ProgressBar";
import Date from "./Date";
import DateTime from "./DateTime";
import Many2many from "./Many2many";
import One2many from "./One2many";
import NewLine from "./NewLine";
import Separator from "./Separator";
var WidgetFactory = /** @class */ (function () {
    function WidgetFactory() {
    }
    WidgetFactory.prototype.setWidgetClass = function (type) {
        switch (type) {
            case "notebook":
                this._widgetClass = Notebook;
                break;
            case "page":
                this._widgetClass = Page;
                break;
            case "group":
                this._widgetClass = Group;
                break;
            case "label":
                this._widgetClass = Label;
                break;
            case "char":
                this._widgetClass = Char;
                break;
            case "text":
                this._widgetClass = Text;
                break;
            case "button":
                this._widgetClass = Button;
                break;
            case "selection":
                this._widgetClass = Selection;
                break;
            case "many2one":
                this._widgetClass = Many2one;
                break;
            case "boolean":
                this._widgetClass = Boolean;
                break;
            case "integer":
                this._widgetClass = Integer;
                break;
            case "float":
                this._widgetClass = Float;
                break;
            case "float_time":
                this._widgetClass = FloatTime;
                break;
            case "date":
                this._widgetClass = Date;
                break;
            case "datetime":
                this._widgetClass = DateTime;
                break;
            case "progressbar":
                this._widgetClass = ProgressBar;
                break;
            case "many2many":
                this._widgetClass = Many2many;
                break;
            case "one2many":
            case "one2many_list":
                this._widgetClass = One2many;
                break;
            case "newline":
                this._widgetClass = NewLine;
                break;
            case "separator":
                this._widgetClass = Separator;
                break;
            case "url":
                this._widgetClass = Char;
                break;
            case "email":
                this._widgetClass = Char;
                break;
            default:
                this._widgetClass = Widget;
                break;
        }
    };
    WidgetFactory.prototype.createWidget = function (type, props) {
        this.setWidgetClass(type);
        // TODO: Widget Class constructors should use only the props needed, not all props.
        switch (type) {
            // Specific cases (only selected props should be used)
            case "notebook":
            case "page":
            case "group":
                return new this._widgetClass(__assign(__assign({}, props), { type: type }));
            // Generic case
            default:
                return new this._widgetClass(__assign(__assign({}, props), { type: type }));
        }
    };
    return WidgetFactory;
}());
export default WidgetFactory;
//# sourceMappingURL=WidgetFactory.js.map