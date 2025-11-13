import WidgetFactory from "./WidgetFactory";
import Widget from "./Widget";
import Button from "./Button";
import { replaceEntities } from "./helpers/attributeParser";
import { parseBoolAttribute, ParsedNode } from "./helpers/nodeParser";
import * as txml from "txml";
import { parseContext } from "./helpers/contextParser";
import { parseOnChange } from "./helpers/onChangeParser";

export type KanbanField = Widget & {
  sum?: string; // Aggregation label (e.g., "Total hours")
};

export type KanbanButton = Button & {
  states?: string; // Comma-separated states where button should show
};

class Kanban {
  /**
   * Object containing fields specification of the kanban.
   */
  _fields: any;
  get fields() {
    return this._fields;
  }

  /**
   * Array of field widgets to display in cards
   */
  _card_fields: KanbanField[] = [];
  get card_fields(): KanbanField[] {
    return this._card_fields;
  }

  /**
   * Array of button widgets to display in cards
   */
  _buttons: KanbanButton[] = [];
  get buttons(): KanbanButton[] {
    return this._buttons;
  }

  _string: string | null = null;
  get string(): string | null {
    return this._string;
  }

  _status: string | null = null;
  get status(): string | null {
    return this._status;
  }

  /**
   * Widget type
   */
  _type: string = "kanban";
  get type(): string {
    return this._type;
  }

  /**
   * Field that defines the columns (e.g., "state")
   */
  _column_field: string = "state";
  get column_field(): string {
    return this._column_field;
  }

  /**
   * Domain for filtering columns (for many2one fields)
   * Example: "[('fold', '!=', True)]"
   */
  _column_domain: string | null = null;
  get column_domain(): string | null {
    return this._column_domain;
  }

  /**
   * Enable dragging cards between columns
   */
  _drag: boolean = true;
  get drag(): boolean {
    return this._drag;
  }

  /**
   * Field name to use for sorting cards within columns
   */
  _sort: string | undefined = undefined;
  get sort(): string | undefined {
    return this._sort;
  }

  /**
   * Enable setting max cards per column (WIP limits)
   */
  _set_max_cards: boolean = false;
  get set_max_cards(): boolean {
    return this._set_max_cards;
  }

  /**
   * Color expression value (e.g., "blue:state=='draft';green:state=='done'")
   */
  _colors: string | null = null;
  get colors(): string | null {
    return this._colors;
  }

  /**
   * Custom function to call when a card moves between columns
   * Example: "handle_state_change" or with args "handle_state_change(field, from, to)"
   * If not defined, the frontend should use the default on_change_column method
   */
  _on_change_column: { method: string; args: string[] } | null = null;
  get on_change_column(): { method: string; args: string[] } | null {
    return this._on_change_column;
  }

  /**
   * Context for each field in the kanban
   */
  _contextForFields: Record<string, any> = {};
  get contextForFields(): Record<string, any> {
    return this._contextForFields;
  }

  set contextForFields(value: Record<string, any>) {
    this._contextForFields = value;
  }

  /**
   * Map of fields that have sum aggregation
   * Key: field name, Value: sum label (e.g., "Total hours")
   */
  _aggregations: Record<string, string> = {};
  get aggregations(): Record<string, string> {
    return this._aggregations;
  }

  constructor(fields: Object) {
    this._fields = fields;
  }

  parse(xml: string) {
    const view = txml
      .parse(xml)
      .filter((el: ParsedNode) => el.tagName === "kanban")[0];

    // Parse kanban attributes
    this._string = view.attributes.string || null;
    if (this._string) {
      this._string = replaceEntities(this._string);
    }

    this._column_field = view.attributes.column_field || "state";
    this._column_domain = view.attributes.column_domain || null;

    this._drag =
      view.attributes.drag !== undefined
        ? parseBoolAttribute(view.attributes.drag)
        : true;
    this._sort = view.attributes.sort || undefined;
    this._set_max_cards =
      view.attributes.set_max_cards !== undefined
        ? parseBoolAttribute(view.attributes.set_max_cards)
        : false;

    this._colors = view.attributes.colors || null;
    if (this._colors) {
      this._colors = replaceEntities(this._colors);
    }

    this._status = view.attributes.status || null;
    if (this._status) {
      this._status = replaceEntities(this._status);
    }

    // Parse on_change_column attribute
    if (view.attributes.on_change_column) {
      this._on_change_column = parseOnChange(view.attributes.on_change_column);
    }

    const widgetFactory = new WidgetFactory();

    // Parse children (fields and buttons)
    view.children.forEach((element: ParsedNode) => {
      const { tagName, attributes } = element;

      if (tagName === "field") {
        this._parseField(element, attributes, widgetFactory);
      } else if (tagName === "button") {
        this._parseButton(element, attributes);
      }
    });
  }

  private _parseField(
    _element: ParsedNode,
    attributes: any,
    widgetFactory: WidgetFactory,
  ) {
    const { name, widget, sum } = attributes;

    if (!name) {
      return;
    }

    if (!this._fields[name]) {
      throw new Error(`Field ${name} doesn't exist in fields definition`);
    }

    const fieldDef = this._fields[name];
    let widgetType = fieldDef.type;

    // Handle domain override
    if (
      ((Array.isArray(fieldDef?.domain) && fieldDef?.domain.length === 0) ||
        fieldDef?.domain === false) &&
      attributes.domain &&
      attributes.domain.length > 0
    ) {
      delete fieldDef.domain;
    }

    // Parse context
    const widgetContext = parseContext({
      context: attributes.context || fieldDef.context,
      values: {},
      fields: this._fields,
    });

    const mergedAttrs = {
      ...fieldDef,
      ...attributes,
      fieldsWidgetType: fieldDef?.type,
      context: widgetContext,
    };

    this._contextForFields[name] = widgetContext;

    // Override widget type if specified
    if (widget) {
      widgetType = widget;
    }

    // Create the widget
    if (!mergedAttrs.invisible) {
      const fieldWidget = widgetFactory.createWidget(
        widgetType,
        mergedAttrs,
      ) as KanbanField;

      // Handle aggregation (sum)
      if (sum) {
        fieldWidget.sum = replaceEntities(sum);
        this._aggregations[name] = replaceEntities(sum);
      }

      this._card_fields.push(fieldWidget);
    }
  }

  private _parseButton(_element: ParsedNode, attributes: any) {
    const { name, type, string, states } = attributes;

    if (!name) {
      return;
    }

    const buttonProps = {
      ...attributes,
      name,
      buttonType: type || "object",
      string: string || "",
    };

    const button = new Button(buttonProps) as KanbanButton;

    // Parse states attribute (e.g., "draft,open")
    if (states) {
      button.states = states;
    }

    this._buttons.push(button);
  }

  /**
   * Find the widgets matching with param id
   * @param {string} id id to find
   */
  findById(id: string): Widget | null {
    const foundField = this._card_fields.find((item) => {
      if (item.findById) {
        return item.findById(id);
      }
      return false;
    });

    if (foundField) {
      return foundField;
    }

    const foundButton = this._buttons.find((item) => {
      if (item.findById) {
        return item.findById(id);
      }
      return false;
    });

    return foundButton || null;
  }
}

export default Kanban;
