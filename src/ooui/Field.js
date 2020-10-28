import Widget from "./Widget";

class Field extends Widget {
    /**
     * Field identifier
     */
    _id;
    
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }

    /**
     * Activated
     */
    _activated;
    
    get activated() {
        return this._activated;
    }
    set activated(value) {
        this._activated = value;
    }
}

export default Field;
