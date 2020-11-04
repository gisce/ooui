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

  constructor(type, props) {
    super(type);

    if (props) {
      if (props.name) {
        this._id = props.name;
      }
    }
  }
}

export default Field;
