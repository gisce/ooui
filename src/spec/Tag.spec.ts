import { it, expect, describe } from 'vitest';
import WidgetFactory from "../WidgetFactory";

describe("A Tag widget", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "status",
    };

    const widget = widgetFactory.createWidget("tag", props);

    expect(widget.id).toBe("status");
  });

  describe("colors property", () => {
    it("should have default colors to empty object", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "status",
      };
      const widget = widgetFactory.createWidget("tag", props);

      expect(widget.colors).toStrictEqual({});
    });
    it("should parse colors property", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "status",
        widget_props: '{"colors": {"draft": "blue", "open": "red"}}',
      };
      const widget = widgetFactory.createWidget("tag", props);

      expect(widget.colors).toStrictEqual({draft: 'blue', open: 'red'});
    });
    it("should parse colors property and can be an string 'auto'", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "status",
        widget_props: '{"colors": "auto"}',
      };
      const widget = widgetFactory.createWidget("tag", props);

      expect(widget.colors).toStrictEqual("auto");
    });
  });
});
