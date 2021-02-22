import Char from "../Char";
import Button from "../Button";
import NewLine from "../NewLine";
import WidgetFactory from "../WidgetFactory";


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
});
