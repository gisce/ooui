import { it, expect, describe } from 'vitest';
import WidgetFactory from "../WidgetFactory";

describe("A Separator", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      string: "Text",
    };

    const widget = widgetFactory.createWidget("separator", props);

    expect(widget.label).toBe("Text");
  });
  it("can have an icon property", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      string: "Text",
      icon: "home"
    };
    const widget = widgetFactory.createWidget("separator", props);
    expect(widget.icon).toEqual("home");
  });
});
