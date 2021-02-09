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
   * Invisible
   */
    _invisible: boolean;
    get invisible(): boolean;
    set invisible(value: boolean);
    constructor(props: any);
}
export default Char;
