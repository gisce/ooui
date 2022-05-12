import { GraphAxis } from ".";

export type Operator = "count" | "+" | "-" | "*" | "min" | "max" | "avg";

export class GraphYAxis extends GraphAxis {
  _operator: Operator;
  get operator(): Operator {
    return this._operator;
  }

  _label: string | undefined;
  get label(): string | undefined {
    return this._label;
  }

  _stacked: string | undefined;
  get stacked(): string | undefined {
    return this._stacked;
  }

  constructor({
    name,
    operator,
    label,
    stacked,
  }: {
    name: string;
    operator: Operator;
    label?: string;
    stacked?: string;
  }) {
    super({ name, axis: "y" });
    this._operator = operator!;
    this._label = label;
    this._stacked = stacked;
  }
}
