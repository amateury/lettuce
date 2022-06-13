import { isArray, isObject, isNumber, isString } from "./help";
import { strictEqual } from "assert";

describe("Function help", function () {
  it("Validate element array", async () => {
    strictEqual(isArray([1, 3]), true);
    strictEqual(isArray(123), false);
  });

  it("Validate element object", async () => {
    strictEqual(isObject({}), true);
    strictEqual(isObject(undefined), false);
  });

  it("Validate element number", async () => {
    strictEqual(isNumber(1), true);
    strictEqual(isNumber([]), false);
  });

  it("Validate element string", async () => {
    strictEqual(isString("string"), true);
    strictEqual(isString([]), false);
  });
});
