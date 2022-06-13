import { validate, isBoolean } from "./help";

type TTarget = string | number;
type TRegex = RegExp;
type TType = any;

export interface IScheme {
  target: TTarget;
  type: TType;
  required?: boolean;
  min?: number;
  max?: number;
  value?: ((value: any) => any) | any;
  strict?: boolean;
  regex?: TRegex;
  message?: any;
}

export type TValue = any;

/**
 * Values
 */
export type TValues = {
  [index: TTarget]: TValue;
};

export type TErrorVal = string;

export type TErrors = {
  error: TErrorVal[];
  target: TTarget;
  value: any | any[];
};

/**
 * Run a bug
 * @param e - Error
 */
const error = (e: any) => {
  throw e;
};

/**
 * Validate is required
 * @param required - Value required (boolean)
 * @param val - Value of validation
 */
const isRequired = async (
  required: boolean | undefined,
  val: TValue
): Promise<void> => {
  if (required && !val && !isBoolean(val)) error("required");
};

/**
 * In this function, the custom data type is validated through
 * the static method __validate__.
 * @param val - Value of validation
 * @param type - Data type
 */
const customValidateValue = async (val: TValue, type: TType) => {
  try {
    const valid = await type.__validate__(val);
    /* istanbul ignore else */
    if (!valid) {
      error("type");
    }
  } catch (e) {
    if (e === "type") error(e);
    error(`No validation custom format found: ${e}`);
  }
};
/**
 * Validate data type
 * @param scheme - Type to validation
 * @param val - Value of validation
 * @param type - Data type
 * @param strict - It is a boolean to know if the data will be
 * strictly validated
 */
const validateValueType = async (
  scheme: IScheme,
  val: TValue,
  type: TType,
  strict: boolean | undefined
): Promise<TValue> => {
  if (strict) {
    const validateStrict = validate.get(type.name);
    if (validateStrict) {
      if (!validateStrict(val)) error("type");
    } else {
      await customValidateValue(val, type);
    }
  }

  let formatVal: any;
  if (type.name === "Array") {
    formatVal = val ? type.from(val) : val;
  } else {
    formatVal = val ? type(val) : val;
  }
  return val
    ? await complementaryValidation(scheme, formatVal, type.name)
    : val;
};

/**
 * Validate data type
 * @param scheme - Type to validation
 * @param val - Value of validation
 * @param type - Data type
 */
const valuePick = async (scheme: IScheme, val: TValue, type: TType) => {
  const keys = Object.keys(type);
  let len: number = keys.length + 1;
  while (--len) {
    const typeOrPick = type[keys[keys.length - len]];
    if (typeOrPick instanceof Function) {
      const nameFuncType = typeOrPick.name;
      try {
        const nameFuncTypeLCase = nameFuncType.toString().toLocaleLowerCase();
        /* istanbul ignore else */
        if (nameFuncTypeLCase === typeof val) {
          return await validateValueType(scheme, val, typeOrPick, undefined);
        }
        // eslint-disable-next-line no-empty
      } finally {
      }
    } else {
      if (val === typeOrPick) return val;
    }
    if (len === 1) error("pick");
  }
};

/**
 * Formats the target value to the specified type
 * @param scheme - Type to validation
 * @param val - Value of validation
 */
const valueType = async (scheme: IScheme, val: TValue): Promise<TValue> => {
  const type = scheme.type; // Type to validation
  const strict = scheme.strict; //Validation strict
  if (typeof type === "object") return await valuePick(scheme, val, type);
  return await validateValueType(scheme, val, type, strict);
};

/**
 * Evaluate minimum value
 * @param val - Value of validation
 * @param min - Value of minimum (number)
 * @param typeName - Name function type
 */
const min = async (val: TValue, min: number, typeName: string) => {
  let validMin = null;
  if (val.length) {
    validMin = val.length >= min;
  } else if (typeName === "Number" || typeName === "BigInt") {
    validMin = val >= min;
  }
  if (validMin !== null && !validMin) error("min");
  if (!validMin)
    error(
      `it is not possible to evaluate the minimum value for the type: ${typeof val}`
    );
  return validMin;
};

/**
 * Evaluate maximum value
 * @param val - Value of validation
 * @param max - Value of maximum (number)
 * @param typeName - Name function type
 */
const max = async (val: TValue, max: number, typeName: string) => {
  let validMin = null;

  if (val.length) {
    validMin = val.length <= max;
  } else if (typeName === "Number" || typeName === "BigInt") {
    validMin = val <= max;
  }
  if (validMin !== null && !validMin) error("max");
  if (!validMin)
    error(
      `it is not possible to evaluate the maximum value for the type: ${typeof val}`
    );

  return validMin;
};

const regexValid = async (val: TValue, reg: TRegex) => {
  if (!reg.test(val)) error("regex");
};

/**
 * Complementary validation: minimum value, maximum value
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 * @param typeName - Name function type
 */
async function complementaryValidation(
  scheme: IScheme,
  val: TValue,
  typeName: string
): Promise<TValue> {
  if (scheme.min) await min(val, scheme.min, typeName);
  if (scheme.max) await max(val, scheme.max, typeName);
  if (scheme.regex) await regexValid(val, scheme.regex);

  return val;
}

/**
 * Add the default value, set the value property, the value property can be a
 * function and will be interpreted as a callback
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 */
const valueDefault = async (scheme: IScheme, val: TValue): Promise<TValue> => {
  if (scheme.value && scheme.value instanceof Function)
    return await scheme.value(val);
  return scheme.value !== undefined && !val ? scheme.value : val;
};

type TRValidScheme = [TErrorVal[], TValue];

/**
 * Function that validates the value against the schema data
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 */
async function validScheme(
  scheme: IScheme,
  val: TValue
): Promise<TRValidScheme> {
  const errors: TErrorVal[] = [];
  const strict = scheme.strict;

  await isRequired(scheme.required, val).catch((e: any) => error(e));

  return await valueType(scheme, val)
    .catch((e: any) => {
      strict ? error(e) : errors.push(e);
    })
    .then((resp) => [errors, resp ?? val]);
}

type TResolution = (value: [TTarget, TValue]) => void;
type TCallBackErr = (value: TErrors) => void;

/**
 * Function that serves as a bridge between validScheme and parserScheme
 * @param resolution - callback that sets the resolved values
 * @param callBackErr - callback that sets the values with error
 * @param scheme - Scheme
 * @param val - Value of validation
 */
async function runValidation(
  resolution: TResolution,
  callBackErr: TCallBackErr,
  scheme: IScheme,
  val: any
) {
  await validScheme(scheme, val)
    .then(([err, value]) => {
      if (err.length) {
        return callBackErr({
          error: [...err],
          target: scheme.target,
          value: val,
        });
      }
      resolution([scheme.target, value]);
    })
    .catch((e) => {
      error([
        {
          error: [e],
          target: scheme.target,
          value: val,
        },
      ]);
    });
}

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
 */
export async function parserScheme(schemes: IScheme[], values: TValues = {}) {
  let len = schemes.length + 1;

  type TFun = {
    _values: TValues;
    values: TValues;
    _errors: TErrors[];
    resolution: TResolution;
    callBackErr: TCallBackErr;
  };

  const fun: TFun = {
    _values: {},
    _errors: [],
    get values(): TValues {
      return this._values;
    },
    resolution([target, val]: [TTarget, TValue]): void {
      if (val !== undefined)
        Object.defineProperty(fun._values, target, {
          enumerable: true,
          value: val,
        });
    },
    callBackErr(value: TErrors) {
      fun._errors.push(value);
    },
  };

  while (--len) {
    const scheme = schemes[schemes.length - len];
    const val = await valueDefault(scheme, values[scheme.target]);
    await runValidation(fun.resolution, fun.callBackErr, scheme, val);
  }
  return fun._errors.length ? error(fun._errors) : fun.values;
}
