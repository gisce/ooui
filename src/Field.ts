import Widget from "./Widget";
import { replaceEntities, isTrue } from "./helpers/attributeParser";

class Field extends Widget {
  /**
   * Field identifier
   *
   * Corresponds to the field's name attribute from xml
   */
  _id: string = "";
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  /**
   * Label
   */
  _label: string = "";
  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  /**
   * No label
   *
   * This field hasn't got to show the label
   *
   */
  _nolabel: boolean = false;
  get nolabel(): boolean {
    return this._nolabel;
  }

  set nolabel(value: boolean) {
    this._nolabel = value;
  }

  /**
   *
   * Required field
   *
   */
  _required: boolean = false;
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = value;
  }

  /**
   * Tooltip
   */
  _tooltip?: string;
  get tooltip(): string | undefined {
    return this._tooltip;
  }

  set tooltip(value: string | undefined) {
    this._tooltip = value;
  }

  /**
   * Tooltip inline
   */
  _tooltipInline: boolean = false;
  get tooltipInline(): boolean {
    return this._tooltipInline;
  }

  set tooltipInline(value: boolean) {
    this._tooltipInline = value;
  }

  /**
   * Activated (default is true)
   */
  _activated: boolean = true;
  get activated(): boolean {
    return this._activated;
  }

  set activated(value: boolean) {
    this._activated = value;
  }

  /**
   * Sum - sum parameter (label), this will mean that we have to sum this field in the tree
   */
  _sum?: string;
  get sum(): string | undefined {
    return this._sum;
  }

  set sum(value: string | undefined) {
    this._sum = value;
  }

  /**
   * Values and keys
   */
  _selectionValues: Map<string, string> = new Map([]);
  get selectionValues(): Map<string, string> {
    return this._selectionValues;
  }

  set selectionValues(value: Map<string, string>) {
    this._selectionValues = value;
  }

  constructor(props: any) {
    super(props);

    // Activated by default
    this._activated = true;

    if (props) {
      if (props.name) {
        this._id = props.name;
      }

      if (props.activated) {
        this._activated = props.activated;
      }

      if (props.string) {
        this._label = replaceEntities(props.string);
      }

      if (props.help) {
        this._tooltip = replaceEntities(props.help);
      }

      if (
        props.nolabel &&
        (props.nolabel === "1" ||
          (typeof props.nolabel === "boolean" && props.nolabel === true))
      ) {
        this._nolabel = true;
      }

      if (
        props.required &&
        (props.required === "1" ||
          props.required === true ||
          props.required === "True")
      ) {
        this._required = true;
      }

      if (props.sum) {
        this._sum = replaceEntities(props.sum);
      }

      if (props.selection) {
        this._selectionValues = new Map(props.selection);
      }

      if (props.help_inline) {
        this.tooltipInline = isTrue(props.help_inline);
      }
    }
  }

  /**
   * Returns this instance in case this id matches param id.
   * @param {string} id id (name) to find
   */
  findById(id: string): Field | null {
    if (this._id === id) {
      return this;
    }
    return null;
  }
}

export default Field;
