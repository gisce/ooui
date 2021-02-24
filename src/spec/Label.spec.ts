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

  it("should have fieldForLabel null by default", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "label",
      string: "label caption",
    };
    const widget = widgetFactory.createWidget("label", props);
    expect(widget.fieldForLabel).toBeNull();
  });

  it("should properly parse fieldForLabel prop", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "field_label",
      string: "label caption",
      fieldForLabel: "field",
    };
    const widget = widgetFactory.createWidget("label", props);
    expect(widget.fieldForLabel).toBe("field");
  });
});
