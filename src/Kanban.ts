import BaseViewParser, { BaseViewParseOptions } from "./BaseViewParser";
import { ParsedNode } from "./helpers/nodeParser";
import * as txml from "txml";

export type KanbanParseOptions = BaseViewParseOptions;

class Kanban extends BaseViewParser {
  /**
   * Widget type
   */
  _type: string = "kanban";

  /**
   * Column field that defines the kanban columns
   */
  _columnField: string | null = null;
  get columnField(): string | null {
    return this._columnField;
  }

  set columnField(value: string | null) {
    this._columnField = value;
  }

  /**
   * Enable drag functionality between columns
   */
  _drag: boolean = true;
  get drag(): boolean {
    return this._drag;
  }

  set drag(value: boolean) {
    this._drag = value;
  }

  /**
   * Enable sort functionality within columns
   */
  _sort: boolean = true;
  get sort(): boolean {
    return this._sort;
  }

  set sort(value: boolean) {
    this._sort = value;
  }

  /**
   * Enable setting max cards per column (WIP limit)
   */
  _setMaxCards: boolean = false;
  get setMaxCards(): boolean {
    return this._setMaxCards;
  }

  set setMaxCards(value: boolean) {
    this._setMaxCards = value;
  }

  /**
   * Color conditions for styling cards. Format: "color:condition"
   */
  _colors: string | null = null;
  get colors(): string | null {
    return this._colors;
  }

  set colors(value: string | null) {
    this._colors = value;
  }

  constructor(fields: Object, columns: number = 4) {
    super(fields, columns);
  }

  parse(xml: string, options?: KanbanParseOptions) {
    const { values = {}, readOnly = false } = options || {};
    const view = txml
      .parse(xml)
      .filter((el: ParsedNode) => el.tagName === "kanban")[0];

    this.parseViewAttributes(view);
    this._readOnly = readOnly;
    this.initializeContext(values);

    // Parse kanban-specific attributes
    this._columnField = view.attributes?.column_field || null;
    this._drag = view.attributes?.drag !== "0";
    this._sort = view.attributes?.sort !== "0";
    this._setMaxCards = view.attributes?.set_max_cards === "1";
    this._colors = view.attributes?.colors || null;

    this.parseNode({
      fields: view.children,
      container: this._container,
      values,
    });

    this.extractContextAndAutorefresh();
  }
}

export default Kanban;
