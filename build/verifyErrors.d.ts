import { ResponseVerifyErrors, ErrorStatus } from "../functions/verifyErrors";
export declare function exception(response: ResponseVerifyErrors, code: number): void;
/**
 * validate errors and send message
 *
 * @param errors -
 */
export declare function verifyErrors(errors: ErrorStatus[]): Promise<ResponseVerifyErrors | any>;
