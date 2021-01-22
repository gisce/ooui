import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import Widget from "./Widget";
declare class SearchFilter {
    /**
     * Object containing the specific fields for primary and secondary search fields
     */
    _searchFields: any;
    get searchFields(): any;
    /**
     * Object containing all the fields specification of the whole form
     */
    _fields: any;
    get fields(): any;
    _simpleSearchContainer: Container;
    get simpleSearchContainer(): Container;
    _advancedSearchContainer: Container;
    get advancedSearchContainer(): Container;
    constructor(searchFields: Object, fields: Object, columns?: number);
    parse(): void;
    parseFields(searchFields: string[], widgetFactory: WidgetFactory): any[];
    /**
     * Calls container's findById method to find the widgets matching with param id
     * @param {string} id id to find
     */
    findById(id: string): Widget | null;
}
export default SearchFilter;
