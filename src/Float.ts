import Field from "./Field";

/**
 * Float input
 */
class Float extends Field {

  /**
   * Integer digits
   *
   * Number of integer digits that will be part of the float
   */
  _integerDigits: number = 16;
  get integerDigits(): number {
    return this._integerDigits;
  }
  set integerDigits(value: number) {
    this._integerDigits = value;
  }

  /**
   * Decimal digits
   *
   * Number of decimal digits that will be part of the float
   */
  _decimalDigits: number = 2;
  get decimalDigits(): number {
    return this._decimalDigits;
  }
  set decimalDigits(value: number) {
    this._decimalDigits = value;
  }

  constructor(props?: any) {
    super(props);

    if (props?.digits) {
      const [integers, decimals] = props.digits;
      this._integerDigits = integers;
      this._decimalDigits = decimals;
    }
  }
}

export default Float;
