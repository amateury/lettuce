import {argument} from "./argument";
import {verifyErrors} from "./verifyErrors";
import {
    ParserSchemeFunction,
    ParserSchemesClass,
    HandlerParserSchemes,
    TypeValid,
    ValidatorsClass,
    valuesArgs,
    schemes,
    scheme,
    valueOf,
    FuncResolvePromiseScheme,
    resolvePromiseScheme
} from "../functions/validator";

/**
 * Analyze the values provided according to your schema.
 *
 * @param valueOf - Determines how validated arguments and parameters are extracted.
 * @param schemes - schemes
 * ```json
 * {
 *     email: {type: Sandwich.String, required: true, strict: true},
 *     password: {type: Sandwich.String, required: true, strict: true, min: 8}
 * }
 * ```
 * @param values - data body request.
 * @returns HandlerParserSchemes
 */
export const parserSchemes: HandlerParserSchemes = async (
    valueOf, schemes, values
) => {
    const
        /**
         *  validate data
         *
         * @param result_argument - result argument
         */
        result_argument = await argument(valueOf ?? true, values ?? {}, schemes),

        /**
         * check for errors in arguments
         *
         * @param responseError - bug check response
         */
        responseError = await verifyErrors(result_argument.errors);

    return {
        schemes: result_argument.argument,
        args: result_argument.body,
        errors: responseError.errors,
        message: responseError.message
    }
}

/**
 * Types of validations
 */
export class Types implements TypeValid {
    String = String
    Number = Number
    Array = Array
    Boolean = Boolean
    Object = Object
}

/**
 * Instance Types
 */
export const Type = new Types();

/**
 * A Validators class, with functions that allow rigorously validating
 * data, according to a specific pattern (a schema).
 *
 * @remarks
 * A schema determines the validation pattern of a value, and if it
 * does not meet the conditions of the pattern, an exception is
 * thrown with the return of an array of the errors found.
 *
 * @beta
 */
class Validators extends Types implements ValidatorsClass {

    /**
     * values to be validated
     * @defaultValue undefined
     */
    values: valuesArgs = undefined;

    /**
     * Object type property. List of validation schemes.
     * @defaultValue object
     */
    schemes: schemes;

    /**
     * Boolean type property. Determines how validated arguments
     * and parameters are extracted.
     * @defaultValue true
     */
    valueOf: valueOf = true;

    /**
     * Creates an instance of Sandwiches.
     */
    constructor(schemes?: schemes) {
        super();
        this.schemes = schemes ?? null;
    }

    /**
     * parse and validate request body data
     *
     * @param values - Data subject to validation
     * @returns ParserSchemesResponse
     */
    parserSchemes(values?: valuesArgs): ParserSchemeFunction
    {
        return parserSchemes(
            this.valueOf, this.schemes, this.values ?? values
        )
    }

    /**
     * Reset data:
     * ```ts
     *  this.valueOf = true;
     *  this.schemes = {};
     *  this.values = undefined;
     * ```
     */
    reset() {
        this.valueOf = true;
        this.schemes = null;
        this.values = undefined;
    }
}

export default Validators;

const validator = new Validators();

/**
 * addSchemes add schemes
 *
 * @privateRemarks
 * addSchemes function serving the ParserSchemes class for
 * adding validation schemes
 *
 * @param schemes - Validation schemes
 */
const addSchemes = (schemes: unknown) => {
    validator.schemes = Object.assign(validator.schemes ?? {}, schemes);
}

/**
 * handle the function addScheme, which belongs to the class ParserSchemes
 *
 * @param callBack - receives as argument the resolution function of
 * new Promise, and the value processed in the callback is passed to
 * it, this value is the validation scheme of an element
 */
const handlerAddScheme = (callBack: FuncResolvePromiseScheme) => {
    new Promise((resolve) => {
        callBack(resolve);
    }).then((schemes: unknown) => {
        addSchemes(schemes);
    });
}

/**
 * Processes and assigns to validator.schemes the validation
 * schemes declared as property in a class.
 *
 * @param schemesEntries - Matrix of schemes
 *
 * @example
 * Matrix schemes:
 * ```json
 * [
 *  ['name' {type: Type.String, required: true, strict: true}],
 *  ['email' {type: Type.String, required: true, strict: true}]
 * ]
 * ```
 */
const addPropertySchemesValidator = <T>(schemesEntries: [keyof T, T[keyof T]][]): Promise<void> => {
    return new Promise((resolve) => {
        resolve(Object.fromEntries(schemesEntries));
    }).then((schemeData) => {
        validator.schemes = Object.assign(validator.schemes, schemeData);
    })
}

export class ParserSchemes implements ParserSchemesClass {

    /**
     * instance ParserSchemes
     */
    constructor(valueOf?: boolean) {
        validator.reset();
        validator.valueOf = valueOf ?? true;
    }

    /**
     * Activating the schema validation functions
     */
    parserSchemes(values?: valuesArgs): ParserSchemeFunction {
        return addPropertySchemesValidator(Object.entries(this))
            .then(()=> validator.parserSchemes(values));
    }

    /**
     * add schemes
     *
     * @param schemes - Validations schemes
     */
    addSchemes(schemes: schemes) {
        addSchemes(schemes);
    }

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
    addScheme(scheme: scheme, arg: string | string[]) {
        handlerAddScheme((add: resolvePromiseScheme): void => {
            if(typeof arg == 'string') {
                add({
                    [arg]: scheme
                });
            } else {
                let sh = {}
                for (let i = 1; i <= arg.length; i++) {
                    sh = {
                        [arg[i -1]]: scheme,
                        ...sh
                    }
                    if(i == arg.length) add(sh);
                }
            }
        });
    }
}
