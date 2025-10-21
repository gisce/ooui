import WidgetFactory from "../WidgetFactory";
import QRCode from "../QRCode";
import { it, expect, describe } from "vitest";

describe("A QRCode", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "qrcode",
    };

    const widget = widgetFactory.createWidget("qrcode", props);
    expect(widget).toBeInstanceOf(QRCode);
  });

  it("should properly set label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "qrcode",
      string: "QR Code caption",
    };
    const widget = widgetFactory.createWidget("qrcode", props);

    expect(widget.label).toBe("QR Code caption");
  });

  describe("width property", () => {
    it("should be undefined by default", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "qrcode",
      };
      const widget = widgetFactory.createWidget("qrcode", props);

      expect(widget.width).toBeUndefined();
    });

    it("should return width when widget_props.width is set", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "qrcode",
        widget_props: {
          width: 200,
        },
      };
      const widget = widgetFactory.createWidget("qrcode", props);

      expect(widget.width).toBe(200);
    });
  });

  describe("border property", () => {
    it("should be false by default", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "qrcode",
      };
      const widget = widgetFactory.createWidget("qrcode", props);

      expect(widget.border).toBe(false);
    });

    it("should be true when widget_props.border is true", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "qrcode",
        widget_props: {
          border: true,
        },
      };
      const widget = widgetFactory.createWidget("qrcode", props);

      expect(widget.border).toBe(true);
    });

    it("should be false when widget_props.border is false", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "qrcode",
        widget_props: {
          border: false,
        },
      };
      const widget = widgetFactory.createWidget("qrcode", props);

      expect(widget.border).toBe(false);
    });
  });

  describe("showValue property", () => {
    it("should be false by default", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "qrcode",
      };
      const widget = widgetFactory.createWidget("qrcode", props);

      expect(widget.showValue).toBe(false);
    });

    it("should be true when widget_props.showValue is true", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "qrcode",
        widget_props: {
          showValue: true,
        },
      };
      const widget = widgetFactory.createWidget("qrcode", props);

      expect(widget.showValue).toBe(true);
    });

    it("should be false when widget_props.showValue is false", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "qrcode",
        widget_props: {
          showValue: false,
        },
      };
      const widget = widgetFactory.createWidget("qrcode", props);

      expect(widget.showValue).toBe(false);
    });
  });
});
