import Field from "./Field";
declare class Label extends Field {
    /**
     * Label text
     */
    _text: string;
    get text(): string;
    set text(value: string);
    /**
     * Align text
     */
    _align: string;
    get align(): string;
    set align(value: string);
    /**
     * Id of the field that this label goes with. Null if it's an independent label
     */
    _fieldForLabel: string | null;
    get fieldForLabel(): string | null;
    set fieldForLabel(value: string | null);
    constructor(props?: any);
}
export default Label;
