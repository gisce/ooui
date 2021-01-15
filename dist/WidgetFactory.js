import Notebook from "./Notebook";
import Page from "./Page";
import Group from "./Group";
import Button from "./Button";
import Label from "./Label";
import Char from "./Char";
import Text from "./Text";
import Widget from "./Widget";
var WidgetFactory = /** @class */ (function () {
    function WidgetFactory() {
    }
    WidgetFactory.prototype.setWidgetClass = function (type) {
        switch (type) {
            case 'notebook':
                this._widgetClass = Notebook;
                break;
            case 'page':
                this._widgetClass = Page;
                break;
            case 'group':
                this._widgetClass = Group;
                break;
            case 'label':
                this._widgetClass = Label;
                break;
            case 'char':
                this._widgetClass = Char;
                break;
            case 'text':
                this._widgetClass = Text;
                break;
            case 'button':
                this._widgetClass = Button;
                break;
            default:
                this._widgetClass = Widget;
                break;
        }
    };
    ;
    WidgetFactory.prototype.createWidget = function (type, props) {
        this.setWidgetClass(type);
        // TODO: Widget Class constructors should use only the props needed, not all props.
        switch (type) {
            // Specific cases (only selected props should be used)
            case 'notebook':
            case 'page':
            case 'group':
                return new this._widgetClass(props);
            // Generic case
            default:
                return new this._widgetClass(props);
        }
    };
    return WidgetFactory;
}());
export default WidgetFactory;
//# sourceMappingURL=WidgetFactory.js.map