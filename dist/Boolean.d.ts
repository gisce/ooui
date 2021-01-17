import Field from "./Field";
/**
 * Boolean input
 */
declare class Boolean extends Field {
    /**
     * Label
     */
    _label: string;
    get label(): string;
    set label(value: string);
    constructor(props: any);
}
export default Boolean;
