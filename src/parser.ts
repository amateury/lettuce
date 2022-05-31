import { validate } from "./help";

type TTarget = string | number;

export interface IScheme {
  target: TTarget;
  type: any;
  required?: boolean;
  min?: number;
  max?: number;
  value?: ((value: any) => any) | any;
  strict?: boolean;
  validation?: any;
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
  if (required && !val) error("required");
};

/**
 * Formats the target value to the specified type
 * @param scheme - Type to validation
 * @param val - Value of validation
 */
const valueType = async (scheme: IScheme, val: TValue): Promise<TValue> => {
  const type = scheme.type; // Type to validation
  const strict = scheme.strict; //Validation strict
  if (strict) {
    const validateStrict = validate.get(type.name);
    if (validateStrict) {
      if (!validateStrict(val)) error("type");
    } else {
      try {
        const valid = await type.__validate__(val);
        if (!valid) error("type");
      } catch (e) {
        console.error(e);
        if (e !== "type") error("No validation custom format found");
        error(e);
      }
    }
  }

  let formatVal: any;
  if (type.name === "Array") {
    formatVal = val ? type.from(val) : val;
  } else {
    formatVal = val ? type(val) : val;
  }
  return val ? await complementaryValidation(scheme, formatVal) : val;
};

/**
 * Evaluate minimum value
 * @param val - Value of validation
 * @param min - Value of minimum (number)
 * @param typeName -
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
      `it is not possible to evaluate the maximum value for the type:: ${typeof val}`
    );

  return validMin;
};

/**
 * Add the default value, set the value property, the value property can be a
 * function and will be interpreted as a callback
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 */
const valueDefault = async (scheme: IScheme, val: TValue): Promise<TValue> => {
  if (scheme.value && scheme.value instanceof Function)
    return await scheme.value(val);
  if (scheme.value !== undefined) return scheme.value;
  return val;
};

/**
 * Complementary validation: minimum value, maximum value
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 */
async function complementaryValidation(
  scheme: IScheme,
  val: TValue
): Promise<TValue> {
  if (scheme.min) await min(val, scheme.min, scheme.type.name);
  if (scheme.max) await max(val, scheme.max, scheme.type.name);

  return val;
}

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

  await isRequired(scheme.required, val).catch((e: any) =>
    strict ? error(e) : errors.push(e)
  );

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
