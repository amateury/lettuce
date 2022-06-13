export type TIsValidate = (elm: any) => boolean;

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
 * validate if it is a number
 *
 * @param elm - element validation
 * @returns boolean
 */
export function isNumber(elm: any): boolean {
  return typeof elm === "number";
}

/**
 * validate if it is a number
 *
 * @param elm - element validation
 * @returns boolean
 */
export function isBoolean(elm: any): boolean {
  return typeof elm === "boolean";
}

/**
 * Functions validations (isArray, isString)
 *
 */
export const validate = new Map<string, TIsValidate>();
validate.set("Array", isArray);
validate.set("String", isString);
validate.set("Number", isNumber);
validate.set("Object", isObject);
validate.set("Boolean", isBoolean);
