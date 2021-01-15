import Field from "./Field";
/**
 * One-line input with a length limit.
 */
declare class Char extends Field {
    /**
     * Field place holder
     */
    _placeholder: string;
    get placeholder(): string;
    set placeholder(value: string);
    /**
     * Field size
     */
    _size: number;
    get size(): number;
    set size(value: number);
    /**
     * Label
     */
    _label: string;
    get label(): string;
    set label(value: string);
    constructor(props: any);
}
export default Char;
