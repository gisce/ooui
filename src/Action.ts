class Action {
  _name: string | null = null;
  get name(): string | null {
    return this._name;
  }

  _parms: string | null = null;
  get parms(): string | null {
    return this._parms;
  }

  constructor(attributes: any) {
    if (attributes.name) {
      this._name = attributes.name;
    }

    if (attributes.parms) {
      this._parms = attributes.parms;
    }
  }
}

export default Action;
