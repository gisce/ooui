import Field from "./Field";

/**
 * A many2one relationship field
 */
class Steps extends Field {
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

  _errorField: string | null = null;
  get errorField(): string | null {
    return this._errorField;
  }

  set errorField(value: string | null) {
    this._errorField = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.relation) {
        this._relation = props.relation;
      }

      if (this.parsedWidgetProps.hasOwnProperty("error_field")) {
        this._errorField = this.parsedWidgetProps.error_field;
      }
    }
  }
}

export default Steps;
