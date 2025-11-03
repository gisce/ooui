import Field from "./Field";

/**
 * Image base64 field
 */
class Image extends Field {
  _width?: number;
  get width(): number | undefined {
    return this._width;
  }

  set width(value: number | undefined) {
    this._width = value;
  }

  _height?: number;
  get height(): number | undefined {
    return this._height;
  }

  set height(value: number | undefined) {
    this._height = value;
  }

  get showControls(): boolean {
    return this.parsedWidgetProps?.showControls ?? true;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (props.width) {
        const parsedWidth = parseInt(props.width);
        this._width = isNaN(parsedWidth) ? undefined : parsedWidth;
      }

      if (props.height) {
        const parsedHeight = parseInt(props.height);
        this._height = isNaN(parsedHeight) ? undefined : parsedHeight;
      }
    }
  }
}

export default Image;
