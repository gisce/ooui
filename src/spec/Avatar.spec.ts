import WidgetFactory from "../WidgetFactory";
import { it, expect, describe } from "vitest";

describe("A Avatar widget", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "user",
    };

    const widget = widgetFactory.createWidget("avatar", props);

    expect(widget.id).toBe("user");
  });
});
