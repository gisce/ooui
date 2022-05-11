export type Axis = "x" | "y";

export class GraphAxis {
  _name: string;
  get name(): string {
    return this._name;
  }

  _axis: Axis;
  get axis(): Axis {
    return this._axis;
  }

  constructor({ name, axis }: { name: string; axis: Axis }) {
    this._name = name;
    this._axis = axis;
  }
}
