import Field from "./Field";

/**
 * A many2one relationship field
 */
class Many2one extends Field {
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

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.size) {
        this._size = props.size;
      }

      if (props.relation) {
        this._relation = props.relation;
      }
    }
  }
}

export default Many2one;
