import { ResponseVerifyErrors, ErrorStatus } from "../functions/verifyErrors";
/**
 * Throw exception, the response returns the key status code depending on the ecosystem where the deployment is running
 *
 * @param response - data response
 * @param code - status code
 */
export declare function exception(response: ResponseVerifyErrors, code: number): void;
/**
 * validate errors and send message
 *
 * @param errors - Array data errors
 */
export declare function verifyErrors(errors: ErrorStatus[]): Promise<ResponseVerifyErrors | any>;
