import WidgetFactory from "../WidgetFactory";

describe("A One2many", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "one2many1",
    };

    const widget = widgetFactory.createWidget("one2many", props);

    expect(widget.id).toBe("one2many1");
  });

  it("should properly set label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "one2many1",
      string: "Country",
    };
    const widget = widgetFactory.createWidget("one2many", props);

    expect(widget.label).toBe("Country");
  });

  it("should properly set relation", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "one2many1",
      relation: "res.country",
    };
    const widget = widgetFactory.createWidget("one2many", props);

    expect(widget.relation).toBe("res.country");
  });
});
