import { ParserSchemeFunction, ParserSchemesClass, valuesArgs, schemes, scheme } from "../functions/validator";
export declare class ParserSchemes implements ParserSchemesClass {
    /**
     * instance ParserSchemes
     */
    constructor(valueOf?: boolean);
    /**
     * Activating the schema validation functions
     */
    parserSchemes(values?: valuesArgs): ParserSchemeFunction;
    /**
     * add schemes
     *
     * @param schemes - Validations schemes
     */
    addSchemes(schemes: schemes): void;
    /**
     * The addScheme property must be represented in the child class as a function
     * within this function the schemas are loaded for the validation of the arguments
     *
     * @example
     *```ts
     * addScheme({type: Sandwich.String, required: true, strict: true}, ['email'])
     *```
     * @param scheme - Validations scheme
     * @param arg - Name of the argument to validate, can be a string or an array of strings.
     *
     * @example
     * example param arg:
     * ```ts
     * 'password' or ['password', 'passwordConfirm']
     * ```
     *
     */
    addScheme(scheme: scheme, arg: string | string[]): void;
}
