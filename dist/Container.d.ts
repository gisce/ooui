import Widget from "./Widget";
declare type AddWidgetOptions = {
    addLabel: boolean;
};
declare class Container {
    /**
     * Number of columns the container is divided
     */
    _columns: number;
    get columns(): number;
    set columns(value: number);
    /**
     * Number of columns to use
     */
    _colspan: number;
    get colspan(): number;
    set colspan(value: number);
    /**
     * Number of rows
     */
    _rows: Widget[][];
    get rows(): Widget[][];
    set rows(value: Widget[][]);
    _index: number;
    get index(): number;
    constructor(columns?: number, colspan?: number);
    /**
     * Returns the next free position
     */
    freePosition(): number;
    addWidget(widget: Widget, options?: AddWidgetOptions): void;
    /**
     * Traverses children to find a matching container or widget with the exact same id.
     * @param {string} id id (name) of the field or container to find
     */
    findById(id: string): Widget | null;
}
export default Container;
