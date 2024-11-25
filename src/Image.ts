import Field from "./Field";

/**
 * Image base64 field
 */
class Image extends Field {
  get showControls(): boolean {
    return this.parsedWidgetProps?.showControls ?? true;
  }
}

export default Image;
