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

  describe("Label types", () => {
    it("should have default type by default", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "field_label",
        string: "Default",
      };
      const widget = widgetFactory.createWidget("label", props);
      expect(widget.labelType).toBe("default");
    });
    it("should parse label_type from widget props", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "field_label",
        string: "Default",
        widget_props: "{'label_type': 'warning'}"
      };
      const widget = widgetFactory.createWidget("label", props);
      expect(widget.labelType).toBe("warning");
    });
  });

  describe("Label size", () => {
    it("should have default size to text", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "field_label",
        string: "Default",
        widget_props: "{}"
      };
      const widget = widgetFactory.createWidget("label", props);
      expect(widget.labelSize).toBe("text");
    });
    it("should have allow size to h1...h5", () => {
      const widgetFactory = new WidgetFactory();
      ['h1', 'h2', 'h3', 'h4', 'h5'].map((level) => {
        const props = {
          name: "field_label",
          string: "Default",
          widget_props: `{'label_size': '${level}'}`
        };
        const widget = widgetFactory.createWidget("label", props);
        expect(widget.labelSize).toBe(level);
      })
    });
  });
});
