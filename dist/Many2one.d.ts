import Field from "./Field";
/**
 * A many2one relationship field
 */
declare class Many2one extends Field {
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
    constructor(props: any);
}
export default Many2one;
