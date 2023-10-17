import Text from "./Text";

/**
 * A CodeEditor widget
 */
class CodeEditor extends Text {
  _lang: string | null = null;
  get lang(): string | null {
    return this._lang;
  }

  set lang(value: string | null) {
    this._lang = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (this.parsedWidgetProps.lang) {
        this._lang = this.parsedWidgetProps.lang;
      }
    }
  }
}

export default CodeEditor;
