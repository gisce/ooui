class Widget {
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
  _colspan = 1;
  
  get colspan() {
    return this._colspan;
  }
  set colspan(value) {
    this._colspan = value;
  }

  constructor(type) {
    this._type = type;
  }
}

export default Widget;