export type Axis = "x" | "y";
export type Operator = "count" | "+" | "-" | "*" | "min" | "max" | "avg";

export class GraphAxis {
  _name: string;
  get name(): string {
    return this._name;
  }

  _axis: Axis;
  get axis(): Axis {
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
    label?: string;
  }) {
    this._name = name;
    this._axis = axis;
    this._operator = operator;
    this._label = label;
  }
}
