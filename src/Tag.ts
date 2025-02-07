import Selection from "./Selection";

/**
 * A Tag widget
 */
class Tag extends Selection {
  get colors(): any | "auto" {
    return this._parsedWidgetProps.colors || {};
  }

  get colorField(): string | null {
    return this._parsedWidgetProps?.colorField || null;
  }
}

export default Tag;
