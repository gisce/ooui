import WidgetFactory from "../WidgetFactory";
import { it, expect, describe } from "vitest";

describe("A CodeEditor widget", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "code",
    };

    const widget = widgetFactory.createWidget("codeeditor", props);

    expect(widget.id).toBe("code");
  });

  it("should have default lang to null", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "code",
    };
    const widget = widgetFactory.createWidget("codeeditor", props);

    expect(widget.lang).toBe(null);
  });

  it("should properly set lang", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "code",
      widget_props: "{'lang': 'xml'}",
    };
    const widget = widgetFactory.createWidget("codeeditor", props);

    expect(widget.lang).toBe("xml");
  });
});
