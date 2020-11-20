class Container {
  /**
   * Number of columns the container has.
   */
  _columns;
  get columns() {
    return this._columns;
  }
  set columns(value) {
    this._columns = value;
  }

  /**
   * Number of columns the container occupies.
   */
  _colspan;
  get colspan() {
    return this._colspan;
  }
  set colspan(value) {
    this._colspan = value;
  }

  /**
   * Number of rows the container has.
   */
  _rows;
  get rows() {
    return this._rows;
  }
  set rows(value) {
    this._rows = value;
  }

  _index;
  get index() {
    return this._index;
  }

  constructor(columns = 4) {
    this._columns = columns;
    this._rows = [[]];
    this._index = 0;
  }

  /**
   * Returns the next free position
   */
  freePosition() {
    const span = this._rows[this._index].reduce((prev, current) => {
      return prev + current.colspan;
    }, 0);
    return this._columns - span;
  }

  addWidget(widget) {
    if (widget.colspan > this._columns) {
      // Widget colspan is greater than container columns, so we change widget
      // colspan to fit container columns.
      widget.colspan = this._columns;
    }

    if (widget.colspan <= this.freePosition()) {
      this._rows[this._index].push(widget);
    } else {
      this._rows.push([]);
      this._index++;
      this.addWidget(widget);
    }
  }
}

export default Container;
