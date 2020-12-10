import ContainerWidget from "../ContainerWidget";

describe('A ContainerWidget', () => {
    it('should be constructed with a colspan by default', () => {
        const widget = new ContainerWidget();
        
        expect(widget.colspan).toBeGreaterThan(0);
        expect(widget.colspan).toBe(ContainerWidget.defaultColspan);
    });

    it('should properly set colspan', () => {
        const widget = new ContainerWidget();
        widget.colspan = 3;

        expect(widget.colspan).toBe(3);
    });

    it('colspan should match with internal container colspan', () => {
        const widget = new ContainerWidget();
        widget.colspan = 3;

        expect(widget.colspan).toBe(widget.container.colspan);
    });

    it('set colspan as string should store as a number', () => {
        const widget = new ContainerWidget();

        widget.colspan = "3";
        
        expect(typeof widget.colspan).toBe("number");
        expect(widget.colspan).toBe(3);
    });
});