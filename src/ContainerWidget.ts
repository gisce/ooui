import Widget from "./Widget";
import Container from "./Container";
import { replaceEntities } from "./helpers/attributeParser";

class ContainerWidget extends Widget {
  /**
   * Field identifier
   *
   * Corresponds to the field's name attribute from xml
   */
  _id: string = "";
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

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
   * Must expand widget
   */
  _mustExpand: boolean = false;
  get mustExpand(): boolean {
    return this._mustExpand;
  }

  set mustExpand(value: boolean) {
    this._mustExpand = value;
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

  constructor(props?: any) {
    super(props);

    this._container = new Container(
      props?.col,
      ContainerWidget._defaultColspan,
      this.readOnly,
      props?.key,
    );

    if (props) {
      if (props.name) {
        this._id = props.name;
      }

      if (props.colspan) {
        this._container.colspan = +props.colspan;
      } else {
        this._mustExpand = true;
      }

      if (props.string) {
        this._label = replaceEntities(props.string);
      }
    }
  }

  /**
   * Calls container's findById method to find the widgets matching with param id
   * @param {string} id id to find
   */
  findById(id: string): Widget | null {
    if (id === this.id) {
      return this;
    }

    return this.container.findById(id);
  }
}

export default ContainerWidget;
