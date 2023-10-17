import { it, expect, describe } from 'vitest';
import WidgetFactory from "../WidgetFactory";

describe("A Steps widget", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "state",
    };

    const widget = widgetFactory.createWidget("steps", props);
    expect(widget.id).toBe("state");
  });

  it("should have default errorField to undefined", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "state",
    };
    const widget = widgetFactory.createWidget("steps", props);

    expect(widget.errorField).toBe(null);
  });

  it("should properly set field", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "state",
      widget_props: "{'error_field': 'error'}",
    };
    const widget = widgetFactory.createWidget("steps", props);

    expect(widget.errorField).toBe("error");
  });

});
