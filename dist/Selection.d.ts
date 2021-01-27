import Field from "./Field";
/**
 * Selection field for key-value lists
 */
declare class Selection extends Field {
    /**
     * Field size
     */
    _size: number;
    get size(): number;
    set size(value: number);
    /**
     * Values and keys
     */
    _selectionValues: Map<string, string>;
    get selectionValues(): Map<string, string>;
    set selectionValues(value: Map<string, string>);
    constructor(props: any);
}
export default Selection;
