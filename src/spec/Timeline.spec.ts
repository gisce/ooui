import { it, expect, describe } from 'vitest';
import WidgetFactory from "../WidgetFactory";
import Timeline from "../Timeline";

describe("A Timeline", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "timeline_field",
    };

    const widget = widgetFactory.createWidget("timeline", props);
    expect(widget).toBeInstanceOf(Timeline);
    expect(widget.id).toBe("timeline_field");

  });

  it("should properly set readonly", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "timeline_field",
      readonly: 1,
    };
    const widget = widgetFactory.createWidget("timeline", props);

    expect(widget.readOnly).toBe(true);
  });

  it('should parse widget props', () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "timeline_field",
      widget_props: "{'titleField': 'tfield', 'summaryField': 'sfield', 'iconField': 'ifield', 'colorField': 'cfield'}"
    };
    const widget = widgetFactory.createWidget("timeline", props);
    expect(widget.summaryField).toBe('sfield');
    expect(widget.titleField).toBe('tfield');
    expect(widget.iconField).toBe('ifield');
    expect(widget.colorField).toBe('cfield');
  });
});
