import { it, expect, describe } from 'vitest';
import WidgetFactory from "../WidgetFactory";

describe("A Page", () => {
  it("should allow an icon property", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      string: "Page 1",
      icon: "home"
    };

    const widget = widgetFactory.createWidget("page", props);

    expect(widget.label).toBe("Page 1");
    expect(widget.icon).toBe("home")
  });
});
