import { TypeValid } from "../functions/validator";
/**
 * Types of validations
 */
declare class Types implements TypeValid {
    static String: StringConstructor;
    static Number: NumberConstructor;
    static Array: ArrayConstructor;
    static Boolean: BooleanConstructor;
    static Object: ObjectConstructor;
    String: StringConstructor;
    Number: NumberConstructor;
    Array: ArrayConstructor;
    Boolean: BooleanConstructor;
    Object: ObjectConstructor;
}
export default Types;
