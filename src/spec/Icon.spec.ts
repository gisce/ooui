import WidgetFactory from "../WidgetFactory";
import { it, expect, describe } from "vitest";

describe("An Icon", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "icon1",
    };

    const widget = widgetFactory.createWidget("icon", props);

    expect(widget.id).toBe("icon1");
  });

  it("should properly have nolabel as true by default", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "icon1",
    };
    const widget = widgetFactory.createWidget("icon", props);

    expect(widget.nolabel).toBe(true);
  });

  it("should properly set name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "icon1",
    };
    const widget = widgetFactory.createWidget("icon", props);

    widget.name = "home";
    expect(widget.name).toBe("home");
  });

  it("should properly set size", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "icon1",
      size: 24,
    };
    const widget = widgetFactory.createWidget("icon", props);

    expect(widget.size).toBe(24);
  });

  it("should have default size of 16", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "icon1",
    };
    const widget = widgetFactory.createWidget("icon", props);

    expect(widget.size).toBe(16);
  });

  it("should properly set color", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "icon1",
      color: "#FF0000",
    };
    const widget = widgetFactory.createWidget("icon", props);

    expect(widget.color).toBe("#FF0000");
  });

  it("should have empty color by default", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "icon1",
    };
    const widget = widgetFactory.createWidget("icon", props);

    expect(widget.color).toBe("");
  });

  it("should properly parse all props together", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "icon1",
      size: 32,
      color: "blue",
    };
    const widget = widgetFactory.createWidget("icon", props);

    widget.name = "star";
    expect(widget.name).toBe("star");
    expect(widget.size).toBe(32);
    expect(widget.color).toBe("blue");
  });
});
