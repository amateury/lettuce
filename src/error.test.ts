import Lettuce, { IScheme, TValues } from "./index";
import { expect } from "chai";
import assert = require("assert");

type TErrorValid = {
  valid: IScheme;
  targetValid: string;
  values: TValues;
};

describe("Validate schema error", function () {
  const errorValid: TErrorValid[] = [
    {
      valid: { target: "email", type: String, required: true },
      targetValid: "required",
      values: {},
    },
    {
      valid: {
        target: "email",
        type: String,
        regex: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      },
      targetValid: "regex",
      values: { email: "ds@lettuce" },
    },
    {
      valid: { target: "phone", type: Number, strict: true },
      targetValid: "strict",
      values: { phone: "123" },
    },
    {
      valid: { target: "name", type: String, min: 2 },
      targetValid: "min",
      values: { name: "L" },
    },
    {
      valid: { target: "name", type: String, max: 2 },
      targetValid: "max",
      values: { name: "Lettuce" },
    },
  ];

  errorValid.forEach(({ valid, targetValid, values }) => {
    it(`Parser schemes error ${targetValid}`, async function () {
      try {
        const lettuce = new Lettuce([valid]);
        await lettuce.parser(values);
        const fn = function () {
          throw "Validation was successful: this for the present case is an error is an error";
        };
        expect(fn).to.throw(Error);
      } catch (e: any) {
        if (!e.length) {
          throw e;
        } else {
          assert.strictEqual(e.length, 1);
          if (targetValid === "required")
            assert.strictEqual(e[0].value, undefined);
          assert.equal(e[0].target, valid.target);
          assert.strictEqual(e[0].error.length, 1);
        }
      }
    });
  });
});
