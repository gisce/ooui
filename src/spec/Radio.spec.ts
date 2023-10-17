import { it, expect, describe } from "vitest";
import WidgetFactory from "../WidgetFactory";

describe("A Radio widget", () => {
  it("should have default direction to 'horizontal'", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "level",
    };
    const widget = widgetFactory.createWidget("radio", props);

    expect(widget.direction).toBe("horizontal");
  });

  it("should properly set field", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "level",
      widget_props: "{'direction': 'vertical'}",
    };
    const widget = widgetFactory.createWidget("radio", props);

    expect(widget.direction).toBe("vertical");
  });
});
