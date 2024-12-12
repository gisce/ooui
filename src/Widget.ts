import { replaceEntities, parseWidgetProps } from "./helpers/attributeParser";

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
   * Determines if widget is read only (default is undefined)
   */
  _readOnly: boolean | undefined;
  get readOnly(): boolean | undefined {
    return this._readOnly;
  }

  set readOnly(value: boolean | undefined) {
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

  /**
   * Invisible fields (default is false)
   */
  _invisible: boolean;
  get invisible(): boolean {
    return this._invisible;
  }

  set invisible(value: boolean) {
    this._invisible = value;
  }

  /**
   * Widget type
   */
  _type: string = "";
  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  /**
   * Context
   */
  _context: any;
  get context(): any {
    return this._context;
  }

  set context(value: any) {
    this._context = value;
  }

  /**
   * Domain
   */
  _domain?: string;
  get domain(): string | undefined {
    return this._domain;
  }

  set domain(value: string | undefined) {
    this._domain = value;
  }

  /**
   * Unique key for widget
   */
  _key?: string;
  get key(): string | undefined {
    return this._key;
  }

  set key(value: string | undefined) {
    this._key = value;
  }

  _parsedWidgetProps: any = {};
  get parsedWidgetProps(): any {
    return this._parsedWidgetProps;
  }

  set parsedWidgetProps(value: any) {
    this._parsedWidgetProps = value;
  }

  _isFunction: boolean | undefined;
  get isFunction(): boolean | undefined {
    return this._isFunction;
  }

  set isFunction(value: boolean | undefined) {
    this._isFunction = value;
  }

  /**
   * Base type of the field
   */
  _fieldType: string = "";
  get fieldType(): string {
    return this._fieldType;
  }

  constructor(props?: any) {
    this._colspan = Widget._defaultColspan;
    this._invisible = false;

    if (props) {
      if (props.colspan) {
        this._colspan = +props.colspan;
      }
      if (props.readonly !== undefined) {
        this._readOnly = parseBoolAttribute(props.readonly);
      }
      if (props.invisible) {
        if (
          props.invisible === 1 ||
          props.invisible === "1" ||
          props.invisible === true
        ) {
          this._invisible = true;
        }
      }
      if (props.type) {
        this._type = props.type;
      }
      if (props.context) {
        this._context = props.context;
      }
      if (props.domain) {
        if (typeof props.domain !== "string") {
          this._domain = replaceEntities(JSON.stringify(props.domain));
        } else {
          this._domain = replaceEntities(props.domain);
        }
      }
      if (props.type) {
        this._fieldType = props.fieldsWidgetType;
      }
      if (props.widget_props) {
        this._parsedWidgetProps = parseWidgetProps(props.widget_props);
      }
      if (props.key) {
        this._key = props.key;
      }
      if (props.is_function) {
        this._isFunction = props.is_function;
      }
    }
  }

  abstract findById(id: string): Widget | null;
}

export default Widget;
