import Field from "./Field";
declare class Label extends Field {
    /**
     * Label text
     */
    _text: string;
    get text(): string;
    set text(value: string);
    constructor(props: any);
}
export default Label;
