# lettuce
[![build](https://github.com/amateury/lettuce/actions/workflows/main.yml/badge.svg)](https://github.com/amateury/lettuce/actions/workflows/main.yml) [![develop](https://github.com/amateury/lettuce/actions/workflows/develop.yml/badge.svg)](https://github.com/amateury/lettuce/actions/workflows/develop.yml) [![Coverage Status](https://coveralls.io/repos/github/amateury/lettuce/badge.svg?branch=main)](https://coveralls.io/github/amateury/lettuce?branch=main)

It is a library that allows a rigorous validation of the data, according to a specific pattern (a scheme).

## Installation

requires [Node.js](https://nodejs.org/) v12+.

```sh
npm i @amateury/lettuce --save
```

## Usage

### Validator

#### Example 1

```js
import Lettuce from '@amateury/lettuce';

const values = {
    email: 'lettuce@amateour.com',
    password: '12345678',
    confirmPassword: '12345678'
}

const schemes = {
    email: {type: Types.String, required: true, strict: true, validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)},
    password: {type: Types.String, required: true, strict: true, min: 8},
    confirmPassword: {type: Types.String, required: true, strict: true, min: 8},
}

try {
const validator = new Lettuce(schemes);
// Run data validation
const response = await validator.parserSchemes(values);


console.log(response)

// successful
/*
{
  message: 'args_validation_successful',
  errors: [],
  statusCode: 200,
}
*/

} catch {
// errors
}
```

The Lettuce class parserSchemes method executes the data validation, in case it is successful, the response message will be:

##### Successful validation message 

`Example 1.1`

```json
{
  "message": "args_validation_successful",
  "errors": [],
  "statusCode": 200,
}
```

Otherwise it will raise an exception:

##### Bad validation message 

`Example 1.2`

```json
{
  "message": "args_validation_errors",
  "errors": [
    {"password": ["maximum_characters_8"]}
  ],
  "statusCode": 400,
}
```

### Schemes
A schema represents a validation element, for example:
```
    {type: Sandwich.String, required: true, strict: true}
```
that schema contains properties, each with its own validation target.

##### Properties of a schema: 
#
property | description
------------ | -------------
type | type of data,
required | (boolean) true required, false not required
min | (number) determines the minimum value, if it is a string it will validate the number of characters, in the case of a number it will validate its value.
max | (number) determines the maximum value, the same as the min property but pointing to a maximum value.
value | assigns a value, it has to be of the same declared type, it can be a function with a return value: () => uuid; o value: 'developer', when passing a function it receives the original value as a parameter, declared in the values to be validated `(value) =>  value + '_01'`
validation | (function) custom data validation
strict | (Boolean) determines the validation of the data type strictly if it is true, for example if the type is string and the value is a number, it will not pass the validation, but if it is false it will accept the data type as string if possible within the new chain; otherwise it will throw invalid data type error

#### Parser:
the method parser_schemes () function is executed to parse the pattern of each schema according to the value of its parser element, see [examples 1](#example-1)

## Contribute
See [contributor guide](https://github.com/amateury/lettuce/blob/main/CODE_OF_CONDUCT.md)

## Persons
#### Person in charge [Brayan Salgado](https://github.com/Binariado)

## License

MIT

**Free Software**

[//]: # (References used to build this document)

   [stackoverflow]: <http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax>
   [github]: <https://guides.github.com/features/mastering-markdown/#intro>
   [anvilproject]: <https://anvilproject.org/guides/content/creating-links>