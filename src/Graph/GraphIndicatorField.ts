import { Operator } from ".";
import { GraphType } from "./Graph";
import { GraphIndicator } from "./GraphIndicator";

export class GraphIndicatorField extends GraphIndicator {
  _field: string | null = null;
  get field(): string | null {
    return this._field;
  }

  _operator: Operator | null = null;
  get operator(): Operator | null {
    return this._operator;
  }

  constructor(type: GraphType, element: HTMLElement) {
    super(type, element);

    Array.prototype.forEach.call(element.childNodes, (child: Element) => {
      if (child.nodeType === child.ELEMENT_NODE && child.nodeName === "field") {
        const name = child.getAttribute("name");
        const operator = child.getAttribute("operator");
        this._field = name;
        this._operator = operator as Operator;
      }
    });
  }
}
