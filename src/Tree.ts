import WidgetFactory from "./WidgetFactory";
import Widget from "./Widget";
import { parseNodes, parseBoolAttribute } from "./helpers/nodeParser";
import * as txml from 'txml';

type EditableTreeOptions = "top" | " bottom" | null;

class Tree {
  /**
   * Object containing fields specification of the form.
   */
  _fields: any;
  get fields() {
    return this._fields;
  }

  _columns: Array<any> = [];
  get columns(): Array<any> {
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

  /**
   * Editable value
   */
  _editable: EditableTreeOptions = null;
  get editable(): EditableTreeOptions {
    return this._editable;
  }

  constructor(fields: Object) {
    this._fields = fields;
  }

  parse(xml: string) {
    const view = txml.parse(xml).filter((el: any) => el.tagName === "tree")[0];
    this._string = view.attributes.string || null;
    this._colors = view.attributes.colors || null;
    this._editable = view.attributes.editable || null;
    const widgetFactory = new WidgetFactory();
    view.children.forEach((field: any) => {
      const { tagName, attributes } = field;
      let widgetType = null;
      if (tagName === "field") {
        const { name, widget} = attributes;
        if (widget) {
          widgetType = widget;
        } else if (name) {
          if (!this._fields[name]) {
            throw new Error(`Field ${name} doesn't exist in fields defintion`);
          }
          const fieldDef = this._fields[name];
          widgetType = fieldDef.type;
          const invisible = parseBoolAttribute(attributes.invisible || fieldDef?.invisible);
          if (
            ((Array.isArray(fieldDef?.domain) &&
              fieldDef?.domain.length === 0) ||
              fieldDef?.domain === false) &&
              attributes["domain"] &&
              attributes["domain"].length > 0
          ) {
            delete fieldDef.domain;
          }
          const mergedAttrs = {
            ...fieldDef,
            ...attributes,
            fieldsWidgetType: fieldDef?.type,
          };
          if (!invisible) {
            const widget = widgetFactory.createWidget(widgetType, mergedAttrs);
            this._columns.push(widget);
          }
        }
      }
    })
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
    });
  }
}

export default Tree;
