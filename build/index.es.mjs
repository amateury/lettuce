/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/argument.ts":
/*!*************************!*\
  !*** ./src/argument.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "argument": () => (/* binding */ argument)
/* harmony export */ });
/* harmony import */ var _help__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./help */ "./src/help.ts");
/* harmony import */ var _verifyErrors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./verifyErrors */ "./src/verifyErrors.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
};


/**
 *
 * Response messages due to validation failure
 */
var messageArgument = {
    validation: function () { return ({
        message: "validation_custom"
    }); },
    required: function () { return ({
        message: "required_field"
    }); },
    min: function (props) { return ({
        message: "minimum_characters",
        value: props.validValue
    }); },
    max: function (props) { return ({
        message: "maximum_characters",
        value: props.validValue
    }); },
    strict: function (props) { return ({
        message: "{key}_expected_data_type_{type}"
            .replace('{key}', props.key)
            .replace('{type}', props.type)
            .toLowerCase()
    }); }
};
function ejectMessage(key, props) {
    if (props.message && key) {
        if (typeof props.message == 'string')
            return props.message;
        if (props.message[key])
            return props.message;
    }
    switch (key) {
        case 'validation': return messageArgument.validation();
        case 'required': return messageArgument.required();
        case 'min': return messageArgument.min(props);
        case 'max': return messageArgument.max(props);
        case 'strict': return messageArgument.strict(props);
        default:
            throw 'non-specific validation function: undefined response message';
    }
}
/**
 *  list of validation functions
 *
 * @param funcArguments -
 */
var funcArguments = {
    /**
     *  * custom validation, for the data type specified in the argument
     *
     * @example
     * ```json
     * {
     *    email: {
     *    type: Sandwich.String, validation: (value: string) => typeof value == 'string'
     *  }
     * }
     * ```
     * @param validValue -
     * @param value -
     */
    validation: function (_a) {
        var validValue = _a.validValue, value = _a.value;
        return validValue(value);
    },
    /**
     * Validate value max
     *
     * @param type -
     * @param validValue -
     * @param value -
     */
    max: function (_a) {
        var _b, _c, _d, _e;
        var type = _a.type, validValue = _a.validValue, value = _a.value;
        if (typeof value === 'number') {
            return (value !== null && value !== void 0 ? value : 0) <= (validValue !== null && validValue !== void 0 ? validValue : 0);
        }
        else {
            var len = (_c = ((_b = type === null || type === void 0 ? void 0 : type.length) !== null && _b !== void 0 ? _b : 0)) !== null && _c !== void 0 ? _c : ((_e = (_d = type === null || type === void 0 ? void 0 : type.toString()) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0);
            return len <= (validValue !== null && validValue !== void 0 ? validValue : 0);
        }
    },
    /**
     * Validate value min
     *
     * @param type -
     * @param validValue -
     * @param value -
     */
    min: function (_a) {
        var _b, _c, _d, _e;
        var type = _a.type, validValue = _a.validValue, value = _a.value;
        if (typeof value === 'number') {
            return (validValue !== null && validValue !== void 0 ? validValue : 0) >= (validValue !== null && validValue !== void 0 ? validValue : 0);
        }
        else {
            var len = (_c = ((_b = type === null || type === void 0 ? void 0 : type.length) !== null && _b !== void 0 ? _b : 0)) !== null && _c !== void 0 ? _c : ((_e = (_d = type === null || type === void 0 ? void 0 : type.toString()) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0);
            return len >= (validValue !== null && validValue !== void 0 ? validValue : 0);
        }
    },
    /**
     * validate value required
     *
     * @param validValue -
     * @param value -
     */
    required: function (_a) {
        var validValue = _a.validValue, value = _a.value;
        return validValue ? (!!value || value === 0) : true;
    },
    /**
     * Validate value type
     *
     * @param value -
     * @param func -
     * @param scheme -
     */
    type: function (value, func, scheme) {
        var list_type = ['String', 'Number', 'Object'];
        switch (func.name) {
            case 'Array': return func.from(value);
            default:
                if (list_type.includes(func.name)) {
                    return new func(value);
                }
                return func(value, scheme);
        }
    },
    /**
     * Strictly validates the value of a data type
     *
     * @param strict - true to validate or false not to validate strict mode
     * @param type - Array
     * @param key - data (occupation)
     * @param value - `Developer`
     */
    validStrict: function (strict, type, key, value) {
        var _a;
        var valid = _help__WEBPACK_IMPORTED_MODULE_0__.validate.get(type);
        if (strict && valid) {
            !valid(value) ? (0,_verifyErrors__WEBPACK_IMPORTED_MODULE_1__.exception)({
                message: "args_validation_errors",
                errors: [(_a = {},
                        _a[key] = [messageArgument.strict({ key: key, type: type })],
                        _a)]
            }, 400) : true;
        }
    }
};
/**
 *
 * @param key -
 * @param props -
 */
function validArguments(key, props) {
    switch (key) {
        case 'required': return funcArguments.required(props);
        case 'min': return funcArguments.min(props);
        case 'max': return funcArguments.max(props);
        case 'validation': return funcArguments.validation(props);
        default:
            throw 'non-specific validation function';
    }
}
/**
 * Validate a data type
 *
 * @param value - value to validate "Developer"
 * @param key - value key (occupation)
 * @param scheme - scheme validation
 * ```json
 * {type: String}
 * ```
 */
function validType(_a) {
    var value = _a.value, key = _a.key, scheme = _a.scheme;
    return __awaiter(this, void 0, void 0, function () {
        var type, strict, required, name_1;
        return __generator(this, function (_b) {
            type = scheme['type'];
            strict = scheme['strict'];
            required = scheme['required'];
            if (type) {
                name_1 = type.name;
                required && value ? funcArguments.validStrict(strict, name_1, key, value) : null;
                if (value === null || value === undefined)
                    return [2 /*return*/, value];
                return [2 /*return*/, funcArguments.type(value, type, scheme)];
            }
            else {
                (0,_verifyErrors__WEBPACK_IMPORTED_MODULE_1__.exception)({ message: "".concat(key, " => ").concat(value, " no data type") }, 500);
            }
            return [2 /*return*/];
        });
    });
}
/**
 * Validate a schema against a value
 *
 * @param props - data
 * @param type - data type to validate example String
 * @param validValue - value of validation
 * @param keyValid - key main
 */
function validData(props, type, validValue, keyValid) {
    return new Promise(function (resolve) {
        var value = props.value, scheme = props.scheme, message = props.message, keyMain = props.key;
        if (!validArguments(keyValid, { validValue: validValue, value: value, type: type, scheme: scheme })) {
            resolve(ejectMessage(keyValid, { validValue: validValue, value: value, type: type, keyValid: keyValid, keyMain: keyMain, message: message }));
        }
        resolve(false);
    });
}
/**
 * Validate a schema against a value
 *
 * @param props - data
 * @param type - data type to validate example String
 */
function validExtractArgument(props, type) {
    return __awaiter(this, void 0, void 0, function () {
        var validResponse, scheme, resp, resp, resp, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validResponse = [];
                    scheme = props.scheme;
                    if (!scheme['required']) return [3 /*break*/, 2];
                    return [4 /*yield*/, validData(props, type, scheme['required'], 'required')];
                case 1:
                    resp = _a.sent();
                    if (resp)
                        validResponse.push(resp);
                    _a.label = 2;
                case 2:
                    if (!scheme['min']) return [3 /*break*/, 4];
                    return [4 /*yield*/, validData(props, type, scheme['min'], 'min')];
                case 3:
                    resp = _a.sent();
                    if (resp)
                        validResponse.push(resp);
                    _a.label = 4;
                case 4:
                    if (!scheme['max']) return [3 /*break*/, 6];
                    return [4 /*yield*/, validData(props, type, scheme['max'], 'max')];
                case 5:
                    resp = _a.sent();
                    if (resp)
                        validResponse.push(resp);
                    _a.label = 6;
                case 6:
                    if (!scheme['validation']) return [3 /*break*/, 8];
                    return [4 /*yield*/, validData(props, type, scheme['validation'], 'validation')];
                case 7:
                    resp = _a.sent();
                    if (resp)
                        validResponse.push(resp);
                    _a.label = 8;
                case 8: return [2 /*return*/, validResponse];
            }
        });
    });
}
/**
 * validate Message
 *
 * @param errors -
 */
function validRespArgument(errors) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, !errors.length];
        });
    });
}
/**
 * Validate an argument schema
 *
 * @param props - data
 *
 * @example
 * ```json
 * {
 *     value: "example@sandwich.com"
 *     key: "email"
 *     scheme: {type: Sandwich.String, strict: true}
 * }
 * ```
 */
function validArgument(props) {
    return __awaiter(this, void 0, void 0, function () {
        var type, errors, success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validType(props)];
                case 1:
                    type = _a.sent();
                    return [4 /*yield*/, validExtractArgument(props, type)];
                case 2:
                    errors = _a.sent();
                    return [4 /*yield*/, validRespArgument(errors)];
                case 3:
                    success = _a.sent();
                    return [2 /*return*/, { errors: errors, success: success, value: type }];
            }
        });
    });
}
/**
 * Extract the defined value from the req or in the schema
 * (any value passed by req will be replaced by the value is defined in the schema)
 *
 * @param reqBody - data body
 * @param scheme -
 * @param key - field key to validate
 */
function getValue(reqBody, scheme, key) {
    var _a;
    var definedValue = (_a = scheme['value']) !== null && _a !== void 0 ? _a : reqBody[key];
    return definedValue instanceof Function ? definedValue() : definedValue;
}
/**
 * This function validates all body data specified in the arguments
 *
 * @param valueOf - true stops returning the data to its primitive value of its instance
 * @param reqBody - request body
 * ```json
 * {email: "example@sandwich.com"}
 * ```
 * @param schemes - schemes of validation `{ email: {type: Sandwich.String, strict: true} }`
 */
function argument(valueOf, reqBody, schemes) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var resp, body, errors, _c, _d, _i, key, scheme, validated;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    resp = {};
                    body = {};
                    errors = [];
                    if (!schemes)
                        (0,_verifyErrors__WEBPACK_IMPORTED_MODULE_1__.exception)({ message: "schemes is ".concat(schemes) }, 500);
                    _c = [];
                    for (_d in schemes)
                        _c.push(_d);
                    _i = 0;
                    _f.label = 1;
                case 1:
                    if (!(_i < _c.length)) return [3 /*break*/, 4];
                    key = _c[_i];
                    scheme = (_a = schemes[key]) !== null && _a !== void 0 ? _a : null;
                    if (!scheme) return [3 /*break*/, 3];
                    return [4 /*yield*/, validArgument({
                            value: getValue(reqBody, scheme, key),
                            key: key,
                            message: (_b = scheme['message']) !== null && _b !== void 0 ? _b : null,
                            scheme: scheme
                        })];
                case 2:
                    validated = _f.sent();
                    Object.defineProperty(resp, key, {
                        enumerable: true,
                        value: validated
                    });
                    Object.defineProperty(body, key, {
                        enumerable: true,
                        value: valueOf || !validated.value ? validated.value : validated.value.valueOf()
                    });
                    if (validated.errors.length) {
                        errors.push((_e = {}, _e[key] = validated.errors, _e));
                    }
                    _f.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, {
                        argument: resp,
                        body: body,
                        errors: errors
                    }];
            }
        });
    });
}


/***/ }),

/***/ "./src/help.ts":
/*!*********************!*\
  !*** ./src/help.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isBrowser": () => (/* binding */ isBrowser),
/* harmony export */   "isNode": () => (/* binding */ isNode),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
/**
 * Identify if it is running in a browser
 */
var isBrowser = function () { return typeof window !== 'undefined'
    && ({}).toString.call(window) === '[object Window]'; };
/**
 * Identify if it is running in a nodejs
 */
var isNode = function () { return typeof __webpack_require__.g !== "undefined"
    && ({}).toString.call(__webpack_require__.g) === '[object global]'; };
/**
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
 * validate if it is an number
 *
 * @param elm - element validation
 * @returns boolean
 */
function isNumber(elm) {
    return typeof elm === "number";
}
/**
 * Functions validations (isArray, isString)
 *
 */
var validate = new Map();
validate.set('Array', isArray);
validate.set('String', isString);
validate.set('Number', isNumber);
validate.set('Object', isObject);
validate.set('Browser', isBrowser);
validate.set('Browser', isNode);


/***/ }),

/***/ "./src/lettuce.ts":
/*!************************!*\
  !*** ./src/lettuce.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parserSchemes": () => (/* binding */ parserSchemes),
/* harmony export */   "Validators": () => (/* binding */ Validators),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _argument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./argument */ "./src/argument.ts");
/* harmony import */ var _verifyErrors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./verifyErrors */ "./src/verifyErrors.ts");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type */ "./src/type.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
};



/**
 * Analyze the values provided according to your schema.
 *
 * @param valueOf - Determines how validated arguments and parameters are extracted.
 * @param schemes - schemes
 * ```json
 * {
 *     email: {type: Sandwich.String, required: true, strict: true},
 *     password: {type: Sandwich.String, required: true, strict: true, min: 8}
 * }
 * ```
 * @param values - data body request.
 * @returns HandlerParserSchemes
 */
var parserSchemes = function (valueOf, schemes, values) { return __awaiter(void 0, void 0, void 0, function () {
    var 
    /**
     *  validate data
     *
     * @param result_argument - result argument
     */
    result_argument, 
    /**
     * check for errors in arguments
     *
     * @param responseError - bug check response
     */
    responseError;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0,_argument__WEBPACK_IMPORTED_MODULE_0__.argument)(valueOf !== null && valueOf !== void 0 ? valueOf : true, values !== null && values !== void 0 ? values : {}, schemes)];
            case 1:
                result_argument = _a.sent();
                return [4 /*yield*/, (0,_verifyErrors__WEBPACK_IMPORTED_MODULE_1__.verifyErrors)(result_argument.errors)];
            case 2:
                responseError = _a.sent();
                return [2 /*return*/, {
                        schemes: result_argument.argument,
                        args: result_argument.body,
                        errors: responseError.errors,
                        message: responseError.message
                    }];
        }
    });
}); };
/**
 * A Validators class, with functions that allow rigorously validating
 * data, according to a specific pattern (a schema).
 *
 * @remarks
 * A schema determines the validation pattern of a value, and if it
 * does not meet the conditions of the pattern, an exception is
 * thrown with the return of an array of the errors found.
 *
 * @beta
 */
var Validators = /** @class */ (function (_super) {
    __extends(Validators, _super);
    /**
     * Creates an instance of Sandwiches.
     */
    function Validators(schemes) {
        var _this = _super.call(this) || this;
        /**
         * values to be validated
         * @defaultValue undefined
         */
        _this.values = undefined;
        /**
         * Boolean type property. Determines how validated arguments
         * and parameters are extracted.
         * @defaultValue true
         */
        _this.valueOf = true;
        _this.schemes = schemes !== null && schemes !== void 0 ? schemes : null;
        return _this;
    }
    /**
     * parse and validate request body data
     *
     * @param values - Data subject to validation
     * @returns ParserSchemesResponse
     */
    Validators.prototype.parserSchemes = function (values) {
        var _a;
        return parserSchemes(this.valueOf, this.schemes, (_a = this.values) !== null && _a !== void 0 ? _a : values);
    };
    /**
     * Reset data:
     * ```ts
     *  this.valueOf = true;
     *  this.schemes = {};
     *  this.values = undefined;
     * ```
     */
    Validators.prototype.reset = function () {
        this.valueOf = true;
        this.schemes = null;
        this.values = undefined;
    };
    return Validators;
}(_type__WEBPACK_IMPORTED_MODULE_2__["default"]));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Validators);


/***/ }),

/***/ "./src/parserScheme.ts":
/*!*****************************!*\
  !*** ./src/parserScheme.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParserSchemes": () => (/* binding */ ParserSchemes)
/* harmony export */ });
/* harmony import */ var _lettuce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lettuce */ "./src/lettuce.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var validator = new _lettuce__WEBPACK_IMPORTED_MODULE_0__["default"]();
/**
 * addSchemes add schemes
 *
 * @privateRemarks
 * addSchemes function serving the ParserSchemes class for
 * adding validation schemes
 *
 * @param schemes - Validation schemes
 */
var addSchemes = function (schemes) {
    var _a;
    validator.schemes = Object.assign((_a = validator.schemes) !== null && _a !== void 0 ? _a : {}, schemes);
};
/**
 * handle the function addScheme, which belongs to the class ParserSchemes
 *
 * @param callBack - receives as argument the resolution function of
 * new Promise, and the value processed in the callback is passed to
 * it, this value is the validation scheme of an element
 */
var handlerAddScheme = function (callBack) {
    new Promise(function (resolve) {
        callBack(resolve);
    }).then(function (schemes) {
        addSchemes(schemes);
    });
};
/**
 * Processes and assigns to validator.schemes the validation
 * schemes declared as property in a class.
 *
 * @param schemesEntries - Matrix of schemes
 *
 * @example
 * Matrix schemes:
 * ```json
 * [
 *  ['name' {type: Type.String, required: true, strict: true}],
 *  ['email' {type: Type.String, required: true, strict: true}]
 * ]
 * ```
 */
var addPropertySchemesValidator = function (schemesEntries) {
    return new Promise(function (resolve) {
        resolve(Object.fromEntries(schemesEntries));
    }).then(function (schemeData) {
        validator.schemes = Object.assign(validator.schemes, schemeData);
    });
};
var ParserSchemes = /** @class */ (function () {
    /**
     * instance ParserSchemes
     */
    function ParserSchemes(valueOf) {
        validator.reset();
        validator.valueOf = valueOf !== null && valueOf !== void 0 ? valueOf : true;
    }
    /**
     * Activating the schema validation functions
     */
    ParserSchemes.prototype.parserSchemes = function (values) {
        return addPropertySchemesValidator(Object.entries(this))
            .then(function () { return validator.parserSchemes(values); });
    };
    /**
     * add schemes
     *
     * @param schemes - Validations schemes
     */
    ParserSchemes.prototype.addSchemes = function (schemes) {
        addSchemes(schemes);
    };
    /**
     * The addScheme property must be represented in the child class as a function
     * within this function the schemas are loaded for the validation of the arguments
     *
     * @example
     *```ts
     * addScheme({type: Sandwich.String, required: true, strict: true}, ['email'])
     *```
     * @param scheme - Validations scheme
     * @param arg - Name of the argument to validate, can be a string or an array of strings.
     *
     * @example
     * example param arg:
     * ```ts
     * 'password' or ['password', 'passwordConfirm']
     * ```
     *
     */
    ParserSchemes.prototype.addScheme = function (scheme, arg) {
        handlerAddScheme(function (add) {
            var _a, _b;
            if (typeof arg == 'string') {
                add((_a = {},
                    _a[arg] = scheme,
                    _a));
            }
            else {
                var sh = {};
                for (var i = 1; i <= arg.length; i++) {
                    sh = __assign((_b = {}, _b[arg[i - 1]] = scheme, _b), sh);
                    if (i == arg.length)
                        add(sh);
                }
            }
        });
    };
    return ParserSchemes;
}());



/***/ }),

/***/ "./src/type.ts":
/*!*********************!*\
  !*** ./src/type.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Types of validations
 */
var Types = /** @class */ (function () {
    function Types() {
        this.String = String;
        this.Number = Number;
        this.Array = Array;
        this.Boolean = Boolean;
        this.Object = Object;
    }
    Types.String = String;
    Types.Number = Number;
    Types.Array = Array;
    Types.Boolean = Boolean;
    Types.Object = Object;
    return Types;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Types);


/***/ }),

/***/ "./src/verifyErrors.ts":
/*!*****************************!*\
  !*** ./src/verifyErrors.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "exception": () => (/* binding */ exception),
/* harmony export */   "verifyErrors": () => (/* binding */ verifyErrors)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
};
function error(response) {
    throw response;
}
function responseServerError(response, code) {
    var message = response.message, errors = response.errors;
    throw { "statusCode": code, "message": message, errors: errors };
}
function exception(response, code) {
    typeof window !== 'undefined'
        && ({}).toString.call(window) === '[object Window]'
        ? error(response) : responseServerError(response, code);
}
/**
 * validate errors and send message
 *
 * @param errors -
 */
function verifyErrors(errors) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            response = {
                errors: [],
                message: 'args_validation_successful'
            };
            if (errors.length) {
                response.errors = errors;
                response.message = 'args_validation_errors';
                exception(response, 400);
            }
            else {
                return [2 /*return*/, response];
            }
            return [2 /*return*/];
        });
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParserSchemes": () => (/* reexport safe */ _parserScheme__WEBPACK_IMPORTED_MODULE_2__.ParserSchemes),
/* harmony export */   "Types": () => (/* reexport safe */ _type__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lettuce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lettuce */ "./src/lettuce.ts");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type */ "./src/type.ts");
/* harmony import */ var _parserScheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parserScheme */ "./src/parserScheme.ts");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lettuce__WEBPACK_IMPORTED_MODULE_0__["default"]);

})();

/******/ })()
;
//# sourceMappingURL=index.es.mjs.map