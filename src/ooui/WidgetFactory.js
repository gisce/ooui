import Notebook from "./Notebook";
import Page from "./Page";
import Group from "./Group";
import Field from "./Field";
import Widget from "./Widget";

class WidgetFactory {

  /**
   * Widget class
   */
  _widgetClass;

  setWidgetClass(type) {
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
      case 'field': // TODO: Field shouldn't be abstract?
        this._widgetClass = Field;
        break;
      case 'button':
        this._widgetClass = Button;
        break;
      default:
        this._widgetClass = Widget;
        break;
    }
  };

  createWidget(type, props) {
    this.setWidgetClass(type);
    // TODO: Widget Class constructors should use only the props needed, not all ...props.
    switch (type) {
      // Specific cases (only selected props should be used)
      case 'notebook':
        return new this._widgetClass(...props);
      case 'page':
        return new this._widgetClass(...props);
      // Generic case
      default:
        return new this._widgetClass(...props);
    }
  }
}

export default WidgetFactory;