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
import Lettuce from '@amateury/lettuce';

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
  "email": "albert@lettuce.com",
  "name": "Albert",
  "password": "$b4fei"
}

lettuce.parser(values).then((data) => {
  console.log(data); // successful
}).catch((e) => {
  console.log(e); // Error response
});
```
`Example 1`

The <-parser-> method executes the data validation, if it is successful, the response message is the data sent to validation, otherwise it generates an exception:

***Response successful***

```json
{
  "email": "albert@lettuce.com",
  "name": "Albert",
  "password": "$b4fei"
}
```
`Example 1.1`

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
`Example 1.1`

### Schemes
A schema represents a validation element, for example:
```
  {
    target: "name",
    type: String,
    required: false,
    strict: false,
    min: 2,
    max: 50,
  }
```
such a schema contains properties, each with its own validation target, for example

##### Properties of a schema:
#
| property | description                                                                                                                                                                                                                                                                                                             |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type     | data type (String, Number, Array, Object, Boolean).                                                                                                                                                                                                                                                                     |
| required | (boolean) true for required, false for not required.                                                                                                                                                                                                                                                                    |
| min      | (number) determines the minimum value, if it is a string it will validate the number of characters, in the case of a number it will validate its value.                                                                                                                                                                 |
| max      | (number) determines the maximum value, the same as the min property but pointing to a maximum value.                                                                                                                                                                                                                    |
| value    | assigns a value, it has to be of the same declared type, it can be a function with a return value: () => uuid; o value: 'developer', when passing a function it receives the original value as a parameter, declared in the values to be validated `(value) =>  value + '_01'`.                                         |                                                                                                                                                                                                                                                                                     |
| strict   | (Boolean) determines the validation of the data type strictly if it is true, for example if the type is string and the value is a number, it will not pass the validation, but if it is false it will accept the data type as string if possible within the new chain; otherwise it will throw invalid data type error. |
| regex    | Validate using regular expression                                                                                                                                                                                                                                                                                       ||

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
