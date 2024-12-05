import { it, expect, describe } from "vitest";
import WidgetFactory from "../WidgetFactory";

describe("A Page", () => {
  it("should allow an icon property", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      string: "Page 1",
      icon: "home",
    };

    const widget = widgetFactory.createWidget("page", props);

    expect(widget.label).toBe("Page 1");
    expect(widget.icon).toBe("home");
  });
  describe("working as a Spinner", () => {
    it("should have loading to be false by default", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        string: "Page 1",
      };
      const widget = widgetFactory.createWidget("page", props);
      expect(widget.loading).toBe(false);
    });
    it("should allow setting loading to true", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        string: "Page 1",
        loading: true,
      };
      const widget = widgetFactory.createWidget("page", props);
      expect(widget.loading).toBe(true);
    });
  });
});
