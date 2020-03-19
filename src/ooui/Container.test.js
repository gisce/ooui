import Container from "./Container";

class Widget {
  constructor(id, colspan = 1) {
    this.id = id;
    this.colspan = colspan;
  }
}

describe("A container", () => {
  it("should have 4 columns as default", () => {
    const cont = new Container();
    expect(cont.columns).toEqual(4);
    expect(cont.rows.length).toEqual(1);
  });

  it("should add widgets", () => {
    const cont = new Container(2);
    const w1 = new Widget(1);

    cont.addWidget(w1);
    expect(cont.rows[0][0]).toEqual(w1);

    const w2 = new Widget(2);
    cont.addWidget(w2);
    expect(cont.rows[0][1]).toEqual(w2);

    const w3 = new Widget(3);
    cont.addWidget(w3);
    expect(cont.index).toEqual(1);
    expect(cont.rows[1][0]).toEqual(w3);

    const w4 = new Widget(4, 2);
    cont.addWidget(w4);
    expect(cont.index).toEqual(2);
    expect(cont.rows[2][0]).toEqual(w4);

    const w5 = new Widget(5);
    cont.addWidget(w5);
    expect(cont.index).toEqual(3);
    expect(cont.rows[3][0]).toEqual(w5);
  });
});
