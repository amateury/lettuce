export declare type TIsValidate = (elm: any) => boolean;
/**
 * Identify if it is running in a nodejs
 */
export declare const isNode: () => boolean;
/**
 * Identify if it is running in a browser
 */
export declare const isBrowser: () => boolean;
/**
 * validate if it is an array
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare function isArray(elm: any): boolean;
/**
 * validate if it is an objet
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare function isObject(elm: any): boolean;
/**
 * validate if it is an string
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare function isString(elm: any): boolean;
/**
 * validate if it is a number
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare function isNumber(elm: any): boolean;
/**
 * validate if it is a number
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare function isBoolean(elm: any): boolean;
/**
 * Functions validations (isArray, isString)
 *
 */
export declare const validate: Map<string, TIsValidate>;
