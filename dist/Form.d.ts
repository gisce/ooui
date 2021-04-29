import Container from "./Container";
import Widget from "./Widget";
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
    constructor(fields: Object, columns?: number);
    parse(xml: string): void;
    parseNode(node: Element, container: Container): void;
    /**
     * Calls container's findById method to find the widgets matching with param id
     * @param {string} id id to find
     */
    findById(id: string): Widget | null;
}
export default Form;
