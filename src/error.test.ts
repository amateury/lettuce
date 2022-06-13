import Lettuce, { IScheme, TValues } from "./index";
import { expect } from "chai";
import { equal } from "assert";

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
    {
      valid: { target: "status", type: ["active", "inactive"] },
      targetValid: "type",
      values: { status: "" },
    },
  ];

  errorValid.forEach(({ valid, targetValid, values }) => {
    it(`Should analyze the error schemas ${targetValid}`, async function () {
      try {
        const lettuce = new Lettuce([valid], values);
        await lettuce.parser();
        const fn = function () {
          throw "Validation was successful: this for the present case is an error is an error";
        };
        expect(fn).to.throw(Error);
      } catch (e: any) {
        if (!(e instanceof Array)) {
          throw e;
        } else {
          equal(e.length, 1);
          if (targetValid === "required") equal(e[0].value, undefined);
          equal(e[0].target, valid.target);
          equal(e[0].error.length, 1);
        }
      }
    });
  });
});

describe("Custom exception", function () {
  it("No validation custom format found", async () => {
    try {
      class Custom {}
      const lettuce = new Lettuce(
        [{ target: "name", type: Custom, strict: true }],
        { name: "L" }
      );
      await lettuce.parser();
    } catch (e: any) {
      expect(e[0]).to.deep.equal({
        error: [
          "No validation custom format found: TypeError: type.__validate__ is not a function",
        ],
        target: "name",
        value: "L",
      });
    }
  });

  it("Throw in __validate__", async () => {
    try {
      class Custom {
        static __validate__(val: string) {
          return typeof val === "string";
        }
      }
      const lettuce = new Lettuce(
        [{ target: "name", type: Custom, strict: true }],
        { name: 12 }
      );
      await lettuce.parser();
    } catch (e: any) {
      expect(e[0]).to.deep.equal({
        error: ["type"],
        target: "name",
        value: 12,
      });
    }
  });
});

describe("min and max property error", function () {
  it("Is not possible to evaluate the minimum value for the type: {x}", async () => {
    try {
      const lettuce = new Lettuce(
        [{ target: "postal_Code", type: Array, min: 3 }],
        { postal_Code: 12 }
      );
      await lettuce.parser();
    } catch (e: any) {
      expect(e[0]).to.deep.equal({
        error: [
          "it is not possible to evaluate the minimum value for the type: object",
        ],
        target: "postal_Code",
        value: 12,
      });
    }
  });

  it("Is not possible to evaluate the maximum value for the type: {x}", async () => {
    try {
      const lettuce = new Lettuce(
        [{ target: "postal_Code", type: Array, max: 3 }],
        { postal_Code: 12 }
      );
      await lettuce.parser();
    } catch (e: any) {
      expect(e[0]).to.deep.equal({
        error: [
          "it is not possible to evaluate the maximum value for the type: object",
        ],
        target: "postal_Code",
        value: 12,
      });
    }
  });
});

it("Should be equal to 20", async function () {
  const lettuce = new Lettuce(
    [{ target: "postal_Code", type: Number, value: 20 }],
    { postal_Code: null }
  );
  const resp = await lettuce.parser();
  equal(resp.postal_Code, 20);
});

it("Should be equal to null", async function () {
  const lettuce = new Lettuce([{ target: "postal_Code", type: Number }], {
    postal_Code: null,
  });
  const resp = await lettuce.parser();
  equal(resp.postal_Code, null);
});

it("Should be equal to {}", async function () {
  const lettuce = new Lettuce([{ target: "postal_Code", type: Number }]);
  const resp = await lettuce.parser();
  expect(resp).to.deep.equal({});
});
