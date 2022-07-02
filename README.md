# Lettuce 2.0

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
      "min"
    ],
    "target": "password",
    "value": "true"
  }
]
```
#### `Example 1.1`

### Schemes
A schema represents a validation element, for example:
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

#### Properties of a schema:
#
| property | description                                                                                                                                                                                                                                                                     |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type     | Defines the type of data to validate (String, Number, Array, Object, Boolean, etc).                                                                                                                                                                                             |
| required | (boolean) true for required, false for not required.                                                                                                                                                                                                                            |
| min      | (number) determines the minimum value, if it is a string it will validate the number of characters, in the case of a number it will validate its value.                                                                                                                         |
| max      | (number) determines the maximum value, the same as the min property but pointing to a maximum value.                                                                                                                                                                            |
| value    | assigns a value, it has to be of the same declared type, it can be a function with a return value: () => uuid; o value: 'developer', when passing a function it receives the original value as a parameter, declared in the values to be validated `(value) =>  value + '_01'`. |                                                                                                                                                                                                                                                                                     |
| strict   | (boolean) strictly determines data type validation.                                                                                                                                                                                                                             |
| regex    | Validate using regular expression.                                                                                                                                                                                                                                              ||

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

### Using strict cycle
strictCycle allows to generate errors strictly to the first error generated or
according to the interval of errors per schema.
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

## Contribute
See [contributor guide](https://github.com/amateury/lettuce/blob/main/CODE_OF_CONDUCT.md)

## Persons
#### Person in charge [Bryant Salgado](https://github.com/Binariado)

## License

MIT

**Free Software**

[//]: # (References used to build this document)

[stackoverflow]: <http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax>
[github]: <https://guides.github.com/features/mastering-markdown/#intro>
[anvilproject]: <https://anvilproject.org/guides/content/creating-links>
