import WidgetFactory from "../WidgetFactory";

describe("A Text widget", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "content",
    };

    const widget = widgetFactory.createWidget("text", props);
    expect(widget.id).toBe("content");
  });

  it("should have default format to plain", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "content",
    };
    const widget = widgetFactory.createWidget("text", props);

    expect(widget.format).toBe("plain");
  });

  it("should properly set field", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "content",
      widget_props: "{'format': 'html'}",
    };
    const widget = widgetFactory.createWidget("text", props);

    expect(widget.format).toBe("html");
  });

});
