import WidgetFactory from "../WidgetFactory";

describe('A Button', () => {
    it('should have an id corresponding to field name', () => {
        const widgetFactory = new WidgetFactory();
        const props = {
            name: "button1"
        };

        const widget = widgetFactory.createWidget("button", props);

        expect(widget.id).toBe("button1");
    });

    it('should have colspan 1 by default (with no label)', () => {
        const widgetFactory = new WidgetFactory();
        const props = {
            name: "button1",
        };
        const widget = widgetFactory.createWidget("button", props);

        expect(widget.colspan).toBe(1);
    });

    it('should properly set caption', () => {
        const widgetFactory = new WidgetFactory();
        const props = {
            name: "char1",
            string: "Button caption"
        };
        const widget = widgetFactory.createWidget("button", props);

        expect(widget.caption).toBe("Button caption");
    });

});