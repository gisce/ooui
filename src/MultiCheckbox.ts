import Field from "./Field";

/**
 * A Tags widget
 */
class MultiCheckbox extends Field {
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
  set inv_field(value: string | undefined) {
    this._inv_field = value;
  }


  /**
   * field to define the value to show
   */
  _field: string = "name";
  get field(): string {
    return this._field;
  }
  set field(value: string) {
    this._field = value;
  }

  _columns: number = 4;
  get columns(): number {
    return this._columns;
  }
  set columns(value: number) {
    this._columns = value;
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

      if (props.inv_field) {
        this._inv_field = props.inv_field;
      }
      if (this.parsedWidgetProps.hasOwnProperty('field')) {
        this._field = this.parsedWidgetProps.field
      }
      if (this.parsedWidgetProps.columns) {
        this._columns = this.parsedWidgetProps.columns;
      }
    }
  }
}

export default MultiCheckbox;
