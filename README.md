# Lettuce 2.1

[![build](https://github.com/amateury/lettuce/actions/workflows/main.yml/badge.svg)](https://github.com/amateury/lettuce/actions/workflows/main.yml) [![develop](https://github.com/amateury/lettuce/actions/workflows/develop.yml/badge.svg)](https://github.com/amateury/lettuce/actions/workflows/develop.yml) [![Coverage Status](https://coveralls.io/repos/github/amateury/lettuce/badge.svg?branch=main)](https://coveralls.io/github/amateury/lettuce?branch=main)

It is a library that allows a rigorous validation of the data, according to a specific pattern (a scheme).

## Installation

requires [Node.js](https://nodejs.org/) v12+.

```sh
npm i @amateury/lettuce --save
```

## Usage

### Validator

```js
import Lettuce from "@amateury/lettuce";

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
  {
    target: "password",
    type: String,
    required: false,
    strict: false,
    min: 8,
  }
];

const lettuce = new Lettuce(scheme);

const values = {
  email: "albert@lettuce.com",
  name: "Albert",
  password: "$b4fei"
}

lettuce.parser(values).then((data) => {
  console.log(data); // successful
}).catch((e) => {
  console.log(e); // Error response
});
```

#### `Example 1`

The <-parser-> method executes the data validation, if it is successful, the response message is the data sent to validation, otherwise it generates an exception:

***Response successful***

```json
{
  "email": "albert@lettuce.com",
  "name": "Albert",
  "password": "$b4fei"
}
```

#### `Example 1.1`

***Response error***

In the event that we send, we request that the password contain a minimum of 8 characters

```json
[
  {
    "error": [
      "password_min"
    ],
    "target": "password",
    "value": "true"
  }
]
```

#### `Example 1.2`

### Schemes

A schema represents a validation element, for example:

#### `Example 2`

```sh
  {
    target: "name",
    type: String,
    required: false,
    strict: false,
    min: 2,
    max: 50,
    regex: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  }
```

such a schema contains properties, each with its own validation target, for example

#### Properties of a schema

| property | description                                                                                                                                                                                                                                                                     |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type     | Defines the type of data to validate (String, Number, Array, Object, Boolean, etc).                                                                                                                                                                                             |
| required | (boolean) true for required, false for not required. Default is true                                                                                                                                                                                                            |
| min      | (number) determines the minimum value, if it is a string it will validate the number of characters, in the case of a number it will validate its value.                                                                                                                         |
| max      | (number) determines the maximum value, the same as the min property but pointing to a maximum value.                                                                                                                                                                            |
| value    | assigns a value, it has to be of the same declared type, it can be a function with a return value: () => uuid; o value: 'developer', when passing a function it receives the original value as a parameter, declared in the values to be validated `(value) =>  value + '_01'`. |                                                                                                                                                                                                                                                                                     |
| strict   | (boolean) strictly determines data type validation. Default is true                                                                                                                                                                                                             |
| regex    | Validate using regular expression.
| message | (Object or string) Create custom error messages                                                                                                                                                                                                                                            ||

### Using properties in the schema: some examples

#### *type:*

Of all the properties, type is the only one required. The data type is defined with the containers.
example of javascript primitives:

```sh
{ target: "phone", type: String }
```

It is also possible to define multiple data types, in this case allowing string and null data types

```sh
{ target: "phone", type: [String, null] }
```

For the case of choice we use it in this way

```sh
{ target: "phone", type: ["active", "inactive"] }
```

For a bit more flexibility, it is possible to configure a custom data type

```js
class MyCustomValidation {
  static __validate__(val: string) {
    return typeof val === "string";
  }
}
```

And in this way pass MyCustomValidation as the data type to validate

```sh
{ target: "phone", type: MyCustomValidation }
```

#### *strict:*

if strict is true, and the type is a String, the value to validate is a numeric data, it will
not pass the validation, but if strict is false, it will accept the data type as a string if
its conversion to a string is possible; otherwise it will throw an invalid data type error.

```js
import Lettuce, { IScheme, TValues } from "@amateury/lettuce";

function example(values: TValues[]) {
  const sheme: IScheme[] = [
    { target: "phone", type: String, strict: true }
  ]
  const lettuce = new Lettuce(sheme);
  lettuce.parser(values).then((data) => data).catch((e) => {
    console.log(e); // Error response
  });
}
example({ phone: 20 });
```

#### *message:*

Allows you to create custom error messages

```js
import Lettuce, { IScheme, TValues } from "@amateury/lettuce";

function example(values: TValues[]) {
  const sheme: IScheme[] = [
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
      }
    },
    {
      target: "email",
      type: String,
      required: true,
      strict: true,
      min: 125,
      regex: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: "Error validation"
    },
    {
      target: "phone",
      type: String,
      max: 10,
      min: 10,
      required: false,
      strict: false,
      message: {
        max: "phone_max_10"
      }
    }
  ]
  const lettuce = new Lettuce(sheme);
  lettuce.parser({ phobe: "30012343211", email: "lettuce.mail.com" }).then((data) => data).catch((e) => {
    console.log(e); // Error response
    /**
     * [
     *  {
     *    "error": [
     *      "username_is_required", 
     *      "username_type"    
     *    ],
     *    "target": "username"
     *  },
     *  {
     *    "error": [
     *      "phone_max_10"   
     *    ],
     *    "target": "phone"
     *    "value": "30012343211"
     *  },
     *  {
     *    "error": [
     *      "Error validation"   
     *    ],
     *    "target": "phone"
     *    "value": "lettuce.mail.com"
     *  }
     * ]
     */
  });
}
example({ phone: 20 });
```

### Using strict cycle

strictCycle allows you to generate errors strictly to the first error generated or according to
the interval of errors per schema. Each schema can generate a group of errors that are grouped
in an object with the information of the errors that is an interval, strictCycle in true
represents interval 1.

#### `Example 2.1`

```js
import Lettuce, { IScheme, TValues } from "@amateury/lettuce";

async function example(values: TValues[]) {
  const schemas = [
    {
      target: "email",
      type: String,
      required: true,
      strict: true,
      regex: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    },
    {
      target: "age",
      type: Number,
      min: 18,
    },
  ]
  try {
    const lettuce = new Lettuce(schemas, {
      strictCycle: true,
    });
    await lettuce.parser({ email: "lettuce", age: 15 });
  } catch (e) {
    console.log(e.length); // 1
  }
}
example({ phone: 20 });
```

strictCycle in interval 2:

```js
import Lettuce, { IScheme, TValues } from "@amateury/lettuce";

async function example(values: TValues[]) {
  try {
    const lettuce = new Lettuce(schemas, {
      strictCycle: 2,
    });
    await lettuce.parser({ email: "lettuce", age: 15 });
  } catch (e) {
    console.log(e.length); // 2
  }
}
example({ phone: 20 });
```

## Change

The response of the error message was changed, before an array with the messages in the key error was answered, said message was a string with the word of the validation property, for example:

[usage example](https://github.com/amateury/lettuce#message)

```sh
["max", "regex"]
```

A default string is now passed that combines the validation property and the target name example:

```sh
["username_max", "username_regex"]
```

## Contribute

See [contributor guide](https://github.com/amateury/lettuce/blob/main/CODE_OF_CONDUCT.md)

## Persons

### Person in charge [Bryant Salgado](https://github.com/Binariado)

## License

MIT

**Free Software**

[//]: # (References used to build this document)
