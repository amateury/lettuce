import * as parser from "./parser";
interface TParamConstructor {
    values?: parser.TValues;
    strictCycle?: parser.TStrictCycle;
}
interface ILettuce {
    readonly schemes: parser.IScheme[];
    values?: parser.TValues;
    config?: parser.TConfig;
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
    config?: parser.TConfig;
    /**
     * Creates an instance of Lettuce.
     * @param schemas - Schemas validation
     * @param crossing - Configuration data, and optional for validation
     */
    constructor(schemas: parser.IScheme[], crossing?: TParamConstructor);
    parser(values?: parser.TValues, strictCycle?: parser.TStrictCycle): Promise<any>;
}
export default Lettuce;
