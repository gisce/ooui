declare abstract class Widget {
    /**
     * Default colspan
     */
    static _defaultColspan: number;
    static get defaultColspan(): number;
    static set defaultColspan(value: number);
    /**
     * Determines if widget is read only (default is false)
     */
    _readOnly: boolean;
    get readOnly(): boolean;
    set readOnly(value: boolean);
    /**
     * Column span (default is 1)
     */
    _colspan: number;
    get colspan(): number;
    set colspan(value: number);
    /**
     * Invisible fields (default is false)
     */
    _invisible: boolean;
    get invisible(): boolean;
    set invisible(value: boolean);
    /**
     * Widget type
     */
    _type: string;
    get type(): string;
    set type(value: string);
    /**
     * Context
     */
    _context: any;
    get context(): any;
    set context(value: any);
    /**
     * Domain
     */
    _domain?: string;
    get domain(): string | undefined;
    set domain(value: string | undefined);
    constructor(props?: any);
    abstract findById(id: string): Widget | null;
}
export default Widget;
