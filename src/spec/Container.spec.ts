import Container from "../Container";
import WidgetImpl from "./fixtures/WidgetImpl";
import { it, expect, describe } from "vitest";

describe("A container", () => {
  it("should have 4 columns as default", () => {
    const cont = new Container();
    expect(cont.columns).toEqual(4);
    expect(cont.rows.length).toEqual(1);
  });

  it("should add widgets", () => {
    const cont = new Container(2);
    const w1 = new WidgetImpl({ name: "1" });

    cont.addWidget(w1);
    expect(cont.rows[0][0]).toEqual(w1);

    const w2 = new WidgetImpl({ name: "2" });
    cont.addWidget(w2);
    expect(cont.rows[0][1]).toEqual(w2);

    const w3 = new WidgetImpl({ name: "3" });
    cont.addWidget(w3);
    expect(cont.index).toEqual(1);
    expect(cont.rows[1][0]).toEqual(w3);

    const w4 = new WidgetImpl({ name: "4", colspan: 2 });
    cont.addWidget(w4);
    expect(cont.index).toEqual(2);
    expect(cont.rows[2][0]).toEqual(w4);

    const w5 = new WidgetImpl({ name: "5" });
    cont.addWidget(w5);
    expect(cont.index).toEqual(3);
    expect(cont.rows[3][0]).toEqual(w5);
  });

  it("should don't count colspans of invisible widgets", () => {
    const cont = new Container(4);
    const w1 = new WidgetImpl({ colspan: 2 });
    const w2 = new WidgetImpl({ colspan: 2, invisible: true });
    cont.addWidget(w1);
    cont.addWidget(w2);
    expect(cont.freePosition()).toEqual(2);
    expect(cont.rows[0].length).toEqual(2);
  });
});
