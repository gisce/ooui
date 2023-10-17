import WidgetFactory from "../WidgetFactory";
import { it, expect, describe } from "vitest";

describe("A MultiCheckbox widget", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "one2many1",
    };

    const widget = widgetFactory.createWidget("multicheckbox", props);

    expect(widget.id).toBe("one2many1");
  });

  describe("Parsing widget props", () => {
    it("should properly set field", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "one2many1",
        widget_props: "{'field': 'foo'}",
      };
      const widget = widgetFactory.createWidget("multicheckbox", props);

      expect(widget.field).toBe("foo");
    });

    it("should have default field to 'name'", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "one2many1",
      };
      const widget = widgetFactory.createWidget("multicheckbox", props);

      expect(widget.field).toBe("name");
    });

    it("should have the number of columns default 4", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "one2many1",
      };
      const widget = widgetFactory.createWidget("multicheckbox", props);

      expect(widget.columns).toBe(4);
    });

    it("should parse the number of columns", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "one2many1",
        widget_props: "{'columns': 6}",
      };
      const widget = widgetFactory.createWidget("multicheckbox", props);

      expect(widget.columns).toBe(6);
    });
  });
});
