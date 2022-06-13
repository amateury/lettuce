import Lettuce from "./index";
import { expect } from "chai";
import { strictEqual, equal } from "assert";

enum Status {
  active = "active",
  inactive = "inactive",
}

const scheme = [
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
  { target: "arg1", type: Array, required: false },
  { target: "status", type: Status },
  { target: "age", type: Number, min: 18 },
  { target: "birth_month", type: Number, min: 1, max: 12 },
];

const lettuce = new Lettuce(scheme);

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
