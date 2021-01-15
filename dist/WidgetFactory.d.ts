declare class WidgetFactory {
    /**
     * Widget class
     */
    _widgetClass: any;
    setWidgetClass(type: string): void;
    createWidget(type: string, props: any): any;
}
export default WidgetFactory;
