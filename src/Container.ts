import Widget from "./Widget";

class Container {
  /**
   * Number of columns the container is divided
   */
  _columns: number;
  get columns(): number {
    return this._columns;
  }
  set columns(value: number) {
    this._columns = value;
  }

  /**
   * Number of columns to use
   */
  _colspan: number;
  get colspan(): number {
    return this._colspan;
  }
  set colspan(value: number) {
    this._colspan = value;
  }

  /**
   * Number of rows
   */
  _rows: Widget[][];
  get rows(): Widget[][] {
    return this._rows;
  }
  set rows(value: Widget[][]) {
    this._rows = value;
  }

  _index: number;
  get index(): number {
    return this._index;
  }

  constructor(columns: number = 4, colspan: number = 6) {
    this._columns = columns;
    this._colspan = colspan;
    this._rows = [[]];
    this._index = 0;
  }

  /**
   * Returns the next free position
   */
  freePosition(): number {
    const span = this._rows[this._index].reduce((prev, current) => {
      return prev + current.colspan;
    }, 0);
    return this._columns - span;
  }

  addWidget(widget: Widget) {
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

  /**
   * Traverses children to find a matching container or widget with the exact same id.
   * @param {string} id id (name) of the field or container to find
   */
  findById(id: string): Widget | null {
    let r: Widget | null = null;
    if (this._rows && this._rows.length) {
      this._rows.forEach((row) => {
        if (r) {
          // Item has been found.
          return;
        }

        if (row && row.length) {
          row.forEach((item) => {
            if (r) {
              // Item has been found.
              return;
            }
            if (item) {
                r = item.findById(id);
            }
          });
        }
      });
    }
    return r;
  }
}

export default Container;
