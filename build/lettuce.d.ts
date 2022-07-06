import { TValues, TStrictCycle, IScheme, TConfig } from "./parser";
interface TParamConstructor {
    values?: TValues;
    strictCycle?: TStrictCycle;
}
interface ILettuce {
    readonly schemes: IScheme[];
    values?: TValues;
    config?: TConfig;
}
declare class Lettuce implements ILettuce {
    /**
     * Object type property. List of validation schemes.
     * @defaultValue object
     */
    schemes: IScheme[];
    /**
     * values to be validated
     * @defaultValue null
     */
    values?: TValues;
    config?: TConfig;
    /**
     * Creates an instance of Lettuce.
     * @param schemas - Schemas validation
     * @param crossing - Configuration data, and optional for validation
     */
    constructor(schemas: IScheme[], crossing?: TParamConstructor);
    parser(values?: TValues, strictCycle?: TStrictCycle): Promise<any>;
}
export default Lettuce;
