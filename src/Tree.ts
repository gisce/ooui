import WidgetFactory from "./WidgetFactory";
import Widget from "./Widget";
import { replaceEntities } from "./helpers/attributeParser";
import { ParsedNode } from "./helpers/nodeParser";
import * as txml from "txml";
import { parseContext } from "./helpers/contextParser";

type EditableTreeOptions = "top" | " bottom" | null;

class Tree {
  /**
   * Object containing fields specification of the form.
   */
  _fields: any;
  get fields() {
    return this._fields;
  }

  _columns: any[] = [];
  get columns(): any[] {
    return this._columns;
  }

  _string: string | null = null;
  get string(): string | null {
    return this._string;
  }

  /**
   * Widget type
   */
  _type: string = "tree";
  get type(): string {
    return this._type;
  }

  /**
   * Color expression value
   */
  _colors: string | null = null;
  get colors(): string | null {
    return this._colors;
  }

  _status: string | null = null;
  get status(): string | null {
    return this._status;
  }

  /**
   * Editable value
   */
  _editable: EditableTreeOptions = null;
  get editable(): EditableTreeOptions {
    return this._editable;
  }

  /**
   * Context for each field in the form
   */
  _contextForFields: Record<string, any> = {};
  get contextForFields(): Record<string, any> {
    return this._contextForFields;
  }

  set contextForFields(value: Record<string, any>) {
    this._contextForFields = value;
  }

  constructor(fields: Object) {
    this._fields = fields;
  }

  parse(xml: string) {
    const view = txml
      .parse(xml)
      .filter((el: ParsedNode) => el.tagName === "tree")[0];
    this._string = view.attributes.string || null;
    if (this._string) {
      this._string = replaceEntities(this._string);
    }
    this._colors = view.attributes.colors || null;
    if (this._colors) {
      this._colors = replaceEntities(this._colors);
    }
    this._status = view.attributes.status || null;
    if (this._status) {
      this._status = replaceEntities(this._status);
    }
    this._editable = view.attributes.editable || null;
    const widgetFactory = new WidgetFactory();
    view.children.forEach((field: ParsedNode) => {
      const { tagName, attributes } = field;
      let widgetType = null;
      if (tagName === "field") {
        const { name, widget } = attributes;
        let mergedAttrs = attributes;
        if (name) {
          if (!this._fields[name]) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`Field ${name} doesn't exist in fields defintion`);
          }
          const fieldDef = this._fields[name];
          widgetType = fieldDef.type;
          if (
            ((Array.isArray(fieldDef?.domain) &&
              fieldDef?.domain.length === 0) ||
              fieldDef?.domain === false) &&
            attributes.domain &&
            attributes.domain.length > 0
          ) {
            delete fieldDef.domain;
          }
          const widgetContext = parseContext({
            context: attributes.context || fieldDef.context,
            values: {},
            fields: this._fields,
          });
          mergedAttrs = {
            ...fieldDef,
            ...attributes,
            fieldsWidgetType: fieldDef?.type,
            context: widgetContext,
          };
          this._contextForFields[name] = widgetContext;
        }
        if (widget) {
          widgetType = widget;
        }

        if (!mergedAttrs.invisible) {
          const widget = widgetFactory.createWidget(widgetType, mergedAttrs);
          this._columns.push(widget);
        }
      }
    });
  }

  /**
   * Find the widgets matching with param id
   * @param {string} id id to find
   */
  findById(id: string): Widget | null {
    return this._columns.find((item) => {
      if (item.findById) {
        return item.findById(id);
      }
      return false;
    });
  }
}

export default Tree;
