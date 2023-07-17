/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}/**
 * validate if it is an array
 *
 * @param elm - element validation
 * @returns boolean
 */
function isArray(elm) {
    return Array.isArray(elm);
}
/**
 * validate if it is an objet
 *
 * @param elm - element validation
 * @returns boolean
 */
function isObject(elm) {
    return elm instanceof Object;
}
/**
 * validate if it is an string
 *
 * @param elm - element validation
 * @returns boolean
 */
function isString(elm) {
    return typeof elm === "string";
}
/**
 * validate if it is a number
 *
 * @param elm - element validation
 * @returns boolean
 */
function isNumber(elm) {
    return typeof elm === "number";
}
/**
 * validate if it is a number
 *
 * @param elm - element validation
 * @returns boolean
 */
function isBoolean(elm) {
    return typeof elm === "boolean";
}
/**
 * Functions validations (isArray, isString)
 *
 */
var validate = new Map();
validate.set("Array", isArray);
validate.set("String", isString);
validate.set("Number", isNumber);
validate.set("Object", isObject);
validate.set("Boolean", isBoolean);
validate.set("MyNumberType", isNumber);/**
 * traverse an object
 * @param thing - Object
 * @param callBack - callback function
 */
function trip(thing, callBack) {
    return __awaiter(this, void 0, void 0, function () {
        var keys, len, index, key, value, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keys = Object.keys(thing);
                    len = keys.length + 1;
                    _a.label = 1;
                case 1:
                    if (!--len) return [3 /*break*/, 3];
                    index = keys.length - len;
                    key = keys[index];
                    value = thing[key];
                    return [4 /*yield*/, callBack({ value: value, key: key, thing: thing, index: index, len: len })];
                case 2:
                    resp = _a.sent();
                    if (resp !== undefined)
                        return [2 /*return*/, resp];
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function capitalizeWord(str) {
    var val = str.toLowerCase();
    return val.charAt(0).toUpperCase() + val.slice(1);
}var TypesErrorCompare;
(function (TypesErrorCompare) {
    TypesErrorCompare["compareDistinct"] = "compareDistinct";
    TypesErrorCompare["compareEqual"] = "compareEqual";
})(TypesErrorCompare || (TypesErrorCompare = {}));
var TypesErrors;
(function (TypesErrors) {
    TypesErrors["type"] = "type";
    TypesErrors["min"] = "min";
    TypesErrors["max"] = "max";
    TypesErrors["required"] = "required";
    TypesErrors["regex"] = "regex";
    TypesErrors["strict"] = "strict";
})(TypesErrors || (TypesErrors = {}));
/**
 * Run a bug
 * @param e - Error
 */
var error = function (e) {
    throw e;
};
/**
 * Generate new Error
 * @param e - Error
 */
var newError = function (e) {
    error(new Error(e));
};
/**
 * Validate is required
 * @param required - Value required (boolean)
 * @param val - Value of validation
 */
var isRequired = function (required, val) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (required && !val && !isBoolean(val))
            error(TypesErrors.required);
        return [2 /*return*/];
    });
}); };
/**
 * In this function, the custom data type is validated through
 * the static method __validate__.
 * @param val - Value of validation
 * @param type - Data type
 */
var customValidateValue = function (val, type) { return __awaiter(void 0, void 0, void 0, function () {
    var valid, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, type.__validate__(val)];
            case 1:
                valid = _a.sent();
                /* istanbul ignore else */
                if (!valid) {
                    error(TypesErrors.type);
                }
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                if (e_1 === TypesErrors.type)
                    error(e_1);
                newError("No validation custom format found: ".concat(e_1));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * Validate data type
 * @param scheme - Type to validation
 * @param val - Value of validation
 * @param type - Data type
 */
var validateValueType = function (scheme, val, type) { return __awaiter(void 0, void 0, void 0, function () {
    var validateStrict, formatVal;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(scheme.strict && val !== undefined)) return [3 /*break*/, 3];
                validateStrict = validate.get(type.name);
                if (!validateStrict) return [3 /*break*/, 1];
                /* istanbul ignore else */
                if (!validateStrict(val))
                    error(TypesErrors.strict);
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, customValidateValue(val, type)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                formatVal = val;
                if (!(type.name === "Array")) return [3 /*break*/, 4];
                formatVal = val ? type.from(val) : val;
                return [3 /*break*/, 7];
            case 4:
                if (!Object.prototype.hasOwnProperty.call(type, "__validate__")) return [3 /*break*/, 6];
                return [4 /*yield*/, customValidateValue(val, type)];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                formatVal = val ? type(val) : val;
                _a.label = 7;
            case 7: return [2 /*return*/, formatVal];
        }
    });
}); };
/**
 * Validate data type
 * @param scheme - Type to validation
 * @param val - Value of validation
 * @param type - Data type
 */
var valuePick = function (scheme, val, type) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!type.length && type.length !== undefined)
                    error(TypesErrors.type);
                return [4 /*yield*/, trip(type, function (_a) {
                        var value = _a.value, len = _a.len;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var resultValid;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(value instanceof Function)) return [3 /*break*/, 5];
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, validateValueType(scheme, val, value)];
                                    case 2: return [2 /*return*/, _b.sent()];
                                    case 3:
                                        _b.sent();
                                        return [3 /*break*/, 4];
                                    case 4: return [3 /*break*/, 8];
                                    case 5:
                                        if (!(val === value || val === undefined)) return [3 /*break*/, 6];
                                        return [2 /*return*/, val];
                                    case 6:
                                        if (!(typeof value === "object" && value)) return [3 /*break*/, 8];
                                        return [4 /*yield*/, trip(value, function (_a) {
                                                var v = _a.value;
                                                return v === val;
                                            })];
                                    case 7:
                                        resultValid = _b.sent();
                                        /* istanbul ignore else */
                                        if (resultValid)
                                            return [2 /*return*/, val];
                                        _b.label = 8;
                                    case 8:
                                        if (len === 1)
                                            error(TypesErrors.type);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/**
 * Formats the target value to the specified type
 * @param scheme - Type to validation
 * @param val - Value of validation
 */
var valueType = function (scheme, val) { return __awaiter(void 0, void 0, void 0, function () {
    var type;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = scheme.type;
                return [4 /*yield*/, (typeof type === "object"
                        ? valuePick(scheme, val, type)
                        : validateValueType(scheme, val, type))];
            case 1: // Type to validation
            return [2 /*return*/, _a.sent()];
        }
    });
}); };
/**
 * Evaluate minimum value
 * @param val - Value of validation
 * @param min - Value of minimum (number)
 * @param typeName - Name function type
 */
var min = function (val, min, typeName) { return __awaiter(void 0, void 0, void 0, function () {
    var validMin, _typeName;
    return __generator(this, function (_a) {
        validMin = null;
        _typeName = capitalizeWord(typeName);
        if (val.length) {
            validMin = val.length >= min;
        }
        else if (_typeName === "Number" || _typeName === "BigInt") {
            validMin = val >= min;
        }
        if ((validMin !== null && !validMin) || !validMin)
            error(TypesErrors.min);
        return [2 /*return*/, validMin];
    });
}); };
/**
 * Evaluate maximum value
 * @param val - Value of validation
 * @param max - Value of maximum (number)
 * @param typeName - Name function type
 */
var max = function (val, max, typeName) { return __awaiter(void 0, void 0, void 0, function () {
    var validMin, _typeName;
    return __generator(this, function (_a) {
        validMin = null;
        _typeName = capitalizeWord(typeName);
        if (val.length) {
            validMin = val.length <= max;
        }
        else if (_typeName === "Number" || _typeName === "BigInt") {
            validMin = val <= max;
        }
        if ((validMin !== null && !validMin) || !validMin)
            error(TypesErrors.max);
        return [2 /*return*/, validMin];
    });
}); };
var regexValid = function (val, reg) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!new RegExp(reg).test(val))
            error(TypesErrors.regex);
        return [2 /*return*/];
    });
}); };
var compareEqual = function (val, valCompare) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (val !== valCompare)
            error(TypesErrorCompare.compareEqual);
        return [2 /*return*/];
    });
}); };
var compareDistinct = function (val, valCompare) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (val === valCompare)
            error(TypesErrorCompare.compareDistinct);
        return [2 /*return*/];
    });
}); };
/**
 * Extra validation: minimum value, maximum value, regex
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 * @param typeName - Name function type
 * @param callBack -
 */
function extraValidation(scheme, val, typeName, callBack, values) {
    return __awaiter(this, void 0, void 0, function () {
        var valIsValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    valIsValid = scheme.required
                        ? scheme.required
                        : !(!val && !scheme.required);
                    if (!(scheme.min && valIsValid)) return [3 /*break*/, 2];
                    return [4 /*yield*/, min(val, scheme.min, typeName).catch(callBack)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(scheme.max && valIsValid)) return [3 /*break*/, 4];
                    return [4 /*yield*/, max(val, scheme.max, typeName).catch(callBack)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!(scheme.regex && valIsValid)) return [3 /*break*/, 6];
                    return [4 /*yield*/, regexValid(val, scheme.regex).catch(callBack)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (!(scheme.compare && valIsValid)) return [3 /*break*/, 10];
                    if (!(scheme.compare.equal && valIsValid)) return [3 /*break*/, 8];
                    return [4 /*yield*/, compareEqual(val, values[scheme.compare.equal]).catch(callBack)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    if (!(scheme.compare.distinct && valIsValid)) return [3 /*break*/, 10];
                    return [4 /*yield*/, compareDistinct(val, values[scheme.compare.distinct]).catch(callBack)];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, val];
            }
        });
    });
}
/**
 * Add the default value, set the value property, the value property can be a
 * function and will be interpreted as a callback
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 */
var valueDefault = function (scheme, val) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(scheme.value && scheme.value instanceof Function)) return [3 /*break*/, 2];
                return [4 /*yield*/, scheme.value(val)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [2 /*return*/, scheme.value !== undefined && !val ? scheme.value : val];
        }
    });
}); };
function labelFormat(label, scheme, type) {
    var matchScheme = {
        "{target}": scheme.target,
        "{validKey}": type,
        "{valueKey}": scheme[type],
    };
    return label.replace(/\{.+?\}/g, function (val) {
        var index = val;
        return matchScheme[index];
    });
}
/**
 * Controlar el mensaje de respuesta de error
 * @param scheme - Scheme of validation
 * @param e - error type property
 */
function ErrorMessage(scheme, e) {
    if (typeof scheme.message === "string") {
        return scheme.message;
    }
    if (typeof scheme.message === "function") {
        return scheme.message(labelFormat("{target}_{validKey}", scheme, e), {
            target: scheme.target,
            validKey: e,
            valueKey: scheme[e],
        });
    }
    if (scheme.message) {
        var message = scheme.message[e];
        /* istanbul ignore else */
        if (message)
            return message;
    }
    return labelFormat("{target}_{validKey}", scheme, e);
}
/**
 * Function that validates the value against the schema data
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 */
function validScheme(scheme, val, values) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, pushError, formatVal, typeName, respVal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = [];
                    pushError = function (e) {
                        if (e in TypesErrors || e in TypesErrorCompare) {
                            errors.push(ErrorMessage(scheme, e));
                        }
                        else {
                            error(e);
                        }
                    };
                    return [4 /*yield*/, isRequired(scheme.required, val).catch(pushError)];
                case 1:
                    _a.sent();
                    if (errors.length)
                        return [2 /*return*/, [val, errors]];
                    return [4 /*yield*/, valueType(scheme, val).catch(pushError)];
                case 2:
                    formatVal = _a.sent();
                    if (errors.length)
                        return [2 /*return*/, [formatVal, errors]];
                    typeName = typeof formatVal;
                    return [4 /*yield*/, extraValidation(scheme, formatVal, typeName, pushError, values)];
                case 3:
                    respVal = _a.sent();
                    return [2 /*return*/, [respVal, errors]];
            }
        });
    });
}
/**
 * Function that serves as a bridge between validScheme and parserScheme
 * @param resolution - callback that sets the resolved values
 * @param callBackErr - callback that sets the values with error
 * @param scheme - Scheme
 * @param val - Value of validation
 * @param index - Counting rate
 */
function runValidation(resolution, callBackErr, scheme, val, values) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validScheme(scheme, val, values).then(function (_a) {
                        var value = _a[0], errors = _a[1];
                        if (!errors.length) {
                            resolution([scheme.target, value]);
                        }
                        else {
                            var er = {
                                error: errors,
                                target: scheme.target,
                                value: val,
                            };
                            callBackErr(er);
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
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
var actValue = function (val, actName) {
    if (Object.prototype.hasOwnProperty.call(val, "default")) {
        if (Object.prototype.hasOwnProperty.call(val, actName))
            return val[actName];
        return val["default"];
    }
    return val;
};
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
function getValueAct(val, actName, _default) {
    if (val === undefined)
        return _default;
    return actValue(val, actName);
}
/**
 * Assign default values to a schema
 * @param scheme - Schemes
 */
var defaultScheme = function (scheme, actName) { return (__assign(__assign({}, scheme), { required: getValueAct(scheme.required, actName, true), strict: getValueAct(scheme.strict, actName, true) })); };
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
function parserScheme(schemes, values, config) {
    if (values === void 0) { values = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var fun;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fun = {
                        _values: {},
                        _errors: [],
                        _countError: 0,
                        get values() {
                            return this._values;
                        },
                        resolution: function (_a) {
                            var target = _a[0], val = _a[1];
                            if (val !== undefined)
                                Object.defineProperty(fun._values, target, {
                                    enumerable: true,
                                    value: val,
                                });
                        },
                        callBackErr: function (value) {
                            fun._errors.push(value);
                            if ((config &&
                                config.strictCycle &&
                                typeof config.strictCycle === "boolean") ||
                                (config && config.strictCycle === fun._countError + 1)) {
                                error(fun._errors);
                            }
                            fun._countError++;
                        },
                    };
                    return [4 /*yield*/, trip(schemes, function (_a) {
                            var value = _a.value;
                            return __awaiter(_this, void 0, void 0, function () {
                                var scheme, val;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            scheme = defaultScheme(value, config === null || config === void 0 ? void 0 : config.actName);
                                            return [4 /*yield*/, valueDefault(scheme, values[scheme.target])];
                                        case 1:
                                            val = _b.sent();
                                            return [4 /*yield*/, runValidation(fun.resolution, fun.callBackErr, scheme, val, values)];
                                        case 2:
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, fun._errors.length ? error(fun._errors) : fun.values];
            }
        });
    });
}var Lettuce = /** @class */ (function () {
    /**
     * Creates an instance of Lettuce.
     * @param schemas - Schemas validation
     * @param crossing - Configuration data, and optional for validation
     */
    function Lettuce(schemas, crossing) {
        var _a = crossing !== null && crossing !== void 0 ? crossing : {}, values = _a.values, strictCycle = _a.strictCycle;
        this.schemes = schemas;
        if (values)
            this.values = values;
        if (strictCycle)
            this.config = { strictCycle: strictCycle };
    }
    Lettuce.prototype.parser = function (values, strictCycle) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (values)
                    this.values = values;
                if (strictCycle)
                    this.config = __assign(__assign({}, this.config), { strictCycle: strictCycle });
                return [2 /*return*/, parserScheme(this.schemes, this.values, this.config)];
            });
        });
    };
    Lettuce.prototype.act = function (name) {
        var _this = this;
        return {
            parser: function (values, strictCycle) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (values)
                        this.values = values;
                    if (strictCycle)
                        this.config = __assign(__assign({}, this.config), { strictCycle: strictCycle });
                    return [2 /*return*/, parserScheme(this.schemes, this.values, __assign(__assign({}, this.config), { actName: name }))];
                });
            }); },
        };
    };
    return Lettuce;
}());export{Lettuce as default};//# sourceMappingURL=index.es.mjs.map
