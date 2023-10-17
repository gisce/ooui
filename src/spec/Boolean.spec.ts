import WidgetFactory from "../WidgetFactory";
import { it, expect, describe } from 'vitest';

describe("A Boolean", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "boolean1",
    };

    const widget = widgetFactory.createWidget("boolean", props);

    expect(widget.id).toBe("boolean1");
  });

  it("should properly set label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "boolean1",
      string: "Boolean caption",
    };
    const widget = widgetFactory.createWidget("boolean", props);

    expect(widget.label).toBe("Boolean caption");
  });

  it("should properly set readonly", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "boolean1",
      readonly: 1,
    };
    const widget = widgetFactory.createWidget("boolean", props);

    expect(widget.readOnly).toBe(true);
  });
});
