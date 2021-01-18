import Field from "./Field";
/**
 * FloatTime input
 */
declare class FloatTime extends Field {
    /**
     * Label
     */
    _label: string;
    get label(): string;
    set label(value: string);
    constructor(props: any);
}
export default FloatTime;
