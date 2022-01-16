import * as SW from '../functions/help';

/**
 * Identify if it is running in a browser
 */
export const isBrowser: () => boolean = () => typeof window !== 'undefined'
    && ({}).toString.call(window) === '[object Window]';

/**
 * Identify if it is running in a nodejs
 */
export const isNode: () => boolean = () => typeof global !== "undefined"
    && ({}).toString.call(global) === '[object global]';

/**
 * validate if it is an array
 *
 * @param elm - element validation
 * @returns boolean
 */
export function isArray(elm: any): boolean {
    return Array.isArray(elm);
}

/**
 * validate if it is an objet
 *
 * @param elm - element validation
 * @returns boolean
 */
export function isObject(elm: any): boolean {
    return elm instanceof Object;
}

/**
 * validate if it is an string
 *
 * @param elm - element validation
 * @returns boolean
 */
export function isString(elm: any): boolean {
    return typeof elm === "string";
}

/**
 * validate if it is an number
 *
 * @param elm - element validation
 * @returns boolean
 */
export function isNumber(elm: any): boolean {
    return typeof elm === "number";
}

/**
 * Functions validations (isArray, isString)
 *
 */
export const validate = new Map<string, SW.isValid>();
validate.set('Array', isArray);
validate.set('String', isString);
validate.set('Number', isNumber);
validate.set('Object', isObject);
validate.set('Browser', isBrowser);
validate.set('Browser', isNode);

