import {ResponseVerifyErrors, ErrorStatus} from "../functions/verifyErrors";
import {isBrowser} from "./help";

export const MessageValidationErrors = "args_validation_errors";
export const MessageValidationSuccessful = "args_validation_successful";

/**
 * Throw exception, the response returns the key status code depending on the ecosystem where the deployment is running
 * 
 * @param response - data response
 * @param code - status code
 */
export function exception(response: ResponseVerifyErrors, statusCode?: number) {
    const {message, errors} = response;
    if(statusCode && !isBrowser()) throw {statusCode, message, errors};
    throw {message, errors};
}

/**
 * validate errors and send message
 *
 * @param errors - Array data errors
 */
export async function verifyErrors(
    errors: ErrorStatus[]
): Promise<ResponseVerifyErrors | any> {

    const response: ResponseVerifyErrors = {
        errors: [],
        message: MessageValidationSuccessful
    }

    if (errors.length) {
        response.errors = errors;
        response.message = MessageValidationErrors;
        exception(response, 400);
    } else {
        return response
    }
}
