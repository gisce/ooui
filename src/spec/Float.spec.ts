import WidgetFactory from "../WidgetFactory";
import Float from "../Float";
import { it, expect, describe } from "vitest";

describe("A Float", () => {
  it("should have 16,2 as integers/decimals digits", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "float",
    };

    const widget: Float = widgetFactory.createWidget("float", props);

    expect(widget.integerDigits).toBe(16);
    expect(widget.decimalDigits).toBe(2);
  });

  it("should be able to parse digits (integer/decimals dimensions)", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "float",
      digits: [4, 3],
    };

    const widget: Float = widgetFactory.createWidget("float", props);

    expect(widget.integerDigits).toBe(4);
    expect(widget.decimalDigits).toBe(3);
  });
});
