import Group from "../Group";
import WidgetImpl from "./fixtures/WidgetImpl";
import WidgetFactory from "../WidgetFactory";

describe("A Group", () => {
  it("should be constructed with 4 columns and a colspan of 4", () => {
    const group4 = new Group({ col: 4, colspan: 4 });
    expect(group4.colspan).toBe(4);
    expect(group4.container.columns).toBe(4);
  });
  it("should be constructed with 6 columns and a colspan of 2", () => {
    const group4 = new Group({ col: 6, colspan: 2 });
    expect(group4.colspan).toBe(2);
    expect(group4.container.columns).toBe(6);
  });
  it("should have 1 rows if 4 items", () => {
    const group4 = new Group({ col: 4, colspan: 4 });
    group4.container.addWidget(new WidgetImpl({ name: "1" }));
    group4.container.addWidget(new WidgetImpl({ name: "2" }));
    group4.container.addWidget(new WidgetImpl({ name: "3" }));
    group4.container.addWidget(new WidgetImpl({ name: "4" }));
    expect(group4.container.rows.length).toBe(1);
  });
  it("should have 2 rows if 5 items", () => {
    const group4 = new Group({ col: 4, colspan: 4 });
    group4.container.addWidget(new WidgetImpl({ name: "1" }));
    group4.container.addWidget(new WidgetImpl({ name: "2" }));
    group4.container.addWidget(new WidgetImpl({ name: "3" }));
    group4.container.addWidget(new WidgetImpl({ name: "4" }));
    group4.container.addWidget(new WidgetImpl({ name: "5" }));
    expect(group4.container.rows.length).toBe(2);
  });
    it("can have an icon property", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      string: "General",
      icon: "home"
    };
    const widget = widgetFactory.createWidget("group", props);
    expect(widget.icon).toEqual("home");
  });
});
