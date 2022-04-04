export type Axis = "x" | "y";
export type Operator = "count" | "+" | "-" | "*" | "min" | "max" | "avg";

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

  _label: string | undefined;
  get label(): string | undefined {
    return this._label;
  }

  constructor({
    name,
    axis,
    operator,
    label,
  }: {
    name: string;
    axis: Axis;
    operator?: Operator;
    label: string | undefined;
  }) {
    this._name = name;
    this._axis = axis;
    this._operator = operator;
    this._label = label;
  }
}
