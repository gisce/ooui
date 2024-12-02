import WidgetFactory from "../WidgetFactory";
import Spinner from "../Spinner";
import { it, expect, describe } from "vitest";

describe("A Spinner", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "spinner",
    };

    const widget = widgetFactory.createWidget("spinner", props);
    expect(widget).toBeInstanceOf(Spinner);
  });

  it("should properly set label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "spinner",
      string: "spinner caption",
    };
    const widget = widgetFactory.createWidget("spinner", props);

    expect(widget.label).toBe("spinner caption");
  });

  it("should have loading as false by default", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "spinner",
    };
    const widget = widgetFactory.createWidget("spinner", props);
    expect(widget.loading).toBe(false);
  });
});
