import Widget from "./Widget";
import Container from "./Container";
declare class ContainerWidget extends Widget {
    static _defaultColspan: number;
    static get defaultColspan(): number;
    static set defaultColspan(value: number);
    /**
     * Container
     */
    _container: Container;
    get container(): Container;
    set container(value: Container);
    get colspan(): number;
    set colspan(value: number);
    /**
     * Container label
     */
    _label: string;
    get label(): string;
    set label(value: string);
    constructor(props?: any);
    /**
     * Calls container's findById method to find the widgets matching with param id
     * @param {string} id id to find
     */
    findById(id: string): Widget | null;
}
export default ContainerWidget;
