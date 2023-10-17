import { it, expect, describe } from 'vitest';
import WidgetFactory from "../WidgetFactory";

describe("A Selection", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "selection1",
    };

    const widget = widgetFactory.createWidget("selection", props);

    expect(widget.id).toBe("selection1");
  });

  it("should properly set label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "selection1",
      string: "Language",
    };
    const widget = widgetFactory.createWidget("selection", props);

    expect(widget.label).toBe("Language");
  });

  it("should properly set size", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "selection1",
      size: 5,
    };
    const widget = widgetFactory.createWidget("selection", props);

    expect(widget.size).toBe(5);
  });

  it("should parse selection values", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "selection1",
      selection: [
        ["en_US", "English"],
        ["ca_ES", "Catalan / Català"],
        ["es_ES", "Spanish / Español"],
        ["", ""],
      ],
    };
    const widget = widgetFactory.createWidget("selection", props);

    expect(widget.selectionValues.size).toBe(4);
  });
});
