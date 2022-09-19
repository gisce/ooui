import { Operator } from ".";
import { GraphType } from "./Graph";
import { GraphIndicator } from "./GraphIndicator";

export class GraphIndicatorField extends GraphIndicator {
  _field: string | undefined;
  get field(): string | undefined {
    return this._field;
  }

  _operator: Operator | undefined;
  get operator(): Operator | undefined {
    return this._operator;
  }

  constructor(type: GraphType, element: any) {
    super(type, element);

    const { children } = element;
    children.forEach((item: any) => {
      if (item.tagName === "field") {
        const name = item.attributes.name;
        const operator = item.attributes.operator;
        this._field = name || undefined;
        this._operator = operator as Operator;
      }
    });
  }
}
