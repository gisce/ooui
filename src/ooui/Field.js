import Widget from "./Widget";

class Field extends Widget {
  /**
   * Field identifier
   * 
   * Corresponds to the field's name attribute from xml
   */
  _id;
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  /**
   * Activated (default is true)
   */
  _activated = true;
  get activated() {
    return this._activated;
  }
  set activated(value) {
    this._activated = value;
  }

  constructor(props) {
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
  findById(id) {
    let r;
    if (this._id === id) {
      r = this;
    }
    return r;
  }
}

export default Field;
