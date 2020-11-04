class Widget {

  static _defaultColspan = 1;
  static get defaultColspan() {
    return Widget._defaultColspan;
  }
  static set defaultColspan(value) {
    Widget._defaultColspan = value;
  }

  /**
   * Widget type
   */
  _type;
  get type() {
    return this._type;
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

  constructor(type) {
    this._type = type;
    this._colspan = Widget._defaultColspan;
  }
}

export default Widget;