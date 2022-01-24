import {ResponseVerifyErrors, ErrorStatus} from "../functions/verifyErrors";

export const MessageValidationErrors = "args_validation_errors";
export const MessageValidationSuccessful = "args_validation_successful"

/**
 * Generate exception
 * 
 * @param response - data response
 */
function error(response: ResponseVerifyErrors): ResponseVerifyErrors {
    throw response;
}

/**
 * Raise exception for errors handled from a server
 * 
 * @param response - data response
 * @param code - status code
 */
function responseServerError(response: ResponseVerifyErrors, code: number): ResponseVerifyErrors {
    const {message, errors} = response;
    throw {"statusCode": code, "message": message, errors};
}

/**
 * Throw exception, the response returns the key status code depending on the ecosystem where the deployment is running
 * 
 * @param response - data response
 * @param code - status code
 */
export function exception(response: ResponseVerifyErrors, code: number) {
    typeof window !== 'undefined'
    && ({}).toString.call(window) === '[object Window]'
        ? error(response) : responseServerError(response, code);
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
