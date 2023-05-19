import WidgetFactory from "../WidgetFactory";

describe("A Markdown widget", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "status",
    };

    const widget = widgetFactory.createWidget("markdown", props);
    expect(widget.id).toBe("status");
  });
});
