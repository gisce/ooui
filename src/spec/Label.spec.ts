import WidgetFactory from "../WidgetFactory";

describe("A Label", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "label",
    };

    const widget = widgetFactory.createWidget("label", props);

    expect(widget.id).toBe("label");
  });

  it("should properly set label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "label",
      string: "label caption",
    };
    const widget = widgetFactory.createWidget("label", props);

    expect(widget.label).toBe("label caption");
  });
});
