import {ResponseVerifyErrors, ErrorStatus} from "../functions/verifyErrors";

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
        message: 'args_validation_successful'
    }

    if (errors.length) {
        response.errors = errors;
        response.message = 'args_validation_errors';
        exception(response, 400);
    } else {
        return response
    }
}
