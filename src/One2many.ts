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
  _mode: Array<string> = [];
  get mode(): Array<string> {
    return this._mode;
  }
  set mode(value: Array<string>) {
    this._mode = value;
  }

  static _defaultColspan: number = 4;
  static get defaultColspan(): number {
    return One2many._defaultColspan;
  }
  static set defaultColspan(value: number) {
    One2many._defaultColspan = value;
  }

  constructor(props: any) {
    super(props);
    this.colspan = One2many._defaultColspan;

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
      }
    }
  }
}

export default One2many;
