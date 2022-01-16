import * as AR from '../functions/arguments';
import * as VA from '../functions/validator';
/**
 * This function validates all body data specified in the arguments
 *
 * @param valueOf - true stops returning the data to its primitive value of its instance
 * @param reqBody - request body
 * ```json
 * {email: "example@sandwich.com"}
 * ```
 * @param schemes - schemes of validation `{ email: {type: Sandwich.String, strict: true} }`
 */
export declare function argument(valueOf: boolean, reqBody: object, schemes?: VA.schemes): Promise<AR.argumentProps>;
