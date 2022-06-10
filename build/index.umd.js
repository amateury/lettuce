(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["@amateury/lettuce"] = factory();
	else
		root["@amateury/lettuce"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/help.ts":
/*!*********************!*\
  !*** ./src/help.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isBoolean": () => (/* binding */ isBoolean),
/* harmony export */   "isBrowser": () => (/* binding */ isBrowser),
/* harmony export */   "isNode": () => (/* binding */ isNode),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
/**
 * Identify if it is running in a nodejs
 */
var isNode = function () {
    return typeof __webpack_require__.g !== "undefined" &&
        {}.toString.call(__webpack_require__.g) === "[object Object]";
};
/**
 * Identify if it is running in a browser
 */
var isBrowser = function () { return !isNode(); };
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
validate.set("Browser", isBrowser);
validate.set("Node", isNode);
validate.set("Boolean", isBoolean);


/***/ }),

/***/ "./src/lettuce.ts":
/*!************************!*\
  !*** ./src/lettuce.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser */ "./src/parser.ts");
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

var Lettuce = /** @class */ (function () {
    /**
     * Creates an instance of Lettuce.
     */
    function Lettuce(schemas, values) {
        this.schemes = schemas !== null && schemas !== void 0 ? schemas : [];
        if (values)
            this.values = values;
    }
    Lettuce.prototype.parser = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (values)
                    this.values = values;
                return [2 /*return*/, _parser__WEBPACK_IMPORTED_MODULE_0__.parserScheme(this.schemes, this.values)];
            });
        });
    };
    return Lettuce;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lettuce);


/***/ }),

/***/ "./src/parser.ts":
/*!***********************!*\
  !*** ./src/parser.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parserScheme": () => (/* binding */ parserScheme)
/* harmony export */ });
/* harmony import */ var _help__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./help */ "./src/help.ts");
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

/**
 * Run a bug
 * @param e - Error
 */
var error = function (e) {
    throw e;
};
/**
 * Validate is required
 * @param required - Value required (boolean)
 * @param val - Value of validation
 */
var isRequired = function (required, val) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (required && !val && !(0,_help__WEBPACK_IMPORTED_MODULE_0__.isBoolean)(val))
            error("required");
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
                if (!valid)
                    error("type");
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.error(e_1);
                if (e_1 !== "type")
                    error("No validation custom format found");
                error(e_1);
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
 * @param strict - It is a boolean to know if the data will be
 * strictly validated
 */
var validateValueType = function (scheme, val, type, strict) { return __awaiter(void 0, void 0, void 0, function () {
    var validateStrict, formatVal, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!strict) return [3 /*break*/, 3];
                validateStrict = _help__WEBPACK_IMPORTED_MODULE_0__.validate.get(type.name);
                if (!validateStrict) return [3 /*break*/, 1];
                if (!validateStrict(val))
                    error("type");
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, customValidateValue(val, type)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                if (type.name === "Array") {
                    formatVal = val ? type.from(val) : val;
                }
                else {
                    formatVal = val ? type(val) : val;
                }
                if (!val) return [3 /*break*/, 5];
                return [4 /*yield*/, complementaryValidation(scheme, formatVal, type.name)];
            case 4:
                _a = _b.sent();
                return [3 /*break*/, 6];
            case 5:
                _a = val;
                _b.label = 6;
            case 6: return [2 /*return*/, _a];
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
    var keys, len, typeOrPick, nameFuncType;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keys = Object.keys(type);
                len = keys.length + 1;
                _a.label = 1;
            case 1:
                if (!--len) return [3 /*break*/, 9];
                typeOrPick = type[keys[keys.length - len]];
                if (!(typeOrPick instanceof Function)) return [3 /*break*/, 7];
                nameFuncType = typeOrPick.name;
                _a.label = 2;
            case 2:
                _a.trys.push([2, , 5, 6]);
                if (!(nameFuncType.toString().toLocaleLowerCase() === typeof val)) return [3 /*break*/, 4];
                return [4 /*yield*/, validateValueType(scheme, val, typeOrPick, undefined)];
            case 3: return [2 /*return*/, _a.sent()];
            case 4: return [3 /*break*/, 6];
            case 5: return [7 /*endfinally*/];
            case 6: return [3 /*break*/, 8];
            case 7:
                if (val === typeOrPick)
                    return [2 /*return*/, val];
                _a.label = 8;
            case 8:
                if (len === 1)
                    error("pick");
                return [3 /*break*/, 1];
            case 9: return [2 /*return*/];
        }
    });
}); };
/**
 * Formats the target value to the specified type
 * @param scheme - Type to validation
 * @param val - Value of validation
 */
var valueType = function (scheme, val) { return __awaiter(void 0, void 0, void 0, function () {
    var type, strict;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = scheme.type;
                strict = scheme.strict;
                if (!(typeof type === "object")) return [3 /*break*/, 2];
                return [4 /*yield*/, valuePick(scheme, val, type)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [4 /*yield*/, validateValueType(scheme, val, type, strict)];
            case 3: return [2 /*return*/, _a.sent()];
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
    var validMin;
    return __generator(this, function (_a) {
        validMin = null;
        if (val.length) {
            validMin = val.length >= min;
        }
        else if (typeName === "Number" || typeName === "BigInt") {
            validMin = val >= min;
        }
        if (validMin !== null && !validMin)
            error("min");
        if (!validMin)
            error("it is not possible to evaluate the minimum value for the type: ".concat(typeof val));
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
    var validMin;
    return __generator(this, function (_a) {
        validMin = null;
        if (val.length) {
            validMin = val.length <= max;
        }
        else if (typeName === "Number" || typeName === "BigInt") {
            validMin = val <= max;
        }
        if (validMin !== null && !validMin)
            error("max");
        if (!validMin)
            error("it is not possible to evaluate the maximum value for the type:: ".concat(typeof val));
        return [2 /*return*/, validMin];
    });
}); };
var regexValid = function (val, reg) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!reg.test(val))
            error("regex");
        return [2 /*return*/];
    });
}); };
/**
 * Complementary validation: minimum value, maximum value
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 * @param typeName - Name function type
 */
function complementaryValidation(scheme, val, typeName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!scheme.min) return [3 /*break*/, 2];
                    return [4 /*yield*/, min(val, scheme.min, typeName)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!scheme.max) return [3 /*break*/, 4];
                    return [4 /*yield*/, max(val, scheme.max, typeName)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!scheme.regex) return [3 /*break*/, 6];
                    return [4 /*yield*/, regexValid(val, scheme.regex)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/, val];
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
            case 2:
                if (scheme.value !== undefined && !val)
                    return [2 /*return*/, scheme.value];
                return [2 /*return*/, val];
        }
    });
}); };
/**
 * Function that validates the value against the schema data
 * @param scheme - Scheme of validation
 * @param val - Value of validation
 */
function validScheme(scheme, val) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, strict;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = [];
                    strict = scheme.strict;
                    return [4 /*yield*/, isRequired(scheme.required, val).catch(function (e) {
                            return strict ? error(e) : errors.push(e);
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, valueType(scheme, val)
                            .catch(function (e) {
                            strict ? error(e) : errors.push(e);
                        })
                            .then(function (resp) { return [errors, resp !== null && resp !== void 0 ? resp : val]; })];
                case 2: return [2 /*return*/, _a.sent()];
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
 */
function runValidation(resolution, callBackErr, scheme, val) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validScheme(scheme, val)
                        .then(function (_a) {
                        var err = _a[0], value = _a[1];
                        if (err.length) {
                            return callBackErr({
                                error: __spreadArray([], err, true),
                                target: scheme.target,
                                value: val,
                            });
                        }
                        resolution([scheme.target, value]);
                    })
                        .catch(function (e) {
                        error([
                            {
                                error: [e],
                                target: scheme.target,
                                value: val,
                            },
                        ]);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
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
function parserScheme(schemes, values) {
    if (values === void 0) { values = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var len, fun, scheme, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    len = schemes.length + 1;
                    fun = {
                        _values: {},
                        _errors: [],
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
                        },
                    };
                    _a.label = 1;
                case 1:
                    if (!--len) return [3 /*break*/, 4];
                    scheme = schemes[schemes.length - len];
                    return [4 /*yield*/, valueDefault(scheme, values[scheme.target])];
                case 2:
                    val = _a.sent();
                    return [4 /*yield*/, runValidation(fun.resolution, fun.callBackErr, scheme, val)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, fun._errors.length ? error(fun._errors) : fun.values];
            }
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "parserScheme": () => (/* reexport safe */ _parser__WEBPACK_IMPORTED_MODULE_0__.parserScheme)
/* harmony export */ });
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser */ "./src/parser.ts");
/* harmony import */ var _lettuce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lettuce */ "./src/lettuce.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lettuce__WEBPACK_IMPORTED_MODULE_1__["default"]);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.umd.js.map