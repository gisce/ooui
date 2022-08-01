import WidgetFactory from "../WidgetFactory";
import { Char, Button, NewLine, Tags, MultiCheckbox } from "..";


describe('A WidgetFactory', () => {
    it('should be able to build a Char widget', () => {
        const widgetFactory = new WidgetFactory();
        const props = {
            name: "char1",
        };
        const widget = widgetFactory.createWidget("char", props);
        expect(widget).toBeInstanceOf(Char);
    });

    it('should be able to build a Button widget', () => {
        const widgetFactory = new WidgetFactory();
        const props = {
            name: "button1"
        };
        const widget = widgetFactory.createWidget("button", props);
        expect(widget).toBeInstanceOf(Button);
    });

    it('should be able to build a Newline widget', () => {
        const widgetFactory = new WidgetFactory();
        const props = {};
        const widget = widgetFactory.createWidget("newline", props);
        expect(widget).toBeInstanceOf(NewLine);
    });

    it('should be able to retrieve widget type', () => {
        const widgetFactory = new WidgetFactory();
        const props = {};
        const widget = widgetFactory.createWidget("newline", props);
        expect(widget).toBeInstanceOf(NewLine);
        expect(widget.type).toBe("newline");
    });

    it('should be able to retrieve Tags type', () => {
        const widgetFactory = new WidgetFactory();
        const props = {};
        const widget = widgetFactory.createWidget("tags", props);
        expect(widget).toBeInstanceOf(Tags);
        expect(widget.type).toBe("tags");
    });

    it('should be able to retrieve MultiCheckbox type', () => {
        const widgetFactory = new WidgetFactory();
        const props = {};
        const widget = widgetFactory.createWidget("multicheckbox", props);
        expect(widget).toBeInstanceOf(MultiCheckbox);
        expect(widget.type).toBe("multicheckbox");
    });
});
