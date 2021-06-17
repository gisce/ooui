import Field from "./Field";
declare class Button extends Field {
    /**
     * Type
     */
    _buttonType: "workflow" | "action" | "object" | "cancel";
    get buttonType(): "object" | "workflow" | "action" | "cancel";
    set buttonType(value: "object" | "workflow" | "action" | "cancel");
    /**
     * Button caption
     */
    _caption: string;
    get caption(): string;
    set caption(value: string);
    /**
     * Confirm string for modal in button types workflow
     */
    _confirmMessage: string;
    get confirmMessage(): string;
    set confirm(value: string);
    constructor(props: any);
}
export default Button;
