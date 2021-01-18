import Field from "./Field";
/**
 * DateTime input
 */
declare class DateTime extends Field {
    /**
     * Label
     */
    _label: string;
    get label(): string;
    set label(value: string);
    constructor(props: any);
}
export default DateTime;
