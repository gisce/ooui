import Field from "./Field";

class Comments extends Field {
  /**
   * Height of the comments component
   */
  _height: number | undefined = undefined;

  get height(): number | undefined {
    return this._height;
  }

  set height(value: number | undefined) {
    this._height = value;
  }

  constructor(props: any) {
    super(props);
    if (props.height) {
      const parsedHeight = parseInt(props.height);
      this._height = isNaN(parsedHeight) ? undefined : parsedHeight;
    }
  }
}

export default Comments;
