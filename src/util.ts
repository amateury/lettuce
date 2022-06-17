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
export async function trip(thing: any, callBack: (arg: TTripArg) => any) {
  const keys: TKey[] = Object.keys(thing);
  let len: number = keys.length + 1;
  while (--len) {
    const index: number = keys.length - len;
    const key = keys[index];
    const value = thing[key];
    const resp = await callBack({ value, key, thing, index, len });
    if (resp) return resp;
  }
}
