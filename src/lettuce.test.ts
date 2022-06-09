import Lettuce from "./index";
import assert = require("assert");

enum Status {
  active = "active",
  inactive = "inactive",
}

const scheme = [
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
  { target: "phone", type: String, required: true, strict: false, min: 10 },
  { target: "password", type: String, required: true, strict: false, min: 8 },
  { target: "is_admin", type: Boolean, required: true, strict: true },
  { target: "status", type: Status },
];

const lettuce = new Lettuce(scheme);

describe("Validate schema", function () {
  it("Validate schema length", function () {
    assert.strictEqual(lettuce?.schemes.length, 6);
  });
  it("Parser schemes", async function () {
    const values = {
      email: "ds@lettuce.com",
      phone: "3122345643",
      name: "Bryant",
      password: "$b4feiG*LNzq",
      is_admin: true,
      status: "active",
    };
    const resp = await lettuce.parser(values);
    assert.equal(typeof resp.email, "string");
    assert.equal(typeof resp.phone, "string");
    assert.equal(typeof resp.name, "string");
    assert.equal(typeof resp.password, "string");
  });
});
