import Field from "./Field";

/**
 * Binary base64 field
 */
class Binary extends Field {
  /**
   * Filename field name
   */
  _filenameField: string = "";
  get filenameField(): string {
    return this._filenameField;
  }
  set filenameField(value: string) {
    this._filenameField = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.filename) {
        this._filenameField = props.filename;
      }
    }
  }
}

export default Binary;
