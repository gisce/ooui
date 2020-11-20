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

  get colspan() {
    return this._container.colspan;
  }
  set colspan(value) {
    this._container.colspan = value;
  }
  constructor(props) {
    super(props);

    this._container = new Container(props && props.col);
    this._container.colspan = ContainerWidget._defaultColspan;

    if (props) {
      if (props.colspan) {
        this._container.colspan = props.colspan;
      }
    }
  }
}

export default ContainerWidget;