import {messageType} from './arguments';
import Lettuce from "../src";
export type validationFun = (value: any) => any;

type FuncTypeValid = (props: any) => void;

/**
 * TypeValid
 */
export interface TypeValid {
    String?: FuncTypeValid,
    Number?: FuncTypeValid,
    Array?: FuncTypeValid,
    Boolean?: FuncTypeValid,
    Object?: FuncTypeValid,
}

/**
 *  scheme validation
 */
export interface scheme {
    type?: FuncTypeValid,
    required?: boolean,
    min?: number,
    max?: number,
    value?: any,
    strict?: boolean,
    validation?: validationFun,
    message?: messageType
}

/**
 * schemes
 */
export type schemes = {[index: string]: scheme} | null;

/**
 *
 */
export type ParserSchemesResponse = {
    schemes: any,
    args: {[index: string | number]},
    errors: any[],
    message: string,
};

export type ParserSchemeFunction = Promise<ParserSchemesResponse<any>>;

/**
 *
 */
type valuesArgs = {[index: string | number]} | undefined;

/**
 *
 */
type valueOf = boolean;

export interface ParserLettuceInterface {
    parserSchemes(values?: valuesArgs): ParserSchemeFunction;
    /**
     *
     * @param schemes -
     * @param args -
     */
    addSchemes(schemes: schemes, args: string | string[]): void;
    /**
     *
     * @param schemes -
     * @param args -
     */
    addScheme(schemes: scheme, args: string | string[]): void;
}

/**
 *
 */
export type HandlerParserSchemes = (
    valueOf?: valueOf,
    schemes?: schemes,
    values?: valuesArgs
) => ParserSchemeFunction;

/**
 * class Sandwiches
 *
 */
export interface LettuceInterface extends TypeValid {
    readonly schemes: schemes;
    /**
     *
     */
    valueOf: boolean;
    /**
     *
     */
    values: valuesArgs;
    /**
     *
     * @param body -
     * @returns ParserSchemeFunction
     */
    parserSchemes(body?: valuesArgs): ParserSchemeFunction;
}

/**
 *
 */
export type resolvePromiseScheme = (scheme: scheme) => void;

/**
 *
 */
export type FuncResolvePromiseScheme = (
    resolve: resolvePromiseScheme
) => void;
