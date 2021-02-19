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

  clone<T>(instance: T): T {
    const copy = new ((instance as any).constructor as { new (): T })();
    Object.assign(copy, instance);
    return copy;
  }
  
  constructor(props?: any) {
    this._colspan = Widget._defaultColspan;
    this._readOnly = false;

    if (props) {
      if (props.colspan) {
        this._colspan = +props.colspan;
      }
      if (props.readonly) {
        if (props.readonly === 1 || props.readonly === true) {
          this._readOnly = true;
        }
      }
    }
  }

  abstract findById(id: string): Widget | null;
}

export default Widget;