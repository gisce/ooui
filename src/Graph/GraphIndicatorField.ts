import { Operator } from ".";
import { GraphType } from "./Graph";
import { GraphIndicator } from "./GraphIndicator";
import { ParsedNode } from "../helpers/nodeParser";

export class GraphIndicatorField extends GraphIndicator {
  _field: string | undefined;
  get field(): string | undefined {
    return this._field;
  }

  _operator: Operator | undefined;
  get operator(): Operator | undefined {
    return this._operator;
  }

  constructor(type: GraphType, element: ParsedNode) {
    super(type, element);

    const { children } = element;
    children.forEach((item) => {
      if (item.tagName === "field") {
        const name = item.attributes.name;
        const operator = item.attributes.operator;
        this._field = name || undefined;
        this._operator = operator as Operator;
      }
    });
  }
}
