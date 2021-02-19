import Field from "./Field";
/**
 * Float input
 */
declare class Float extends Field {
    /**
     * Integer digits
     *
     * Number of integer digits that will be part of the float
     */
    _integerDigits: number;
    get integerDigits(): number;
    set integerDigits(value: number);
    /**
     * Decimal digits
     *
     * Number of decimal digits that will be part of the float
     */
    _decimalDigits: number;
    get decimalDigits(): number;
    set decimalDigits(value: number);
    constructor(props?: any);
}
export default Float;
