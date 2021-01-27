import Field from "./Field";
declare class Button extends Field {
    /**
     * Type (primary or default)
     */
    _type: "primary" | "default";
    get type(): "primary" | "default";
    set type(value: "primary" | "default");
    /**
     * Button caption
     */
    _caption: string;
    get caption(): string;
    set caption(value: string);
    constructor(props: any);
}
export default Button;
