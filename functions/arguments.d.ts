import {TypeValid, scheme, schemes} from './validator';
import {ErrorStatus} from "./verifyErrors";


/**
 * messageType
 */
 export type messageType = string | {[index: string]: string} | null;

/**
 * keyType
 */
export type keyType = number | string;

/**
 * respType
 */
export type respType = string;

/**
 * valueType
 */
export type valueType = any;

/**
 * argMessProps
 */
export interface argMessProps {
    value?: any,
    validValue?: any,
    type?: valueType,
    key?: any,
    key_validation?: string | number
}

/**
 * argumentProps
 */
export interface argumentProps {
    argument: any,
    body: any,
    errors: ErrorStatus[]
}

/**
 * argValid
 */
export interface argValid {
    value: any,
    validValue: any,
    type: valueType,
    key: keyType,
    scheme?: schemes
}

/**
 *  list of validation functions
 */
export interface funcArguments {
    /**
     * 
     */
    validation: ({type, valid_value, value}: argValid) => boolean,
    /**
     * Validate value max
     *
     * @param type -
     * @param valid_value -
     * @param value -
     */
    max: ({type, valid_value, value}: argValid) => boolean,
    /**
     * Validate value min
     *
     * @param type -
     * @param valid_value -
     * @param value -
     */
    min: ({type, valid_value, value}: argValid) => boolean,
    /**
     * validate value required
     *
     * @param valid_value -
     * @param value -
     */
    required: ({valid_value, value}: argValid) => boolean,
    /**
     * Validate value type
     *
     * @param valid -
     * @param value -
     * @param scheme -
     */
    type: (valid: (props: any) => void | string, value: any, scheme: scheme) => TypeValid,
    /**
     * Strictly validates the value of a data type
     *
     * @param strict - true to validate or false not to validate strict mode
     * @param type - Array
     * @param key - data (occupation)
     * @param value - `Developer`
     * ```json
     * {(strict: boolean, type: string, key: keyType, value: valueType)}
     * ```
     */
    validStrict: (strict: boolean | undefined, name: string, key: keyType, value: valueType, scheme: scheme) => any
}

/**
 * messValid
 */
export type messValid = {
    message: string;
    value?: string | number;
}

export type MessageArgumentResponse = messValid | respType;

/**
 * MessageArgument
 */
export interface MessageArgument {
    required: () => MessageArgumentResponse,
    min: (props: argMessProps) => MessageArgumentResponse,
    max: (props: argMessProps) => MessageArgumentResponse,
    strict: (props: argMessProps) => MessageArgumentResponse,
    validation: () => MessageArgumentResponse,
}

/**
 * Validate an argument schema
 */
export type validArgumentResp = {
    errors: any[],
    success: boolean,
    value: string | any[] | number | boolean | object
}


/**
 * compareProps
 */
export interface compareProps {
    value: valueType, // value to be validated example "Bryant Salgado"
    key: keyType, // key main
    message: messageType,
    scheme: scheme, // data validation schema
}
