import Field from "./Field";
/**
 * Date input
 */
declare class Date extends Field {
    /**
     * Label
     */
    _label: string;
    get label(): string;
    set label(value: string);
    constructor(props: any);
}
export default Date;
