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
     * Label
     */
    _label: string;
    get label(): string;
    set label(value: string);
    constructor(props: any);
}
export default Text;
