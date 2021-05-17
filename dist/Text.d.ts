import Field from "./Field";
/**
 * Multiline input with no length limit.
 */
declare class Text extends Field {
    /**
     * Field place holder
     */
    _placeholder: string;
    get placeholder(): string;
    set placeholder(value: string);
    /**
     * Must expand widget
     */
    _mustExpand: boolean;
    get mustExpand(): boolean;
    set mustExpand(value: boolean);
    constructor(props: any);
}
export default Text;
