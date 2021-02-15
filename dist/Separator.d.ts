import Widget from "./Widget";
declare class Separator extends Widget {
    /**
     * Label
     */
    _label: string;
    get label(): string;
    set label(value: string);
    constructor(props: any);
    findById(id: string): null;
}
export default Separator;
