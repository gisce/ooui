import WidgetFactory from "../WidgetFactory";

describe("A Date", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "date1",
    };

    const widget = widgetFactory.createWidget("date", props);

    expect(widget.id).toBe("date1");
  });

  it("should properly set label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "date1",
      string: "Date caption",
    };
    const widget = widgetFactory.createWidget("date", props);

    expect(widget.label).toBe("Date caption");
  });

  it("should properly set readonly", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "date1",
      readonly: 1,
    };
    const widget = widgetFactory.createWidget("date", props);

    expect(widget.readOnly).toBe(true);
  });
});
