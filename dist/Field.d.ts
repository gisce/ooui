import Widget from "./Widget";
declare type OnChangeData = {
    method: string;
    args: any;
};
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
     * Domain
     */
    _domain?: Array<any[]>;
    get domain(): Array<any[]> | undefined;
    set domain(value: Array<any[]> | undefined);
    /**
     * Activated (default is true)
     */
    _activated: boolean;
    get activated(): boolean;
    set activated(value: boolean);
    /**
     * OnChangeData
     */
    _onChangeData?: OnChangeData;
    get onChangeData(): OnChangeData | undefined;
    set onChangeData(value: OnChangeData | undefined);
    constructor(props: any);
    /**
     * Returns this instance in case this id matches param id.
     * @param {string} id id (name) to find
     */
    findById(id: string): Field | null;
}
export default Field;
