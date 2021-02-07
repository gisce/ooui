import WidgetFactory from "../WidgetFactory";

describe("A many2many", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "many2many1",
    };

    const widget = widgetFactory.createWidget("many2many", props);

    expect(widget.id).toBe("many2many1");
  });

  it("should properly set label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "many2many1",
      string: "Country",
    };
    const widget = widgetFactory.createWidget("many2many", props);

    expect(widget.label).toBe("Country");
  });

  it("should properly set relation", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "many2many1",
      relation: "res.country",
    };
    const widget = widgetFactory.createWidget("many2many", props);

    expect(widget.relation).toBe("res.country");
  });
});
