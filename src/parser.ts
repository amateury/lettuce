import { validate, isBoolean } from "./help";
import { capitalizeWord, trip } from "./util";

type TTarget = string | number;
type TRegex = RegExp;
type TType = any | any[];
type TLabel = boolean | undefined;

type TSplice<Val> = {
  [index: string]: Val;
  default: Val;
}

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

export type TArgsMessageErr = {
  target: TTarget;
  validKey: string;
  valueKey: string;
}

type TArgsMessasaErrObj = { [index: string | number]: any }

export type TFuntinMessageErr = (message: string, args: TArgsMessageErr) => string | TArgsMessasaErrObj

type TMessage = string | TFuntinMessageErr | {
  [P in keyof IProperty]?: string;
}

interface IScheme1 extends IProperty {
  target: TTarget;
  message?: TMessage;
}

export type ISpliceShceme = {
  [K in keyof IScheme1]: K extends "required" | "strict" ?
  IScheme1[K] | TSplice<IScheme1[K]> :
  IScheme1[K];
}

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
export type TConfig =
  | {
      strictCycle?: TStrictCycle;
      actName?: string;
    }
  | null
  | undefined;

enum TypesErrors {
  type = "type",
  min = "min",
  max = "max",
  required = "required",
  regex = "regex",
  strict = "strict"
}

export type TErrorVal = {
  [index: string]: any;
  validation: string;
} | string | TArgsMessageErr | TArgsMessasaErrObj;

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
 * Generate new Error
 * @param e - Error
 */
const newError = (e: any) => {
  error(new Error(e));
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
  if (required && !val && !isBoolean(val)) error(TypesErrors.required);
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
      error(TypesErrors.type);
    }
  } catch (e) {
    if (e === TypesErrors.type) error(e);
    newError(`No validation custom format found: ${e}`);
  }
};
/**
 * Validate data type
 * @param scheme - Type to validation
 * @param val - Value of validation
 * @param type - Data type
 */
const validateValueType = async (
  scheme: IScheme1,
  val: TValue,
  type: TType
): Promise<TValue> => {
  // It is a boolean to know if the data will be strictly validated
  if (scheme.strict && val !== undefined) {
    const validateStrict = validate.get(type.name);
    if (validateStrict) {
      if (!validateStrict(val)) error(TypesErrors.strict);
    } else {
      await customValidateValue(val, type);
    }
  }

  let formatVal: TValue = val;
  if (type.name === "Array") {
    formatVal = val ? type.from(val) : val;
  } else if (Object.prototype.hasOwnProperty.call(type, "__validate__")) {
    await customValidateValue(val, type);
  } else {
    formatVal = val ? type(val) : val;
  }

  return formatVal;
};

/**
 * Validate data type
 * @param scheme - Type to validation
 * @param val - Value of validation
 * @param type - Data type
 */
const valuePick = async (scheme: IScheme1, val: TValue, type: TType) => {
  type TTripArg = { value: TValue; len: number };
  if (!type.length && type.length !== undefined) error(TypesErrors.type);
  return await trip(type, async ({ value, len }: TTripArg) => {
    if (value instanceof Function) {
      try {
        return await validateValueType(scheme, val, value);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    } else {
      if (val === value || val === undefined) return val;
      else if (typeof value === "object" && value) {
        const resultValid = await trip(value, ({ value: v }) => v === val);
        /* istanbul ignore else */
        if (resultValid) return val;
      }
    }
    if (len === 1) error(TypesErrors.type);
  });
};

/**
 * Formats the target value to the specified type
 * @param scheme - Type to validation
 * @param val - Value of validation
 */
const valueType = async (scheme: IScheme1, val: TValue): Promise<TValue> => {
  const type = scheme.type; // Type to validation
  return await (typeof type === "object"
    ? valuePick(scheme, val, type)
    : validateValueType(scheme, val, type));
};

/**
 * Evaluate minimum value
 * @param val - Value of validation
 * @param min - Value of minimum (number)
 * @param typeName - Name function type
 */
const min = async (val: TValue, min: number, typeName: string) => {
  let validMin = null;
  const _typeName = capitalizeWord(typeName);
  if (val.length) {
    validMin = val.length >= min;
  } else if (_typeName === "Number" || _typeName === "BigInt") {
    validMin = val >= min;
  }
  if ((validMin !== null && !validMin) || !validMin) error(TypesErrors.min);
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
  const _typeName = capitalizeWord(typeName);
  if (val.length) {
    validMin = val.length <= max;
  } else if (_typeName === "Number" || _typeName === "BigInt") {
    validMin = val <= max;
  }
  if ((validMin !== null && !validMin) || !validMin) error(TypesErrors.max);
  return validMin;
};

const regexValid = async (val: TValue, reg: TRegex) => {
  if (!new RegExp(reg).test(val)) error(TypesErrors.regex);
};

/**
 * Extra validation: minimum value, maximum value, regex
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 * @param typeName - Name function type
 * @param callBack -
 */
async function extraValidation(
  scheme: IScheme1,
  val: TValue,
  typeName: string,
  callBack: any
): Promise<TValue> {
  const valIsValid = scheme.required
    ? scheme.required
    : !(!val && !scheme.required);
  if (scheme.min && valIsValid)
    await min(val, scheme.min, typeName).catch(callBack);
  if (scheme.max && valIsValid)
    await max(val, scheme.max, typeName).catch(callBack);
  if (scheme.regex && valIsValid)
    await regexValid(val, scheme.regex).catch(callBack);

  return val;
}

/**
 * Add the default value, set the value property, the value property can be a
 * function and will be interpreted as a callback
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 */
const valueDefault = async (scheme: IScheme1, val: TValue): Promise<TValue> => {
  if (scheme.value && scheme.value instanceof Function)
    return await scheme.value(val);
  return scheme.value !== undefined && !val ? scheme.value : val;
};

function labelFormat(label: string, scheme: IScheme1, type: TypesErrors) {
  const matchScheme = {
    "{target}": scheme.target,
    "{validKey}": type,
    "{valueKey}": scheme[type],
  }

  return label.replace(/\{.+?\}/g, (val: any) => {
    const index: keyof typeof matchScheme = val;
    return matchScheme[index];
  })
}

/**
 * Controlar el mensaje de respuesta de error
 * @param scheme - Scheme of validation
 * @param e - error type property 
 */
function ErrorMessage(scheme: IScheme1, e: TypesErrors): TArgsMessageErr | TArgsMessasaErrObj | string {
  if (typeof scheme.message === "string") {
    return scheme.message;
  }

  if (typeof scheme.message === "function") {
    return scheme.message(labelFormat("{target}_{validKey}", scheme, e), {
      target: scheme.target,
      validKey: e,
      valueKey: scheme[e],
    })
  }

  if (scheme.message) {
    const message = scheme.message[e];
    /* istanbul ignore else */
    if (message) return message;
  }

  return labelFormat("{target}_{validKey}", scheme, e);
}

type TRValidScheme = [TValue, TErrorVal[]];

/**
 * Function that validates the value against the schema data
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 */
async function validScheme(
  scheme: IScheme1,
  val: TValue
): Promise<TRValidScheme> {
  const errors: TErrorVal[] = [];
  const pushError = (e: TypesErrors) => {
    if (e in TypesErrors) {
      errors.push(ErrorMessage(scheme, e));
    } else {
      error(e);
    }
  };

  await isRequired(scheme.required, val).catch(pushError);

  if (errors.length) return [val, errors];

  const formatVal = await valueType(scheme, val).catch(pushError);

  if (errors.length) return [formatVal, errors];

  const typeName = typeof formatVal;
  const respVal = await extraValidation(scheme, formatVal, typeName, pushError);
  return [respVal, errors];
}

type TResolution = (value: [TTarget, TValue]) => void;
type TCallBackErr = (value: TErrors, index: number) => void;

/**
 * Function that serves as a bridge between validScheme and parserScheme
 * @param resolution - callback that sets the resolved values
 * @param callBackErr - callback that sets the values with error
 * @param scheme - Scheme
 * @param val - Value of validation
 * @param index - Counting rate
 */
async function runValidation(
  resolution: TResolution,
  callBackErr: TCallBackErr,
  scheme: IScheme1,
  val: any,
  index: number
) {
  await validScheme(scheme, val).then(([value, errors]) => {
    if (!errors.length) {
      resolution([scheme.target, value]);
    } else {
      const er = {
        error: errors,
        target: scheme.target,
        value: val,
      };
      callBackErr(er, index);
    }
  });
}

/**
 * Identify actor value
 * @param val - val is value boolean or json
 * ```json
 * { act: true, default: true }
 * ```
 * @param actName - name act
 * @returns 
 */
const actValue = (val: any, actName: string): boolean | undefined => {
  if (Object.prototype.hasOwnProperty.call(val, "default")) {
    if(Object.prototype.hasOwnProperty.call(val, actName)) return val[actName];
    return val["default"];
  }
  return val;
}

/**
 * Extract actor value
 * @param val - Value is value boolean or json
 * ```json
 * { act: true, default: true }
 * ```
 * @param actName - Name act
 * @param _default - Value default
 * @returns boolean
 */
function getValueAct(val: boolean, actName: string, _default: boolean): boolean | undefined {
  if (val === undefined) return _default;
  const value = actValue(val, actName);
  return value === undefined && _default !== undefined ? _default : value;
}

/**
 * Assign default values to a schema
 * @param scheme - Schemes
 */
const defaultScheme = (scheme: IScheme1, actName: string) => ({
  ...scheme,
  required: getValueAct(scheme.required as boolean, actName, true),
  strict: getValueAct(scheme.strict as boolean, actName, true),
});

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
export async function parserScheme(
  schemes: IScheme[],
  values: TValues = {},
  config: TConfig
) {
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
    callBackErr(value: TErrors, index: number) {
      fun._errors.push(value);
      if (
        (config &&
          config.strictCycle &&
          typeof config.strictCycle === "boolean") ||
        (config && config.strictCycle === index + 1)
      ) {
        error(fun._errors);
      }
    },
  };

  await trip(schemes, async ({ value, index }) => {
    const scheme = defaultScheme(value, config?.actName as string);
    const val = await valueDefault(scheme, values[scheme.target]);
    await runValidation(fun.resolution, fun.callBackErr, scheme, val, index);
  });

  return fun._errors.length ? error(fun._errors) : fun.values;
}
