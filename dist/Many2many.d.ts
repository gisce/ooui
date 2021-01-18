import Field from "./Field";
/**
 * A Many2many relationship field
 */
declare class Many2many extends Field {
    /**
     * Field size
     */
    _size: number;
    get size(): number;
    set size(value: number);
    /**
     * Label
     */
    _label: string;
    get label(): string;
    set label(value: string);
    /**
     * Relation
     */
    _relation: string;
    get relation(): string;
    set relation(value: string);
    constructor(props: any);
}
export default Many2many;
