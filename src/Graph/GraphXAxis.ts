import { GraphAxis } from ".";

export class GraphXAxis extends GraphAxis {
  constructor({ name }: { name: string }) {
    super({ name, axis: "x" });
  }
}
