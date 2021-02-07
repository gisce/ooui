import Widget from "./Widget";
declare class Field extends Widget {
    /**
     * Field identifier
     *
     * Corresponds to the field's name attribute from xml
     */
    _id: string;
    get id(): string;
    set id(value: string);
    /**
     * Label
     */
    _label: string;
    get label(): string;
    set label(value: string);
    /**
     * Activated (default is true)
     */
    _activated: boolean;
    get activated(): boolean;
    set activated(value: boolean);
    constructor(props: any);
    /**
     * Returns this instance in case this id matches param id.
     * @param {string} id id (name) to find
     */
    findById(id: string): Field | null;
}
export default Field;
