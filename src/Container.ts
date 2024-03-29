import Field from "./Field";
import NewLine from "./NewLine";
import Widget from "./Widget";
import Label from "./Label";

type AddWidgetOptions = {
  addLabel: boolean;
};

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

  /**
   * Determines if widget is read only (default is false)
   */
  _readOnly: boolean;
  get readOnly(): boolean {
    return this._readOnly;
  }

  set readOnly(value: boolean) {
    this._readOnly = value;
  }

  /**
   * Unique key for container
   */
  _key?: string;
  get key(): string | undefined {
    return this._key;
  }

  set key(value: string | undefined) {
    this._key = value;
  }

  constructor(
    columns: number = 4,
    colspan: number = 6,
    readOnly: boolean = false,
    key: string | undefined = undefined,
  ) {
    this._columns = columns;
    this._colspan = colspan;
    this._rows = [[]];
    this._index = 0;
    this._readOnly = readOnly;
    this._key = key;
  }

  /**
   * Returns the next free position
   */
  freePosition(): number {
    const span = this._rows[this._index]
      .filter((el) => {
        return !el.invisible;
      })
      .reduce((prev, current) => {
        return prev + current.colspan;
      }, 0);
    return this._columns - span;
  }

  addWidget(widget: Widget, options?: AddWidgetOptions) {
    const widgetsToAdd: Widget[] = [];
    const addLabel = options ? options.addLabel : true;

    if (widget instanceof NewLine) {
      this._rows.push([]);
      this._index++;
      return;
    }

    if (widget.colspan > this._columns) {
      // Widget colspan is greater than container columns, so we change widget
      // colspan to fit container columns.
      widget.colspan = this._columns;
    }

    // If the container is set to readonly, reflect it to its children
    widget.readOnly = widget.readOnly || this.readOnly;

    // For fields without nolabel we add a preceding label widget
    if (addLabel && widget instanceof Field && !widget.nolabel) {
      if (widget.colspan > 1) {
        widget.colspan -= 1; // We substract one colspan for the corresponding label
      }

      const label = new Label({
        name: widget.id + "_label",
        string: widget.label,
        invisible: widget.invisible,
        help: widget.tooltip,
        fieldForLabel: widget.id,
        key: `${widget.key!}-label`,
      });
      label.type = "label";

      widgetsToAdd.push(label);
      widgetsToAdd.push(widget);
    } else {
      widgetsToAdd.push(widget);
    }

    const widgetsColspan = widgetsToAdd.reduce(
      (accumulator: number, currentWidget: Widget) => {
        return accumulator + currentWidget.colspan;
      },
      0,
    );

    if (widgetsColspan > this.freePosition()) {
      this._rows.push([]);
      this._index++;
    }

    this._rows[this._index] = this._rows[this._index].concat(widgetsToAdd);
  }

  /**
   * Traverses children to find a matching container or widget with the exact same id.
   * @param {string} id id (name) of the field or container to find
   */
  findById(id: string): Widget | null {
    let r: Widget | null = null;
    if (this._rows?.length) {
      this._rows.forEach((row) => {
        if (r) {
          // Item has been found.
          return;
        }

        if (row?.length) {
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
