import WidgetFactory from "../WidgetFactory";

describe("A Notebook", () => {
  it("should have tabs position default to top", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      string: "Page 1",
    };

    const widget = widgetFactory.createWidget("notebook", props);
    expect(widget.tabPosition).toBe("top")
  });
  it("should allow position to bottom, left, right", () => {
    const widgetFactory = new WidgetFactory();
    ["bottom", "left", "rigth"].map(pos => {
      const props = {
        string: "Page 1",
        tabpos: pos
      };
  
      const widget = widgetFactory.createWidget("notebook", props);
      expect(widget.tabPosition).toBe(pos)
    })
  });
});
