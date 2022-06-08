import * as parser from "./parser";
interface ILettuce {
    readonly schemes: parser.IScheme[];
    values?: parser.TValues;
}
declare class Lettuce implements ILettuce {
    /**
     * Object type property. List of validation schemes.
     * @defaultValue object
     */
    schemes: parser.IScheme[];
    /**
     * values to be validated
     * @defaultValue null
     */
    values?: parser.TValues;
    /**
     * Creates an instance of Lettuce.
     */
    constructor(schemas: parser.IScheme[] | null, values?: parser.TValues);
    parser(values?: parser.TValues): Promise<any>;
}
export default Lettuce;
