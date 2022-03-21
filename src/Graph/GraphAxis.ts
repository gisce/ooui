export type Axis = "x" | "y";
export type Operator = "+";

export class GraphAxis {
  _name: string | undefined;
  get name(): string | undefined {
    return this._name;
  }

  _axis: Axis | undefined;
  get axis(): Axis | undefined {
    return this._axis;
  }

  _operator: Operator | undefined;
  get operator(): Operator | undefined {
    return this._operator;
  }

  constructor({
    name,
    axis,
    operator,
  }: {
    name: string;
    axis: Axis;
    operator?: Operator;
  }) {
    this._name = name;
    this._axis = axis;
    this._operator = operator;
  }
}
