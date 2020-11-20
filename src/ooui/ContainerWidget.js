import Widget from "./Widget";
import Container from "./Container";

class ContainerWidget extends Widget {

  static _defaultColspan = 6;
  static get defaultColspan() {
    return ContainerWidget._defaultColspan;
  }
  static set defaultColspan(value) {
    ContainerWidget._defaultColspan = value;
  }

  /**
   * Container
   */
  _container;
  get container() {
    return this._container;
  }
  set container(value) {
    this._container = value;
  }

  get colspan() {
    return this._container.colspan;
  }
  set colspan(value) {
    this._container.colspan = value;
  }

  /**
   * Container label
   */
  _label;
  get label() {
    return this._label;
  }
  set label(value) {
    this._label = value;
  }

  constructor(props) {
    super(props);

    this._container = new Container(props && props.col);
    this._container.colspan = ContainerWidget._defaultColspan;

    if (props) {
      if (props.colspan) {
        this._container.colspan = props.colspan;
      }
      if (props.string) {
        this._container.label = props.string;
      }
    }
  }
}

export default ContainerWidget;