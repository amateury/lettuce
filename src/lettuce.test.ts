import Lettuce from "./index";
import { expect } from "chai";
import { strictEqual, equal } from "assert";

enum Status {
  active = "active",
  inactive = "inactive",
}

const schemas = [
  {
    target: "id",
    type: String,
    value: () => `${new Date().getTime()}`,
  },
  {
    target: "email",
    type: String,
    required: true,
    strict: true,
    regex: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  },
  {
    target: "name",
    type: String,
    required: false,
    strict: false,
    min: 2,
    max: 50,
  },
  { target: "phone", type: [String, null], required: false, strict: false },
  { target: "password", type: String, required: true, strict: false, min: 8 },
  { target: "is_admin", type: Boolean, required: true, strict: true },
  { target: "arg", type: Array, required: true },
  { target: "arg1", type: Array, required: false, strict: false },
  { target: "status", type: Status },
  { target: "age", type: Number, min: 18 },
  { target: "birth_month", type: Number, min: 1, max: 12 },
];

const lettuce = new Lettuce(schemas);

describe("Validate schema", function () {
  it("Validate schema length", function () {
    equal(lettuce?.schemes.length, 11);
  });
  it("Parser schemes", async function () {
    const values: any = {
      email: "ds@lettuce.com",
      phone: "3122345643",
      name: "Bryant",
      password: "$b4feiG*LNzq",
      is_admin: true,
      status: "active",
      arg: [],
      arg1: null,
      age: 19,
      birth_month: 1,
    };
    const resp = await lettuce.parser(values);
    strictEqual(typeof resp.email, "string");
    strictEqual(typeof resp.phone, "string");
    strictEqual(typeof resp.name, "string");
    strictEqual(typeof resp.password, "string");
    strictEqual(typeof resp.status, "string");
    values.id = resp.id;
    expect(resp).to.deep.equal(values);
  });
});

it("Should be equal to 20", async function () {
  const lettuce = new Lettuce(
    [{ target: "postal_Code", type: Number, value: 20 }],
    {
      values: { postal_Code: null },
    }
  );
  const resp = await lettuce.parser();
  equal(resp.postal_Code, 20);
});

it("Should be equal to null", async function () {
  const lettuce = new Lettuce(
    [{ target: "postal_Code", type: [Number, null], required: false }],
    {
      values: {
        postal_Code: null,
      },
    }
  );
  const resp = await lettuce.parser();
  equal(resp.postal_Code, null);
});

it("Should be equal to {}", async function () {
  const lettuce = new Lettuce([
    { target: "postal_Code", type: Number, required: false, strict: false },
  ]);
  const resp = await lettuce.parser();
  expect(resp).to.deep.equal({});
});

it("Should be equal to {} and { postal_Code: '714 09'  }", async function () {
  const lettuce = new Lettuce([
    {
      target: "postal_Code",
      type: String,
      required: { act: true, default: false },
      strict: { act: true, default: false } },
  ]);
  const resp = await lettuce.parser();
  const resp1 = await lettuce.act("act").parser({ postal_Code: "714 09" }, 1);
  expect(resp).to.deep.equal({});
  expect(resp1).to.deep.equal({ postal_Code: "714 09" });
});

it("Should be equal to custom", async function () {
  class Custom {
    static __validate__(val: string) {
      return typeof val === "string";
    }
  }
  const lettuce = new Lettuce([
    { target: "postal_Code", type: [Status, Custom], strict: false },
  ]);
  const resp = await lettuce.parser({ postal_Code: "custom" });
  expect(resp).to.deep.equal({ postal_Code: "custom" });
});

it("Should be equal to active", async function () {
  class Custom {
    static __validate__(val: string) {
      return typeof val === "string";
    }
  }
  const lettuce = new Lettuce([
    { target: "postal_Code", type: [Status, Custom], strict: false },
  ]);
  const resp = await lettuce.parser({ postal_Code: "active" });
  expect(resp).to.deep.equal({ postal_Code: "active" });
});
