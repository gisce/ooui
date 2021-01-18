import Field from "./Field";
/**
 * Float input
 */
declare class Float extends Field {
    /**
     * Label
     */
    _label: string;
    get label(): string;
    set label(value: string);
    constructor(props: any);
}
export default Float;
