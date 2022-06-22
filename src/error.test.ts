import Lettuce, { IScheme, TValues } from "./index";
import { assert, expect } from "chai";
import { equal } from "assert";

type TErrorValid = {
  valid: IScheme;
  targetValid: string;
  values: TValues;
};

const fnErr = function () {
  return "Validation was successful: this for the present case is an error is an error";
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
        assert.fail(fnErr());
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
      assert.fail(fnErr());
    } catch (e: any) {
      expect(`${e}`).to.equal(
        "Error: No validation custom format found: TypeError: type.__validate__ is not a function"
      );
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
      assert.fail(fnErr());
    } catch (e: any) {
      if (!(e instanceof Array)) throw e;
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
      assert.fail(fnErr());
    } catch (e: any) {
      if (!(e instanceof Array)) throw e;
      expect(e[0]).to.deep.equal({
        error: ["min"],
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
      assert.fail(fnErr());
    } catch (e: any) {
      if (!(e instanceof Array)) throw e;
      expect(e[0]).to.deep.equal({
        error: ["max"],
        target: "postal_Code",
        value: 12,
      });
    }
  });
});

it("Should fail: The length of the type property is 0", async function () {
  try {
    const lettuce = new Lettuce([
      { target: "postal_Code", type: [], strict: false },
    ]);
    await lettuce.parser({ postal_Code: "[]" });
    assert.fail(fnErr());
  } catch (e: any) {
    if (!(e instanceof Array)) throw e;
    console.log(e);
    expect(e[0]).to.deep.equal({
      error: ["type"],
      target: "postal_Code",
      value: "[]",
    });
  }
});

it("Should fail: 1", async function () {
  try {
    const lettuce = new Lettuce([
      {
        target: "postal_Code",
        type: [Number],
        strict: false,
        min: 125,
        regex: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      },
      {
        target: "code",
        type: Number,
        strict: false,
        min: 125,
      },
    ]);
    await lettuce.parser({ postal_Code: 124, code: 124 });
    assert.fail(fnErr());
  } catch (e: any) {
    if (!(e instanceof Array)) throw e;
    console.log(e);
  }
});
