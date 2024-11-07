type TTarget = string | number;
type TRegex = RegExp;
type TType = any | any[];
type TLabel = boolean | undefined;
type TSplice<Val> = {
    [index: string]: Val;
    default: Val;
};
type TCompareValidate = (value: TValue, values: TValues) => boolean | string;
export type TCompare = {
    equal?: TTarget;
    distinct?: TTarget;
    validate?: TCompareValidate;
};
export interface IExtraProperty {
    required?: boolean;
    min?: number;
    max?: number;
    value?: ((value: any) => any) | any;
    strict?: boolean;
    regex?: TRegex;
    label?: TLabel;
    compare?: TCompare;
}
interface IProperty extends IExtraProperty {
    type: TType;
}
export type TArgsMessageErr = {
    target: TTarget;
    validKey: string;
    valueKey: string;
};
export type TFuntinMessageErr = (message: string, args: TArgsMessageErr) => string;
type TMessage = string | TFuntinMessageErr | ({
    -readonly [P in keyof typeof TypesErrorCompare]?: string;
} & {
    [P in keyof Omit<IProperty, "compare">]?: string;
});
interface IScheme1 extends IProperty {
    target: TTarget;
    message?: TMessage;
}
export type ISpliceShceme = {
    [K in keyof IScheme1]: K extends "required" | "strict" ? IScheme1[K] | TSplice<IScheme1[K]> : IScheme1[K];
};
export type IScheme = ISpliceShceme;
export type TValue = any;
/**
 * Values
 */
export type TValues = {
    [index: TTarget]: TValue;
};
export type TStrictCycle = boolean | number;
/**
 * Config
 */
export type TConfig = {
    strictCycle?: TStrictCycle;
    actName?: string;
} | null | undefined;
declare enum TypesErrorCompare {
    compareDistinct = "compareDistinct",
    compareEqual = "compareEqual",
    compareValidate = "compareValidate"
}
export type TErrorVal = string;
export type TErrors = {
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
