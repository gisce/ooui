import WidgetFactory from "../WidgetFactory";

describe("A Button", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "button1",
    };

    const widget = widgetFactory.createWidget("button", props);

    expect(widget.id).toBe("button1");
  });

  it("should have colspan 1 by default (with no label)", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "button1",
    };
    const widget = widgetFactory.createWidget("button", props);

    expect(widget.colspan).toBe(1);
  });

  it("should properly set caption", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "char1",
      string: "Button caption",
    };
    const widget = widgetFactory.createWidget("button", props);

    expect(widget.caption).toBe("Button caption");
  });

  it("should properly have nolabel as true by default", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "char1",
      string: "Button caption",
    };
    const widget = widgetFactory.createWidget("button", props);

    expect(widget.nolabel).toBe(true);
  });

  it("should properly have nolabel value passed as props", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "char1",
      string: "Button caption",
      nolabel: false,
    };
    const widget = widgetFactory.createWidget("button", props);

    expect(widget.nolabel).toBe(false);
  });
  describe('primary attribute', () => {
    it("should have primary attribute as false for default", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      string: "Button",
    };
    const widget = widgetFactory.createWidget("button", props);
    expect(widget.primary).toBe(false);
    });
    it("should parse primary option for 1", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        string: "Button",
        primary: 1
      };
      const widget = widgetFactory.createWidget("button", props);
      expect(widget.primary).toBe(true);
    });
    it("should parse primary option for '1'", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        string: "Button",
        primary: "1"
      };
      const widget = widgetFactory.createWidget("button", props);
      expect(widget.primary).toBe(true);
    });
    it("should parse primary option for true", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        string: "Button",
        primary: true
      };
      const widget = widgetFactory.createWidget("button", props);
      expect(widget.primary).toBe(true);
    });
  });
  describe('danger attribute', () => {
    it("should have danger attribute as false for default", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      string: "Button",
    };
    const widget = widgetFactory.createWidget("button", props);
    expect(widget.danger).toBe(false);
    });
    it("should parse danger option for 1", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        string: "Button",
        danger: 1
      };
      const widget = widgetFactory.createWidget("button", props);
      expect(widget.danger).toBe(true);
    });
    it("should parse danger option for '1'", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        string: "Button",
        danger: "1"
      };
      const widget = widgetFactory.createWidget("button", props);
      expect(widget.danger).toBe(true);
    });
    it("should parse danger option for true", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        string: "Button",
        danger: true
      };
      const widget = widgetFactory.createWidget("button", props);
      expect(widget.danger).toBe(true);
    });
  });
});
