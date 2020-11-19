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
}

export default Field;
