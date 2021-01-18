import Field from "./Field";
/**
 * Integer input
 */
declare class Integer extends Field {
    /**
     * Label
     */
    _label: string;
    get label(): string;
    set label(value: string);
    constructor(props: any);
}
export default Integer;
