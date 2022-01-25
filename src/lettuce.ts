import {argument} from "./argument";
import {verifyErrors} from "./verifyErrors";
import Types from "./type";
import {
    ParserSchemeFunction,
    HandlerParserSchemes,
    valuesArgs,
    schemes,
    valueOf,
    LettuceInterface
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
        resultArgument = await argument(valueOf, values, schemes),

        /**
         * check for errors in arguments
         *
         * @param responseError - bug check response
         */
        responseError = await verifyErrors(resultArgument.errors);

    return {
        schemes: resultArgument.argument,
        args: resultArgument.body,
        errors: responseError.errors,
        message: responseError.message
    }
}


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
export class Lettuce extends Types implements LettuceInterface {

    /**
     * values to be validated
     * @defaultValue undefined
     */
    values: valuesArgs = undefined;

    /**
     * Object type property. List of validation schemes.
     * @defaultValue object
     */
    schemes: schemes | undefined = undefined;

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
        this.schemes = schemes;
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
        this.schemes = undefined;
        this.values = undefined;
    }
}

export default Lettuce;
