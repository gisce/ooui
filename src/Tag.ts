import Selection from "./Selection";

/**
 * A Tag widget
 */
class Tag extends Selection {
  get colors(): any | "auto" {
    return this._parsedWidgetProps.colors || {};
  }
}

export default Tag;
