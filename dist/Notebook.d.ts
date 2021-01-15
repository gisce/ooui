import ContainerWidget from "./ContainerWidget";
declare class Notebook extends ContainerWidget {
    static _defaultColspan: number;
    static get defaultColspan(): number;
    static set defaultColspan(value: number);
    constructor(props: any);
}
export default Notebook;
