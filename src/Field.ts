import Widget from "./Widget";
import { parseDomain } from "./helpers/domainParser";

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
   * Domain
   */
  _domain?: Array<any[]>;
  get domain(): Array<any[]> | undefined {
    return this._domain;
  }
  set domain(value: Array<any[]> | undefined) {
    this._domain = value;
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
        this._label = props.string;
      }

      if (props.help) {
        this._tooltip = props.help;
      }

      if (props.domain) {
        this._domain = parseDomain(props.domain);
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
    }
  }

  /**
   * Returns this instance in case this id matches param id.
   * @param {string} id id (name) to find
   */
  findById(id: string): Field | null {
    let r: Field | null = null;
    if (this._id === id) {
      r = this;
    }
    return r;
  }
}

export default Field;
