import WidgetFactory from "../WidgetFactory";
import { it, expect, describe } from "vitest";

describe("A Char", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "char1",
    };

    const widget = widgetFactory.createWidget("char", props);

    expect(widget.id).toBe("char1");
  });

  it("should have colspan 1 by default", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "char1",
    };
    const widget = widgetFactory.createWidget("char", props);

    expect(widget.colspan).toBe(1);
  });

  it("with label should have colspan 1 even with label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "char1",
      string: "Char caption",
    };
    const widget = widgetFactory.createWidget("char", props);

    expect(widget.colspan).toBe(1);
  });

  it("should properly set label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "char1",
      string: "Char caption",
    };
    const widget = widgetFactory.createWidget("char", props);

    expect(widget.label).toBe("Char caption");
  });

  it("should properly set size", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "char1",
      size: 256,
    };
    const widget = widgetFactory.createWidget("char", props);

    expect(widget.size).toBe(256);
  });

  it("should properly set readonly", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "char1",
      readonly: 1,
    };
    const widget = widgetFactory.createWidget("char", props);

    expect(widget.readOnly).toBe(true);
  });

  it("should properly set tooltip", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "char1",
      help: "This is a help field",
    };
    const widget = widgetFactory.createWidget("char", props);

    expect(widget.tooltip).toBe("This is a help field");
  });
});
