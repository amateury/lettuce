/**
 *  scheme validation
 */
export interface IScheme {
  target: string;
  type: any;
  required?: boolean;
  min?: number;
  max?: number;
  value?: ((value: any) => any) | any;
  strict?: boolean;
  validation?: any;
  message?: any;
}

/**
 * Values
 */
export type TValues = {
  [index: string | number]: any;
};

const isRequired = (
  required: boolean | undefined,
  val: any,
  reject: any
): void => {
  if (required && !val) reject({ data: false });
};

const valueType = async (type: any, val: any) => {
  return val ? new type(val) : val;
};

async function validScheme(scheme: IScheme, val: any, reject: any) {
  await isRequired(scheme.required, val, reject);
  return await valueType(scheme.type, val);
}

async function runValidation(
  schemes: IScheme[],
  values: TValues,
  resolve: any,
  reject: any
) {
  let len = schemes.length + 1;
  let resultValue = {};
  while (--len) {
    const scheme = schemes[schemes.length - len];
    const val = values ? values[scheme.target] : undefined;
    resultValue = {
      ...resultValue,
      [scheme.target]: await validScheme(scheme, val, reject),
    };
    if (len === 1) resolve(resultValue);
  }
}

export function parserScheme(schemes: IScheme[], values: TValues = {}) {
  return new Promise((resolve, reject) => {
    runValidation(schemes, values, resolve, reject).then();
  });
}
