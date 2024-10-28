import WidgetFactory from "../WidgetFactory";
import JSONField from "../JSON";
import { it, expect, describe } from "vitest";

describe("A Json field", () => {
  it("should be created by the widget factory", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "json_field",
    };
    const widget = widgetFactory.createWidget("json", props);
    expect(widget).toBeInstanceOf(JSONField);
  });
  it("should have lang set to json as default", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "json_field",
    };
    const widget = widgetFactory.createWidget("json", props);
    expect(widget.lang).toBe("json");
  });
});
