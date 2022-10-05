import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import ContainerWidget from "./ContainerWidget";
import Widget from "./Widget";
import { ParsedNode } from "./helpers/nodeParser";
import { evaluateAttributes, replaceEntities } from "./helpers/attributeParser";
import { evaluateStates, evaluateButtonStates } from "./helpers/stateParser";
import { parseContext } from "./helpers/contextParser";
import { parseOnChange } from "./helpers/onChangeParser";
import * as txml from "txml";

export type FormParseOptions = {
  readOnly?: boolean;
  values?: any;
};

class Form {
  /**
   * Object containing fields specification of the form.
   */
  _fields: any;
  get fields() {
    return this._fields;
  }

  _container: Container;
  get container(): Container {
    return this._container;
  }

  _string: string | null = null;
  get string(): string | null {
    return this._string;
  }

  /**
   * Widget type
   */
  _type: string = "form";
  get type(): string {
    return this._type;
  }

  /**
   * Determines if form is read only (default is false)
   */
  _readOnly: boolean = false;
  get readOnly(): boolean {
    return this._readOnly;
  }
  set readOnly(value: boolean) {
    this._readOnly = value;
  }

  /**
   * Context
   */
  _context: any = {};
  get context(): any {
    return this._context;
  }
  set context(value: any) {
    this._context = value;
  }

  /**
   * Collection of onChange actions for fields
   */
  _onChangeFields: any = {};
  get onChangeFields(): any {
    return this._onChangeFields;
  }
  set onChangeFields(value: any) {
    this._onChangeFields = value;
  }

  /*
  _widgets = {
    *[Symbol.iterator]() {
      if (this._container && this._container.length) {
        this._container.forEach((item) => {

          // yield item
        });
      }
    }
  };
  get widgets() {
    return this._widgets;
  }
  */

  /**
   * Unique key for container
   */
  _keyIdx: number = 0;
  get keyIdx(): number {
    return this._keyIdx;
  }
  set keyIdx(value: number) {
    this._keyIdx = value;
  }

  constructor(fields: Object, columns: number = 4) {
    this._fields = fields;
    this._container = new Container(columns, 6, false, "root");
  }

  parse(xml: string, options?: FormParseOptions) {
    const { values = {}, readOnly = false } = options || {};
    const view = txml
      .parse(xml)
      .filter((el: ParsedNode) => el.tagName === "form")[0];
    this._string = view.attributes?.string || null;
    if (this._string) {
      this._string = replaceEntities(this._string);
    }
    this._readOnly = readOnly;
    this._context = values["id"]
      ? { active_id: values["id"], active_ids: [values["id"]] }
      : {};
    this.parseNode({
      fields: view.children,
      container: this._container,
      values,
    });
  }

  parseNode({
    fields,
    container,
    values,
  }: {
    fields: ParsedNode[];
    container: Container;
    values: any;
  }) {
    const widgetFactory = new WidgetFactory();

    fields.forEach((field) => {
      const { tagName, attributes, children } = field;
      let widgetType = tagName;
      let tagAttributes = attributes;
      if (tagName === "field") {
        const { name, widget } = attributes;
        if (widget) {
          widgetType = widget;
        } else if (name) {
          if (!this._fields[name]) {
            throw new Error(`Field ${name} doesn't exist in fields defintion`);
          }
          widgetType = this._fields[name].type;
        }
        tagAttributes = {
          ...this._fields[name],
          ...attributes,
          fieldsWidgetType: this._fields[name].type,
        };
      }
      const evaluatedTagAttributes = evaluateAttributes({
        tagAttributes,
        values,
        fields: this._fields,
      });
      let evaluatedStateAttributes;

      if (tagName === "button" && tagAttributes.states) {
        evaluatedStateAttributes = evaluateButtonStates({
          states: tagAttributes.states,
          values,
        });
      } else {
        evaluatedStateAttributes = evaluateStates({
          fieldName: tagAttributes.name,
          values,
          fields: this._fields,
        });
      }

      const widgetContext = parseContext({
        context:
          tagAttributes["context"] ||
          this._fields[tagAttributes.name]?.["context"],
        values,
        fields: this._fields,
      });

      if (tagAttributes["on_change"]) {
        this._onChangeFields[tagAttributes.name] = parseOnChange(
          tagAttributes["on_change"]
        );
      }

      let domain: string | undefined = undefined;

      if (
        tagAttributes["domain"] &&
        tagAttributes["domain"] !== "" &&
        tagAttributes["domain"] !== "[]"
      ) {
        domain = tagAttributes["domain"];
      }

      if (
        this._fields[tagAttributes.name] &&
        this._fields[tagAttributes.name].domain &&
        this._fields[tagAttributes.name].domain !== "" &&
        this._fields[tagAttributes.name].domain !== "[]"
      ) {
        domain = this._fields[tagAttributes.name].domain;
      }

      this._keyIdx = this._keyIdx + 1;

      const widget = widgetFactory.createWidget(widgetType, {
        ...evaluatedTagAttributes,
        ...evaluatedStateAttributes,
        context: widgetContext,
        domain,
        key: `${this._keyIdx}`,
      });

      if (widget instanceof ContainerWidget) {
        this.parseNode({
          fields: children,
          container: widget.container,
          values,
        });
      }

      // If the form is set to readonly, reflect it to its children
      widget.readOnly = widget.readOnly || this.readOnly;
      container.addWidget(widget);
    });
  }

  /**
   * Calls container's findById method to find the widgets matching with param id
   * @param {string} id id to find
   */
  findById(id: string): Widget | null {
    return this.container.findById(id);
  }
}

export default Form;
