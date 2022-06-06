import Lettuce from "./lettuce";
import assert = require("assert");

function Bool(this: any, value: any) {
  this.value = !!value;
}

Bool.prototype.__validate__ = (elm: any) => {
  console.log(this);
  return typeof elm === "boolean";
};

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
  { target: "phone", type: Number, required: true, strict: false, min: 20 },
  { target: "password", type: String, required: true, strict: false, min: 8 },
  { target: "is_admin", type: Boolean, required: true, strict: true },
];

const lettuce = new Lettuce(scheme);

describe("Validate schema", function () {
  it("Validate schema length", function () {
    assert.strictEqual(lettuce?.schemes.length, 5);
  });
  it("Parser schemes", async function () {
    const values = {
      email: "ds@lettuce.com",
      phone: 51,
      name: "Bryant",
      password: "$b4feiG*LNzq",
      is_admin: "true",
    };
    const resp = await lettuce.parser(values);
    assert.equal(typeof resp.email, "string");
    assert.equal(typeof resp.phone, "number");
    assert.equal(typeof resp.name, "string");
    assert.equal(typeof resp.password, "string");
  });
});
