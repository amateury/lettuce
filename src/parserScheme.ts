import {
    ParserSchemeFunction,
    ParserSchemesClass,
    valuesArgs,
    schemes,
    scheme,
    FuncResolvePromiseScheme,
    resolvePromiseScheme
} from "../functions/validator";
import Validators from './lettuce'

const validator = new Validators();

/**
 * addSchemes add schemes
 *
 * @privateRemarks
 * addSchemes function serving the ParserSchemes class for
 * adding validation schemes
 *
 * @param schemes - Validation schemes
 */
const addSchemes = (schemes: unknown) => {
    validator.schemes = Object.assign(validator.schemes ?? {}, schemes);
}

/**
 * handle the function addScheme, which belongs to the class ParserSchemes
 *
 * @param callBack - receives as argument the resolution function of
 * new Promise, and the value processed in the callback is passed to
 * it, this value is the validation scheme of an element
 */
const handlerAddScheme = (callBack: FuncResolvePromiseScheme) => {
    new Promise((resolve) => {
        callBack(resolve);
    }).then((schemes: unknown) => {
        addSchemes(schemes);
    });
}

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
const addPropertySchemesValidator = <T>(schemesEntries: [keyof T, T[keyof T]][]): Promise<void> => {
    return new Promise((resolve) => {
        resolve(Object.fromEntries(schemesEntries));
    }).then((schemeData) => {
        validator.schemes = Object.assign(validator.schemes, schemeData);
    })
}

export class ParserSchemes implements ParserSchemesClass {

    /**
     * instance ParserSchemes
     */
    constructor(valueOf?: boolean) {
        validator.reset();
        validator.valueOf = valueOf ?? true;
    }

    /**
     * Activating the schema validation functions
     */
    parserSchemes(values?: valuesArgs): ParserSchemeFunction {
        return addPropertySchemesValidator(Object.entries(this))
            .then(()=> validator.parserSchemes(values));
    }

    /**
     * add schemes
     *
     * @param schemes - Validations schemes
     */
    addSchemes(schemes: schemes) {
        addSchemes(schemes);
    }

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
    addScheme(scheme: scheme, arg: string | string[]) {
        handlerAddScheme((add: resolvePromiseScheme): void => {
            if(typeof arg == 'string') {
                add({
                    [arg]: scheme
                });
            } else {
                let sh = {}
                for (let i = 1; i <= arg.length; i++) {
                    sh = {
                        [arg[i -1]]: scheme,
                        ...sh
                    }
                    if(i == arg.length) add(sh);
                }
            }
        });
    }
}
