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
     * No label
     *
     * This field hasn't got to show the label
     *
     */
    _nolabel: boolean;
    get nolabel(): boolean;
    set nolabel(value: boolean);
    /**
     *
     * Required field
     *
     */
    _required: boolean;
    get required(): boolean;
    set required(value: boolean);
    /**
     * Tooltip
     */
    _tooltip?: string;
    get tooltip(): string | undefined;
    set tooltip(value: string | undefined);
    /**
     * Activated (default is true)
     */
    _activated: boolean;
    get activated(): boolean;
    set activated(value: boolean);
    /**
     * Sum - sum parameter (label), this will mean that we have to sum this field in the tree
     */
    _sum?: string;
    get sum(): string | undefined;
    set sum(value: string | undefined);
    constructor(props: any);
    /**
     * Returns this instance in case this id matches param id.
     * @param {string} id id (name) to find
     */
    findById(id: string): Field | null;
}
export default Field;
