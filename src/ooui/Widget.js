class Widget {

  static _defaultColspan = 1;
  static get defaultColspan() {
    return Widget._defaultColspan;
  }
  static set defaultColspan(value) {
    Widget._defaultColspan = value;
  }

  /**
   * Read Only flag (default is false)
   */
  _readOnly;
  get readOnly() {
    return this._readOnly;
  }
  set readOnly(value) {
    this._readOnly = value;
  }

  /**
   * Column span (default is 1)
   */
  _colspan;
  get colspan() {
    return this._colspan;
  }
  set colspan(value) {
    this._colspan = value;
  }

  constructor(props) {
    this._colspan = Widget._defaultColspan;
    this._readOnly = false;

    if (props) {
      if (props.colspan) {
        this._colspan = props.colspan;
      }
      if (props.readonly) {
        if (props.readonly === 1) {
          this._readOnly = true;
        }
      }
    }
  }
}

export default Widget;