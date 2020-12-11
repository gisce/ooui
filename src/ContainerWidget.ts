import Widget from "./Widget";
import Container from "./Container";

class ContainerWidget extends Widget {

  static _defaultColspan: number = 6;
  static get defaultColspan(): number {
    return ContainerWidget._defaultColspan;
  }
  static set defaultColspan(value: number) {
    ContainerWidget._defaultColspan = value;
  }

  /**
   * Container
   */
  _container: Container;
  get container(): Container {
    return this._container;
  }
  set container(value: Container) {
    this._container = value;
  }

  get colspan(): number {
    return this._container.colspan;
  }
  set colspan(value: number) {
    this._container.colspan = +value;
  }

  /**
   * Container label
   */
  _label: string = "";
  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value;
  }

  constructor(props: any) {
    super(props);

    this._container = new Container(props && props.col);
    this._container.colspan = ContainerWidget._defaultColspan;

    if (props) {
      if (props.colspan) {
        this._container.colspan = +props.colspan;
      }
      if (props.string) {
        this._label = props.string;
      }
    }
  }

  /**
   * Calls container's findById method to find the widgets matching with param id
   * @param {string} id id to find
   */
  findById(id: string): Widget {
    return this.container.findById(id);
  }
}

export default ContainerWidget;