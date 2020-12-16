import Widget from "./Widget";

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
