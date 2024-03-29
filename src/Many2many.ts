import Field from "./Field";

/**
 * A Many2many relationship field
 */
class Many2many extends Field {
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
   * Must expand widget
   */
  _mustExpand: boolean = false;
  get mustExpand(): boolean {
    return this._mustExpand;
  }

  set mustExpand(value: boolean) {
    this._mustExpand = value;
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

      if (!props.colspan) {
        this._mustExpand = true;
      }
    }
  }
}

export default Many2many;
