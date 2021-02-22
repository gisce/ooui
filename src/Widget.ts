abstract class Widget {

  /**
   * Default colspan
   */
  static _defaultColspan: number = 1;
  static get defaultColspan() {
    return Widget._defaultColspan;
  }
  static set defaultColspan(value) {
    Widget._defaultColspan = value;
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
   * Column span (default is 1)
   */
  _colspan: number;
  get colspan(): number {
    return this._colspan;
  }
  set colspan(value: number) {
    this._colspan = +value;
  }
  
  /**
   * Invisible fields (default is false)
   */
  _invisible: boolean;
  get invisible(): boolean {
    return this._invisible;
  }
  set invisible(value: boolean) {
    this._invisible = value;
  }

  constructor(props?: any) {
    this._colspan = Widget._defaultColspan;
    this._readOnly = false;
    this._invisible = false;

    if (props) {
      if (props.colspan) {
        this._colspan = +props.colspan;
      }
      if (props.readonly) {
        if (props.readonly === 1 || props.readonly === true) {
          this._readOnly = true;
        }
      }
      if (props.invisible) {
        if (props.invisible === 1 || props.invisible === true) {
          this._invisible = true;
        }
      }
    }
  }

  abstract findById(id: string): Widget | null;
}

export default Widget;
