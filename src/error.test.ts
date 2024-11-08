import Lettuce, { IScheme, TValues } from "./index";
import { assert, expect } from "chai";
import { equal } from "assert";

type TErrorValid = {
  valid: IScheme;
  targetValid: string;
  values: TValues;
};

const fnErr = function () {
  return "Validation was successful: this for the present case is an error";
};

describe("Validate schema error", function () {
  const errorValid: TErrorValid[] = [
    {
      valid: { target: "email", type: String, required: true, strict: false },
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
      valid: {
        target: "status",
        type: ["active", "inactive"],
        required: false,
        strict: false,
      },
      targetValid: "type",
      values: { status: "" },
    },
  ];

  errorValid.forEach(({ valid, targetValid, values }) => {
    it(`Should analyze the error schemas ${targetValid}`, async function () {
      try {
        const lettuce = new Lettuce([valid], {
          values,
        });
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

describe("Validate schema error compare", function () {
  const errorValid: ({ valid: IScheme[] } & Omit<TErrorValid, "valid">)[] = [
    {
      valid: [
        { target: "password", type: String, required: true, strict: false },
        {
          target: "confirmPassword",
          type: String,
          required: true,
          strict: false,
          compare: {
            equal: "password",
          },
        },
      ],
      targetValid: "compareEqual",
      values: {
        password: "$b4feiG*LNzq",
        confirmPassword: "$b4feiG*LNzq.",
      },
    },
    {
      valid: [
        { target: "phone", type: String, required: true, strict: false },
        {
          target: "phone2",
          type: String,
          required: true,
          strict: false,
          compare: {
            distinct: "phone",
          },
        },
      ],
      targetValid: "compareDistinct",
      values: {
        phone: "3122345643",
        phone2: "3122345643",
      },
    },
    {
      valid: [
        {
          target: "country_code",
          type: String,
          required: false,
          strict: false,
          compare: {
            validate(value) {
              return isNaN(parseInt(value));
            },
          },
        },
      ],
      targetValid: "compareValidate",
      values: {
        country_code: "57a",
      },
    },
  ];

  errorValid.forEach(({ valid, targetValid, values }) => {
    it(`Should analyze the error schemas ${targetValid}`, async function () {
      try {
        const lettuce = new Lettuce(valid, {
          values,
        });
        await lettuce.parser();
        assert.fail(fnErr());
      } catch (e: any) {
        if (!(e instanceof Array)) {
          throw e;
        } else {
          equal(e.length, 1);
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
        {
          values: { name: "L" },
        }
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
        {
          values: { name: 12 },
        }
      );
      await lettuce.parser();
      assert.fail(fnErr());
    } catch (e: any) {
      if (!(e instanceof Array)) throw e;
      expect(e[0]).to.deep.equal({
        error: ["name_type"],
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
        [
          {
            target: "postal_Code",
            type: Array,
            min: 3,
            required: false,
            strict: false,
          },
        ],
        {
          values: { postal_Code: 12 },
        }
      );
      await lettuce.parser();
      assert.fail(fnErr());
    } catch (e: any) {
      if (!(e instanceof Array)) throw e;
      expect(e[0]).to.deep.equal({
        error: ["postal_Code_min"],
        target: "postal_Code",
        value: 12,
      });
    }
  });

  it("Is not possible to evaluate the maximum value for the type: {x}", async () => {
    try {
      const lettuce = new Lettuce(
        [
          {
            target: "postal_Code",
            type: Array,
            max: 3,
            required: false,
            strict: false,
          },
        ],
        {
          values: { postal_Code: 12 },
        }
      );
      await lettuce.parser();
      assert.fail(fnErr());
    } catch (e: any) {
      if (!(e instanceof Array)) throw e;
      expect(e[0]).to.deep.equal({
        error: ["postal_Code_max"],
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
    expect(e[0]).to.deep.equal({
      error: ["postal_Code_type"],
      target: "postal_Code",
      value: "[]",
    });
  }
});

it("Should throw an error with length 1 or 2", async function () {
  const schemas = [
    {
      target: "email",
      type: String,
      required: true,
      strict: true,
      min: 125,
      regex: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    },
    {
      target: "postal_Code",
      type: Number,
      strict: false,
      min: 125,
    },
    {
      target: "mobile",
      type: Number,
      strict: false,
      min: 125,
    },
  ];
  try {
    const lettuce = new Lettuce(schemas, {
      strictCycle: true,
    });
    await lettuce.parser({ email: "lettuce", postal_Code: 124, mobile: 124 });
    assert.fail(fnErr());
  } catch (e) {
    if (!(e instanceof Array)) throw e;
    equal(e.length, 1);
  }

  try {
    const lettuce = new Lettuce(schemas);
    await lettuce.parser(
      { email: "lettuce", postal_Code: 124, mobile: 124 },
      true
    );
    assert.fail(fnErr());
  } catch (e) {
    if (!(e instanceof Array)) throw e;
    equal(e.length, 1);
  }

  try {
    const lettuce = new Lettuce(schemas);
    await lettuce.parser(
      { email: "lettuce", postal_Code: 124, mobile: 124 },
      2
    );
    assert.fail(fnErr());
  } catch (e) {
    if (!(e instanceof Array)) throw e;
    equal(e.length, 2);
  }
});

describe("Message err", function () {
  it("message function", async function () {
    try {
      const lettuce = new Lettuce(
        [
          {
            target: "postal_Code",
            type: Array,
            max: 3,
            required: false,
            strict: false,
            message: "Error validation",
          },
          {
            target: "phone",
            type: String,
            max: 7,
            min: 7,
            required: false,
            strict: false,
            message: {
              max: "phone_max_7",
            },
          },
          {
            target: "username",
            type: String,
            required: true,
            strict: true,
            message: (message, { validKey }) => {
              if (validKey === "required") {
                return "username_is_required";
              } else {
                return message;
              }
            },
          },
          {
            target: "mobile",
            type: String,
            required: true,
            strict: true,
          },
          {
            target: "mobile2",
            type: String,
            required: true,
            strict: true,
            compare: {
              distinct: "mobile",
            },
            message: {
              compareDistinct: "mobile2 is equal to mobile",
            },
          },
        ],
        {
          values: {
            postal_Code: 12,
            phone: "34567897",
            mobile: "30012343211",
            mobile2: "30012343211",
          },
        }
      );
      await lettuce.parser();
      assert.fail(fnErr());
    } catch (e: any) {
      if (!(e instanceof Array)) throw e;
      expect(e[0]).to.deep.equal({
        error: ["Error validation"],
        target: "postal_Code",
        value: 12,
      });
      expect(e[1]).to.deep.equal({
        error: ["phone_max_7"],
        target: "phone",
        value: "34567897",
      });
      expect(e[2]).to.deep.equal({
        error: ["username_is_required"],
        target: "username",
        value: undefined,
      });
      expect(e[3]).to.deep.equal({
        error: ["mobile2 is equal to mobile"],
        target: "mobile2",
        value: "30012343211",
      });
    }
  });
});

describe("Act valid err", function () {
  it("Act err", async function () {
    const lettuce = new Lettuce([
      {
        target: "phone",
        type: Number,
      },
      {
        target: "postal_code",
        type: Number,
        required: { act: true, default: true },
        strict: { act: true, default: true },
      },
    ]);

    try {
      await lettuce.parser();
    } catch (e: any) {
      if (!(e instanceof Array)) throw e;
      expect(e).to.deep.equal([
        {
          error: ["phone_required"],
          target: "phone",
          value: undefined,
        },
        {
          error: ["postal_code_required"],
          target: "postal_code",
          value: undefined,
        },
      ]);
    }

    try {
      await lettuce.act("act").parser();
    } catch (e: any) {
      if (!(e instanceof Array)) throw e;
      expect(e).to.deep.equal([
        {
          error: ["phone_required"],
          target: "phone",
          value: undefined,
        },
        {
          error: ["postal_code_required"],
          target: "postal_code",
          value: undefined,
        },
      ]);
    }

    try {
      await lettuce.act("act").parser({ postal_code: "714 09" });
    } catch (e: any) {
      if (!(e instanceof Array)) throw e;
      expect(e).to.deep.equal([
        {
          error: ["phone_required"],
          target: "phone",
          value: undefined,
        },
        {
          error: ["postal_code_strict"],
          target: "postal_code",
          value: "714 09",
        },
      ]);
    }
  });
});
