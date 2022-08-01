import WidgetFactory from "../WidgetFactory";

describe("A MultiCheckbox widget", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "one2many1",
    };

    const widget = widgetFactory.createWidget("multicheckbox", props);

    expect(widget.id).toBe("one2many1");
  });

  it("should properly set field", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "one2many1",
      widget_props: "{'field': 'foo'}",
    };
    const widget = widgetFactory.createWidget("multicheckbox", props);

    expect(widget.field).toBe("foo");
  });

  it("should have default field to 'name'", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "one2many1",
    };
    const widget = widgetFactory.createWidget("multicheckbox", props);

    expect(widget.field).toBe("name");
  });
});
