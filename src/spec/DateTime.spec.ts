import WidgetFactory from "../WidgetFactory";

describe("A DateTime", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "datetime1",
    };

    const widget = widgetFactory.createWidget("datetime", props);

    expect(widget.id).toBe("datetime1");
  });

  it("should properly set label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "datetime1",
      string: "Datetime caption",
    };
    const widget = widgetFactory.createWidget("datetime", props);

    expect(widget.label).toBe("Datetime caption");
  });

  it("should properly set readonly", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "datetime1",
      readonly: 1,
    };
    const widget = widgetFactory.createWidget("datetime", props);

    expect(widget.readOnly).toBe(true);
  });
});
