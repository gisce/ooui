import Field from "./Field";

/**
 * QRCode widget
 */
class QRCode extends Field {
  get width(): number | undefined {
    return this.parsedWidgetProps?.width;
  }

  get border(): boolean {
    return this.parsedWidgetProps?.border ?? false;
  }

  get showValue(): boolean {
    console.log(this.parsedWidgetProps);
    return this.parsedWidgetProps?.showValue ?? false;
  }
}

export default QRCode;
