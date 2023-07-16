declare type TTarget = string | number;
declare type TRegex = RegExp;
declare type TType = any | any[];
declare type TLabel = boolean | undefined;
declare type TSplice<Val> = {
    [index: string]: Val;
    default: Val;
};
export interface IExtraProperty {
    required?: boolean;
    min?: number;
    max?: number;
    value?: ((value: any) => any) | any;
    strict?: boolean;
    regex?: TRegex;
    label?: TLabel;
}
interface IProperty extends IExtraProperty {
    type: TType;
}
export declare type TArgsMessageErr = {
    target: TTarget;
    validKey: string;
    valueKey: string;
};
export declare type TFuntinMessageErr = (message: string, args: TArgsMessageErr) => string;
declare type TMessage = string | TFuntinMessageErr | {
    [P in keyof IProperty]?: string;
};
interface IScheme1 extends IProperty {
    target: TTarget;
    message?: TMessage;
}
export declare type ISpliceShceme = {
    [K in keyof IScheme1]: K extends "required" | "strict" ? IScheme1[K] | TSplice<IScheme1[K]> : IScheme1[K];
};
export declare type IScheme = ISpliceShceme;
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
    actName?: string;
} | null | undefined;
export declare type TErrorVal = string;
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
