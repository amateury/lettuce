import Lettuce from "./lettuce";
import assert = require("assert");

class Bool {
  value: boolean;
  constructor(value: boolean) {
    this.value = Boolean(value);
  }
  static async __validate__(elm: any) {
    return typeof elm === "boolean";
  }
}

function value(val: any) {
  console.log(val);
  return val;
}

const scheme = [
  { target: "email", type: String, required: true, strict: false, value },
  {
    target: "name",
    type: String,
    required: false,
    strict: false,
    min: 2,
    max: 50,
    value: null,
  },
  { target: "password", type: String, required: true, strict: false, min: 8 },
  { target: "phone", type: Number, required: true, strict: false, min: 20 },
];

const lettuce = new Lettuce(scheme);

describe("Array", function () {
  describe("Scheme Data", function () {
    it("Validate schema length", function () {
      assert.equal(lettuce?.schemes.length, 4);
    });
    it("Parser schemes", async function () {
      const values = {
        email: "ds@lettuce.com",
        phone: 50,
        password: "dsdsdsfaw2332",
      };
      const resp = await lettuce.parser(values);
      console.log(resp);
      assert.equal(lettuce?.schemes.length, 4);
    });
  });
});
