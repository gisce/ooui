import Field from "./Field";

/**
 * A One2Many relationship field
 */
class One2many extends Field {
  /**
   * Field size
   */
  _size: number = 150;
  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  /**
   * Relation
   */
  _relation: string = "";
  get relation(): string {
    return this._relation;
  }

  set relation(value: string) {
    this._relation = value;
  }

  /**
   * Inv_field
   */
  _inv_field: string | undefined;
  get inv_field(): string | undefined {
    return this._inv_field;
  }

  set inv_field(value: string | undefined) {
    this._inv_field = value;
  }

  /**
   * Views
   */
  _views: any = null;
  get views(): any {
    return this._views;
  }

  set views(value: any) {
    this._views = value;
  }

  /**
   * Mode
   */
  _mode: string[] = [];
  get mode(): string[] {
    return this._mode;
  }

  set mode(value: string[]) {
    this._mode = value;
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
   * Height
   */
  _height?: number;
  get height(): number | undefined {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  /**
   * Infinite mode
   */
  _infinite: boolean = false;
  get infinite(): boolean {
    return this._infinite;
  }

  set infinite(value: boolean) {
    this._infinite = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.size) {
        this._size = props.size;
      }

      if (props.relation) {
        this._relation = props.relation;
      }

      if (props.mode) {
        this._mode = props.mode.split(",");
      }

      if (props.views) {
        this._views = props.views;
      }

      if (props.colspan) {
        this.colspan = props.colspan;
      } else {
        this._mustExpand = true;
      }

      if (props.inv_field) {
        this._inv_field = props.inv_field;
      }

      if (props.height) {
        try {
          this._height = parseInt(props.height);
        } catch (e) {
          this._height = undefined;
        }
      }

      if (props.widget_props) {
        if (
          this.parsedWidgetProps.infinite === "1" ||
          this.parsedWidgetProps.infinite === 1 ||
          this.parsedWidgetProps.infinite === true
        ) {
          this._infinite = true;
        }
      }
    }
  }
}

export default One2many;
