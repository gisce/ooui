import Field from "./Field";
/**
 * Binary base64 field
 */
declare class Binary extends Field {
    /**
     * Filename field name
     */
    _filenameField: string;
    get filenameField(): string;
    set filenameField(value: string);
    constructor(props: any);
}
export default Binary;
