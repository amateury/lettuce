import * as AR from '../functions/arguments';
import * as VA from '../functions/validator';
import * as VE from '../functions/verifyErrors';
import {validate} from "./help";
import {exception} from './verifyErrors'

/**
 *
 * Response messages due to validation failure
 */
const messageArgument: AR.MessageArgument = {
    validation: () => ({
        message: `validation_custom`
    }),
    required: () => ({
        message: "required_field"
    }),
    min: (props) => ({
        message: "minimum_characters",
        value: props.validValue
    }),
    max: (props) => ({
        message: "maximum_characters",
        value: props.validValue
    }),
    strict: (props) => ({
        message: "{key}_expected_data_type_{type}"
            .replace('{key}', props.key)
            .replace('{type}', props.type)
            .toLowerCase()
    })
}

function ejectMessage(key: string, props: any): AR.MessageArgumentResponse | string {

    if (props.message && key) {
        if (typeof props.message == 'string') return props.message;
        return props.message[key];
    }

    switch (key) {
        case 'validation': return messageArgument.validation();
        case 'required': return messageArgument.required();
        case 'min': return messageArgument.min(props);
        case 'max': return messageArgument.max(props);
        case 'strict': return messageArgument.strict(props);
        default:
            throw 'non-specific validation function: undefined response message'
    }
}

/**
 *  list of validation functions
 *
 * @param funcArguments -
 */
const funcArguments: AR.funcArguments = {
    /**
     *  * custom validation, for the data type specified in the argument
     *
     * @example
     * ```json
     * {
     *    email: {
     *    type: Sandwich.String, validation: (value: string) => typeof value == 'string'
     *  }
     * }
     * ```
     * @param validValue -
     * @param value -
     */
    validation: ({validValue, value}) => validValue(value),
    /**
     * Validate value max
     *
     * @param type -
     * @param validValue -
     * @param value -
     */
    max: ({type, validValue, value}) => {
        if (typeof value === 'number'){
            return (value ?? 0) <= (validValue ?? 0);
        } else {
            const len = (type?.length ?? 0) ?? (type?.toString()?.length ?? 0);
            return len <= (validValue ?? 0);
        }

    },
    /**
     * Validate value min
     *
     * @param type -
     * @param validValue -
     * @param value -
     */
    min: ({type, validValue, value}) => {
        if (typeof value === 'number'){
            return (validValue ?? 0) >= (validValue ?? 0);
        } else {
            const len = (type?.length ?? 0) ?? (type?.toString()?.length ?? 0);
            return len >= (validValue ?? 0);
        }
    },
    /**
     * validate value required
     *
     * @param validValue -
     * @param value -
     */
    required: ({validValue, value}) => validValue ? (!!value || value === 0) : true,
    /**
     * Validate value type
     *
     * @param value -
     * @param func -
     * @param scheme -
     */
     type: (value, func, scheme) => {
        const list_type = ['String', 'Number', 'Object'];

        switch (func.name) {
            case 'Array': return func.from(value);
            default:
                if (list_type.includes(func.name)){
                    return new func(value)
                }
                return func(value, scheme);
        }
    },
    /**
     * Strictly validates the value of a data type
     *
     * @param strict - true to validate or false not to validate strict mode
     * @param type - Array
     * @param key - data (occupation)
     * @param value - `Developer`
     */
    validStrict: (strict, type, key, value) => {
        const valid = validate.get(type);

        if (strict && valid) {
            !valid(value) ? exception({
                message: "args_validation_errors",
                errors: [{
                    [key]: [messageArgument.strict({key, type})]
                }]
            }, 500): true
        }
    }
}

function validArguments(key: string, props: any): boolean {
    switch (key) {
        case 'required': return funcArguments.required(props);
        case 'min': return funcArguments.min(props);
        case 'max': return funcArguments.max(props);
        case 'validation': return funcArguments.validation(props);
        default:
            throw 'non-specific validation function'
    }
}

/**
 * Validate a data type
 *
 * @param value - value to validate "Developer"
 * @param key - value key (occupation)
 * @param scheme - scheme validation
 * ```json
 * {type: String}
 * ```
 */
async function validType ({value, key, scheme}: AR.compareProps): Promise<any> {
    const type: any = scheme['type'];
    const strict = scheme['strict'];
    const required = scheme['required'];

    if (type) {
        const name = type.type;
        required && value ? funcArguments.validStrict(strict, name, key, value): null;
        if (value === null || value === undefined) return value;
        return funcArguments.type(value, type, scheme);
    } else {
        exception({message: `${key} => ${value} no data type`}, 500);
    }
}

/**
 * Validate a schema against a value
 *
 * @param props - data
 * @param type - data type to validate example String
 * @param validValue - value of validation
 * @param keyValid - key main
 */
function validData(
    props: AR.compareProps, type: any, validValue: any, keyValid: keyof AR.MessageArgument
): Promise<AR.MessageArgumentResponse | boolean> {
    return new Promise((resolve) => {

        const {value, scheme, message, key: keyMain} = props;

        if(!validArguments(keyValid,{validValue, value, type, scheme})) {
            resolve(ejectMessage(keyValid, {validValue, value, type, keyValid, keyMain, message}));
        }

        resolve(false);
    })
}

/**
 * Validate a schema against a value
 *
 * @param props - data
 * @param type - data type to validate example String
 */
async function validExtractArgument (
    props: AR.compareProps, type: any
): Promise<(AR.MessageArgumentResponse | boolean)[]> {
    const validResponse = [];
    const {scheme} = props;

    /**
     *
     */
    if(scheme['required']) {
        const resp = await validData(props, type, scheme['required'], 'required')
        if(resp) validResponse.push(resp);
    }

    /**
     *
     */
    if(scheme['min']){
        const resp = await validData(props, type, scheme['min'], 'min');
        if(resp) validResponse.push(resp);
    }

    /**
     *
     */
    if(scheme['max']) {
        const resp = await validData(props, type, scheme['max'], 'max');
        if(resp) validResponse.push(resp);
    }

    /**
     *
     */
    if(scheme['validation']) {
        const resp =await validData(props, type, scheme['validation'], 'validation')
        if(resp) validResponse.push(resp)
    }

    return validResponse;
}

/**
 * validate Message
 *
 * @param errors -
 */
async function validRespArgument (errors: (AR.MessageArgumentResponse | boolean)[]): Promise<boolean> {
    return !errors.length;
}

/**
 * Validate an argument schema
 *
 * @param props - data
 *
 * @example
 * ```json
 * {
 *     value: "example@sandwich.com"
 *     key: "email"
 *     scheme: {type: Sandwich.String, strict: true}
 * }
 * ```
 */
async function validArgument (props: AR.compareProps): Promise<AR.validArgumentResp> {

    const type =  await validType(props);
    const errors = await validExtractArgument(props, type);
    const success = await validRespArgument(errors);

    return {errors: errors, success, value: type}
}

/**
 * Extract the defined value from the req or in the schema
 * (any value passed by req will be replaced by the value is defined in the schema)
 *
 * @param reqBody - data body
 * @param scheme -
 * @param key - field key to validate
 */
function getValue(reqBody: { [index: string | number]: any }, scheme: VA.scheme, key: string | number): any {
    const definedValue = scheme['value'] ?? reqBody[key];
    return definedValue instanceof Function ? definedValue() : definedValue;
}

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
export async function argument(
    valueOf: boolean, reqBody: object, schemes?: VA.schemes
): Promise<AR.argumentProps> {
    const resp = {};
    const body = {};
    const errors: VE.ErrorStatus[] = []

    if(!schemes) exception({message: `schemes is ${schemes}`}, 500)

    for (const key in schemes) {
        const scheme = schemes[key] ?? null;
        if(scheme) {

            const validated = await validArgument({
                value: getValue(reqBody, scheme, key),
                key: key,
                message: scheme['message'] ?? null,
                scheme: scheme
            });

            Object.defineProperty(resp, key, {
                enumerable: true,
                value: validated
            });

            Object.defineProperty(body, key, {
                enumerable: true,
                value: valueOf || !validated.value ? validated.value : validated.value.valueOf()
            });

            if (validated.errors.length) {
                errors.push({[key]: validated.errors})
            }

        }
    }

    return {
        argument: resp,
        body,
        errors
    };
}
