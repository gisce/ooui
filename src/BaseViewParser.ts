import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import ContainerWidget from "./ContainerWidget";
import Widget from "./Widget";
import { ParsedNode } from "./helpers/nodeParser";
import {
  evaluateAttributes,
  replaceEntities,
  parseWidgetProps,
} from "./helpers/attributeParser";
import { evaluateStates, evaluateButtonStates } from "./helpers/stateParser";
import { parseContext } from "./helpers/contextParser";
import { parseOnChange } from "./helpers/onChangeParser";
import Field from "./Field";
import Button from "./Button";
import { flattenContainer } from "./helpers/widgetHelper";

export type BaseViewParseOptions = {
  readOnly?: boolean;
  values?: any;
};

abstract class BaseViewParser {
  /**
   * Object containing fields specification of the view.
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
  abstract _type: string;
  get type(): string {
    return this._type;
  }

  /**
   * Determines if view is read only (default is false)
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

  /**
   * List of invisible fields
   */
  _invisibleFields: string[] = [];
  get invisibleFields(): string[] {
    return this._invisibleFields;
  }

  set invisibleFields(value: string[]) {
    this._invisibleFields = value;
  }

  /**
   * List of autorefreshable fields
   */
  _autorefreshableFields: string[] = [];
  get autorefreshableFields(): string[] {
    return this._autorefreshableFields;
  }

  /**
   * Context for each field in the view
   */
  _contextForFields: Record<string, any> = {};
  get contextForFields(): Record<string, any> {
    return this._contextForFields;
  }

  set contextForFields(value: Record<string, any>) {
    this._contextForFields = value;
  }

  constructor(fields: Object, columns: number = 4) {
    this._fields = fields;
    this._container = new Container(columns, 6, false, "root");
  }

  protected parseViewAttributes(view: ParsedNode): void {
    this._string = view.attributes?.string || null;
    if (this._string) {
      this._string = replaceEntities(this._string);
    }
  }

  protected initializeContext(values: any): void {
    this._context = values.id
      ? { active_id: values.id, active_ids: [values.id] }
      : {};
    this._invisibleFields = [];
  }

  protected extractContextAndAutorefresh(): void {
    // For each widget in the view, we get the context and put it in the contextForFields object
    const allWidgets = flattenContainer(this._container._rows);

    allWidgets.forEach((widget) => {
      const unknownWidget = widget as any;
      if (unknownWidget._id && unknownWidget._context) {
        this._contextForFields[unknownWidget._id] = widget._context;
      }
    });

    // Also we store all the autorefreshables fields in a list
    this._autorefreshableFields = allWidgets
      .filter((widget) => widget instanceof Field && widget.autoRefresh)
      .map((field) => (field as Field)._id);
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
    fields
      .filter((f) => typeof f === "object")
      .forEach((field) => {
        const { tagName, attributes, children } = field;
        let widgetType = tagName;
        let tagAttributes = attributes;
        if (tagName === "field") {
          const { name, widget } = attributes;
          if (widget) {
            widgetType = widget;
          } else if (name) {
            if (!this._fields[name]) {
              throw new Error(
                `Field ${name as string} doesn't exist in fields defintion`,
              );
            }
            widgetType = this._fields[name].type;
            // Merge _fields[widget_props] with attributes[widget_props]
            attributes.widget_props = {
              ...parseWidgetProps(attributes.widget_props),
              ...(this._fields[name].widget_props || {}),
            };
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
          widgetType: tagName,
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
            tagAttributes.context || this._fields[tagAttributes.name]?.context,
          values,
          fields: this._fields,
        });

        if (tagAttributes.on_change) {
          this._onChangeFields[tagAttributes.name] = parseOnChange(
            tagAttributes.on_change,
          );
        }

        let domain: string | undefined;

        if (checkIfDomainHasValue(tagAttributes.domain)) {
          domain = tagAttributes.domain;
        } else if (
          checkIfDomainHasValue(this._fields[tagAttributes.name]?.domain)
        ) {
          domain = this._fields[tagAttributes.name].domain;
        }

        this._keyIdx = this._keyIdx + 1;

        const widgetProps = {
          ...evaluatedTagAttributes,
          ...evaluatedStateAttributes,
          context: widgetContext,
          domain,
          key: `${this._keyIdx}`,
        };

        if (container.readOnly) {
          widgetProps.readonly = true;
        }

        const widget = widgetFactory.createWidget(widgetType, widgetProps);

        if (widget.invisible && widget instanceof Field) {
          this._invisibleFields.push(widgetProps.name);
        }

        if (widget instanceof ContainerWidget) {
          this.parseNode({
            fields: children,
            container: widget.container,
            values,
          });
        }

        // If the widget is a button and has a readonly attribute specified
        // reflect it to the widget independently of the view readonly attribute
        if (widget instanceof Button && widget.readOnly !== undefined) {
          // widget.readOnly = widget.readOnly;
        } else {
          // If the view is set to readonly, reflect it to its children
          widget.readOnly = widget.readOnly || this.readOnly;
        }

        container.addWidget(widget);
      });
  }

  /**
   * Calls container's findById method to find the widgets matching with param id
   * @param {string} id id to find
   */
  findById(id: string): Field | Widget | null {
    return this.container.findById(id);
  }
}

function checkIfDomainHasValue(domain: any) {
  if (!domain) {
    return false;
  }
  if (Array.isArray(domain) && domain.length > 0) {
    return true;
  } else if (typeof domain === "string" && domain !== "" && domain !== "[]") {
    return true;
  }
  return false;
}

export default BaseViewParser;
