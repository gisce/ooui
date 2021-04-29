import Widget from "./Widget";
declare class Tree {
    /**
     * Object containing fields specification of the form.
     */
    _fields: any;
    get fields(): any;
    _columns: Array<any>;
    get columns(): Array<any>;
    _string: string | null;
    get string(): string | null;
    constructor(fields: Object);
    parse(xml: string): void;
    parseNode(node: Element): void;
    /**
     * Find the widgets matching with param id
     * @param {string} id id to find
     */
    findById(id: string): Widget | null;
}
export default Tree;
