import { it, expect, describe } from 'vitest';
import Widget from "../Widget";
import WidgetImpl from "./fixtures/WidgetImpl";

describe('A Widget', () => {
    it('should be constructed with a colspan by default', () => {
        const widget = new WidgetImpl();

        expect(widget.colspan).toBe(Widget.defaultColspan);
    });

    it("should have colspan 1 by default", () => {
        const widget = new WidgetImpl();
        expect(widget.colspan).toBe(1);
    });

    it('should properly set colspan', () => {
        const widget = new WidgetImpl();
        widget.colspan = 3;

        expect(widget.colspan).toBe(3);
    });

    it('should be readOnly false by default', () => {
        const widget = new WidgetImpl();

        expect(widget.readOnly).toBe(false);
    });

    it('colspan should be of type Number', () => {
        const widget = new WidgetImpl();

        expect(typeof widget.colspan).toBe("number");
    });
    describe('Parsing widget props', () => {
        it('should parse widget_props', () => {
            const props = {
                widget_props: "{'prop_1': 1, 'prop_2': 'prop2'}"
            }
            const widget = new WidgetImpl(props);
            expect(JSON.stringify(widget.parsedWidgetProps)).toBe(
              JSON.stringify({prop_1: 1, prop_2: 'prop2'})
            )
        });
        it('should fail if widget props are not valid', () => {
            const props = {
                widget_props: "{'prop_1: 1, 'prop_2': 'prop2'}"
            }
            expect.assertions(1);
            try {
                new WidgetImpl(props);
            } catch (e) {
                expect(e.message).toBe('Error parsing widget_props');
            }

        });
    });

    /*
    it('set colspan as string should store as a number', () => {
        const widget = new WidgetImpl();

        widget.colspan = "3";

        expect(typeof widget.colspan).toBe("number");
        expect(widget.colspan).toBe(3);
    });
    */
});