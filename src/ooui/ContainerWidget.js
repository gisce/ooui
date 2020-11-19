import Widget from "./Widget";
import Container from "./Container";

class ContainerWidget extends Widget {

  static _defaultColspan = 6;

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

  constructor(props) {
    super(props);
    this._container = new Container(props.col);
    if (props.colspan > 0) {
      this._container.colspan = props.colspan;
    } else {
      this._container.colspan = ContainerWidget._defaultColspan;
    }
  }
}

export default ContainerWidget;