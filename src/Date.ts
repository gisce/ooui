import Field from "./Field";

/**
 * Date input
 */
class Date extends Field {
  _timezone: string | undefined = undefined;

  get timezone(): string | undefined {
    return this._timezone;
  }

  set timezone(value: string | undefined) {
    this._timezone = value;
  }

  constructor(props?: { timezone?: string } & any) {
    super(props);
    this._timezone = props?.timezone || undefined;
  }
}

export default Date;
