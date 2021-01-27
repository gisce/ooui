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
    constructor(props: any);
}
export default One2many;
