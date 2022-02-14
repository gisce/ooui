import One2many from "./One2many";
declare class Timeline extends One2many {
    /**
     * Title field
     */
    _titleField: string;
    get titleField(): string;
    set titleField(value: string);
    /**
     * Summary field
     */
    _summaryField: string;
    get summaryField(): string;
    set summaryField(value: string);
    constructor(props: any);
}
export default Timeline;
