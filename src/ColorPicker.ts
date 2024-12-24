import Char from "./Char";

class ColorPicker extends Char {
  get showText(): boolean {
    return this.parsedWidgetProps.show_text ?? true;
  }
}

export default ColorPicker;
