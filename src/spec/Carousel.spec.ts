import WidgetFactory from "../WidgetFactory";
import Carousel from "../Carousel";
import { it, expect, describe } from "vitest";

describe("A Carousel", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "carousel",
    };

    const widget = widgetFactory.createWidget("carousel", props);
    expect(widget).toBeInstanceOf(Carousel);
  });
  it("should have autoPlay as false by default", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "carousel",
    };
    const widget = widgetFactory.createWidget("carousel", props);
    expect(widget.autoPlay).toBe(false);
  });
  it("should allow autoPlay to be set", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "carousel",
      auto_play: true,
    };
    const widget = widgetFactory.createWidget("carousel", props);
    expect(widget.autoPlay).toBe(true);
  });
});
