import Field from "./Field";

class Email extends Field {
  _multi: boolean = false;
  get multi(): boolean {
    return this._multi;
  }

  set multi(value: boolean) {
    this._multi = value;
  }

  _size: number | undefined;
  get size(): number | undefined {
    return this._size;
  }

  set size(value: number | undefined) {
    this._size = value;
  }

  constructor(props: any) {
    super(props);
    if (props) {
      if (props.size) {
        this.size = props.size;
      }
    }
    if (this.parsedWidgetProps.multi) {
      this.multi = this.parsedWidgetProps.multi;
    }
  }
}

export default Email;
