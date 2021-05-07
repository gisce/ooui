import Field from "./Field";
/**
 * A One2Many relationship field
 */
declare class One2many extends Field {
    /**
     * Field size
     */
    _size: number;
    get size(): number;
    set size(value: number);
    /**
     * Relation
     */
    _relation: string;
    get relation(): string;
    set relation(value: string);
    /**
     * Views
     */
    _views: any;
    get views(): any;
    set views(value: any);
    /**
     * Mode
     */
    _mode: Array<string>;
    get mode(): Array<string>;
    set mode(value: Array<string>);
    static _defaultColspan: number;
    static get defaultColspan(): number;
    static set defaultColspan(value: number);
    constructor(props: any);
}
export default One2many;
