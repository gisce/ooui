import WidgetFactory from "../WidgetFactory";
import Indicator from "../Indicator";

describe("An Indicator", () => {
  it("should create a Indicator widget from factory", () => {
    const widgetFactory = new WidgetFactory();

    const widget = widgetFactory.createWidget("indicator", {});
    expect(widget).toBeInstanceOf(Indicator);

  });

  it('should have card as false as default', () => {
    const widgetFactory = new WidgetFactory();
    const widget = widgetFactory.createWidget("indicator", {});
    expect(widget.card).toBe(false);
  });

  it('should parse widget props', () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      widget_props: "{'card': true, 'icon': 'wallet', 'suffix': '€'}"
    };
    const widget = widgetFactory.createWidget("indicator", props);
    expect(widget.card).toBe(true);
    expect(widget.icon).toBe('wallet');
    expect(widget.suffix).toBe('€');
  });
  it('icon and suffix should be an empty string if not defined', () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      widget_props: "{'card': true}"
    };
    const widget = widgetFactory.createWidget("indicator", props);
    expect(widget.icon).toBe("");
    expect(widget.suffix).toBe("");
  });
  it('card should be false if not defined', () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      widget_props: "{'icon': 'wallet'}"
    };
    const widget = widgetFactory.createWidget("indicator", props);
    expect(widget.card).toBe(false);
  });
});
