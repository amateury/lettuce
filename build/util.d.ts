export type TKey = string | number;
export interface TTripArg {
    value: any;
    key: TKey;
    thing: any;
    len: number;
    index: number;
}
/**
 * traverse an object
 * @param thing - Object
 * @param callBack - callback function
 */
export declare function trip(thing: any, callBack: (arg: TTripArg) => any): Promise<any>;
export declare function capitalizeWord(str: string): string;
