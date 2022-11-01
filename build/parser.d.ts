declare type TTarget = string | number;
declare type TRegex = RegExp;
declare type TType = any | any[];
declare type TLabel = boolean | undefined;
declare type TResponseScheme = "string" | "object";
interface TProperty {
    type: TType;
    required?: boolean;
    min?: number;
    max?: number;
    value?: ((value: any) => any) | any;
    strict?: boolean;
    regex?: TRegex;
    label?: TLabel;
    response?: TResponseScheme;
}
export declare type TArgsMessageErr = {
    target: TTarget;
    validKey: string;
    valueKey: string;
};
declare type TArgsMessasaErrObj = {
    [index: string | number]: any;
};
export declare type TFuntinMessageErr = (message: string, args: TArgsMessageErr) => string | TArgsMessasaErrObj;
declare type TMessage = string | TFuntinMessageErr | {
    [P in keyof TProperty]?: string;
};
export interface IScheme extends TProperty {
    target: TTarget;
    message?: TMessage;
}
export declare type TValue = any;
/**
 * Values
 */
export declare type TValues = {
    [index: TTarget]: TValue;
};
export declare type TStrictCycle = boolean | number;
/**
 * Config
 */
export declare type TConfig = {
    strictCycle?: TStrictCycle;
} | null | undefined;
export declare type TErrorVal = {
    [index: string]: any;
    validation: string;
} | string | TArgsMessageErr | TArgsMessasaErrObj;
export declare type TErrors = {
    error: TErrorVal[];
    target: TTarget;
    value: any | any[];
};
/**
 * Analyze the values provided according to your schema.
 * @param schemes - Schemes
 * @example
 * Example of a schematic:
 *```json
 *[
 *  { target: "email", type: String, required: true, strict: true},
 *  { target: "name", type: String, required: true, strict: true, min: 8, max: 80},
 *  { target: "password", type: String, required: true, strict: true, min: 8},
 *]
 *```
 * @param values - Data to validate
 * @example
 * Example of a data to validate:
 * ```json
 * {
 *   email: "lettuce@lettuce.com",
 *   name: "Lettuce",
 *   password: "sW6LT#Fh",
 * }
 * ```
 * @param config - Config
 */
export declare function parserScheme(schemes: IScheme[], values: TValues | undefined, config: TConfig): Promise<TValues>;
export {};
