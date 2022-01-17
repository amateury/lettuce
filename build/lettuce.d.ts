import Types from "./type";
import { ParserSchemeFunction, HandlerParserSchemes, ValidatorsClass, valuesArgs, schemes, valueOf } from "../functions/validator";
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
export declare const parserSchemes: HandlerParserSchemes;
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
export declare class Lettuce extends Types implements ValidatorsClass {
    /**
     * values to be validated
     * @defaultValue undefined
     */
    values: valuesArgs;
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
    valueOf: valueOf;
    /**
     * Creates an instance of Sandwiches.
     */
    constructor(schemes?: schemes);
    /**
     * parse and validate request body data
     *
     * @param values - Data subject to validation
     * @returns ParserSchemesResponse
     */
    parserSchemes(values?: valuesArgs): ParserSchemeFunction;
    /**
     * Reset data:
     * ```ts
     *  this.valueOf = true;
     *  this.schemes = {};
     *  this.values = undefined;
     * ```
     */
    reset(): void;
}
export default Lettuce;
