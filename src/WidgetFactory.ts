import Notebook from "./Notebook";
import Page from "./Page";
import Group from "./Group";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import Label from "./Label";
import Char from "./Char";
import Text from "./Text";
import Selection from "./Selection";
import Many2one from "./Many2one";
import Markdown from "./Markdown";
import Boolean from "./Boolean";
import Integer from "./Integer";
import Widget from "./Widget";
import Float from "./Float";
import FloatTime from "./FloatTime";
import HTMLPreview from "./HTMLPreview";
import ProgressBar from "./ProgressBar";
import Date from "./Date";
import DateTime from "./DateTime";
import Many2many from "./Many2many";
import One2many from "./One2many";
import NewLine from "./NewLine";
import Separator from "./Separator";
import Reference from "./Reference";
import Binary from "./Binary";
import Image from "./Image";
import FiberGrid from "./FiberGrid";
import Timeline from "./Timeline";
import Indicator from "./Indicator";
import Tags from "./Tags";
import Tag from "./Tag";
import Radio from "./Radio";
import MultiCheckbox from "./MultiCheckbox";
import Switch from "./Switch";
import Steps from "./Steps";
import CodeEditor from "./CodeEditor";
import Avatar from "./Avatar";
import Time from "./Time";

class WidgetFactory {
  /**
   * Widget class
   */
  _widgetClass: any;

  setWidgetClass(type: string): void {
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
      case "buttonGroup":
        this._widgetClass = ButtonGroup;
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
      case "markdown":
        this._widgetClass = Markdown;
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
      case "reference":
        this._widgetClass = Reference;
        break;
      case "binary":
        this._widgetClass = Binary;
        break;
      case "image":
        this._widgetClass = Image;
        break;
      case "fiber_grid":
        this._widgetClass = FiberGrid;
        break;
      case "timeline":
        this._widgetClass = Timeline;
        break;
      case "indicator":
        this._widgetClass = Indicator;
        break;
      case "tags":
        this._widgetClass = Tags;
        break;
      case "tag":
        this._widgetClass = Tag;
        break;
      case "avatar":
        this._widgetClass = Avatar;
        break;
      case "radio":
        this._widgetClass = Radio;
        break;
      case "multicheckbox":
        this._widgetClass = MultiCheckbox;
        break;
      case "switch":
        this._widgetClass = Switch;
        break;
      case "steps":
        this._widgetClass = Steps;
        break;
      case "codeeditor":
        this._widgetClass = CodeEditor;
        break;
      case "time":
        this._widgetClass = Time;
        break;
      case "html_preview":
        this._widgetClass = HTMLPreview;
        break;

      default:
        break;
    }
  }

  createWidget(type: string, props: any) {
    let finalType = type;

    this.setWidgetClass(type);

    // Fallback to default widget, we try to use the fields type widget if it exists
    if (this._widgetClass === undefined) {
      finalType = props.fieldsWidgetType;
      this.setWidgetClass(props.fieldsWidgetType);
    }

    if (this._widgetClass === undefined) {
      this._widgetClass = Widget;
    }

    // TODO: Widget Class constructors should use only the props needed, not all props.
    switch (type) {
      // Specific cases (only selected props should be used)
      case "notebook":
      case "page":
      case "group":
        return new this._widgetClass({ ...props, type: finalType });
      case "button":
        return new this._widgetClass({
          ...props,
          type,
          buttonType: props.type,
        });
      // Generic case
      default:
        return new this._widgetClass({ ...props, type: finalType });
    }
  }
}

export default WidgetFactory;
