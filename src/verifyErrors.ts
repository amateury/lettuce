import {ResponseVerifyErrors, ErrorStatus} from "../functions/verifyErrors";

function error(response: ResponseVerifyErrors): ResponseVerifyErrors {
    throw response;
}

function responseServerError(response: ResponseVerifyErrors, code: number): ResponseVerifyErrors {
    const {message, errors} = response;
    throw {"statusCode": code, "message": message, errors};
}

export function exception(response: ResponseVerifyErrors, code: number) {
    typeof window !== 'undefined'
    && ({}).toString.call(window) === '[object Window]'
        ? error(response) : responseServerError(response, code);
}

/**
 * validate errors and send message
 *
 * @param errors -
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
