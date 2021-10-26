import Container from "./Container";
import Widget from "./Widget";
export declare type FormParseOptions = {
    readOnly?: boolean;
    values?: any;
    domain?: any;
};
declare class Form {
    /**
     * Object containing fields specification of the form.
     */
    _fields: any;
    get fields(): any;
    _container: Container;
    get container(): Container;
    _string: string | null;
    get string(): string | null;
    /**
     * Widget type
     */
    _type: string;
    get type(): string;
    /**
     * Determines if form is read only (default is false)
     */
    _readOnly: boolean;
    get readOnly(): boolean;
    set readOnly(value: boolean);
    /**
     * Context
     */
    _context: any;
    get context(): any;
    set context(value: any);
    /**
     * Collection of onChange actions for fields
     */
    _onChangeFields: any;
    get onChangeFields(): any;
    set onChangeFields(value: any);
    /**
     * Domain
     */
    _domain: string[];
    get domain(): string[];
    set domain(value: string[]);
    constructor(fields: Object, columns?: number);
    parse(xml: string, options?: FormParseOptions): void;
    parseNode({ node, container, values, }: {
        node: Element;
        container: Container;
        values: any;
    }): void;
    /**
     * Calls container's findById method to find the widgets matching with param id
     * @param {string} id id to find
     */
    findById(id: string): Widget | null;
}
export default Form;
