import WidgetFactory from "../WidgetFactory";
import { it, expect, describe } from "vitest";

describe("A Text field", () => {
  describe("show count properly", () => {
    it("should be false as default", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "text1",
      };
      const widget = widgetFactory.createWidget("text", props);

      expect(widget.showCount).toBe(false);
    });
    it("should be true when set", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "text1",
        widget_props: "{'showCount': true}",
      };
      const widget = widgetFactory.createWidget("text", props);

      expect(widget.showCount).toBe(true);
    });
    it("should be false when set", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "text1",
        widget_props: "{'showCount': false}",
      };
      const widget = widgetFactory.createWidget("text", props);

      expect(widget.showCount).toBe(false);
    });
  });
  describe("size property", () => {
    it("should be undefined as default", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "text1",
      };
      const widget = widgetFactory.createWidget("text", props);

      expect(widget.size).toBe(undefined);
    });
    it("should be set if is an string", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "text1",
        size: "256",
      };
      const widget = widgetFactory.createWidget("text", props);

      expect(widget.size).toBe(256);
    });
    it("should be set if is a number", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "text1",
        size: 256,
      };
      const widget = widgetFactory.createWidget("text", props);

      expect(widget.size).toBe(256);
    });
  });
});
