// src/spec/ColorPicker.spec.ts
import WidgetFactory from "../WidgetFactory";
import ColorPicker from "../ColorPicker";
import { it, expect, describe } from "vitest";

describe("A ColorPicker", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "colorPicker",
    };

    const widget = widgetFactory.createWidget("colorPicker", props);
    expect(widget).toBeInstanceOf(ColorPicker);
  });

  it("should properly set label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "colorPicker",
      string: "colorPicker caption",
    };
    const widget = widgetFactory.createWidget("colorPicker", props);

    expect(widget.label).toBe("colorPicker caption");
  });

  describe("showText property", () => {
    it("should show text by default", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "colorPicker",
      };
      const widget = widgetFactory.createWidget("colorPicker", props);

      expect(widget.showText).toBe(true);
    });
    it("should show text when widget_props.showText is true", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "colorPicker",
        widget_props: {
          show_text: true,
        },
      };
      const widget = widgetFactory.createWidget("colorPicker", props);

      expect(widget.showText).toBe(true);
    });

    it("should not show text when widget_props.showText is false", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "colorPicker",
        widget_props: {
          show_text: false,
        },
      };
      const widget = widgetFactory.createWidget("colorPicker", props);

      expect(widget.showText).toBe(false);
    });
  });
});
