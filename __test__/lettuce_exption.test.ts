import { scheme } from '../functions/validator';
import Lettuce from '../src/lettuce';
import Types from '../src/type';


// test('Error validation type undefined', async function () {
//     try {
//         validArguments('data', {})
//         ejectMessage('data', {})
//     } catch (error: any) {
//         expect(error).toBe('non-specific validation function')
//     }

//     try {
//         ejectMessage('data', {})
//     } catch (error: any) {
//         expect(error).toBe('non-specific validation function: undefined response message')
//     }

//     expect.assertions(2);
// });

test('Exception for the minimum and maximum required', async function () {

    const validator = new Lettuce({
        password: {
            type: Types.String,
            required: true,
            strict: true,
            max: 8,
            min: 8,
            message: "Error validation"
        },
        confirmPassword: {
            type: Types.String,
            required: true,
            strict: true,
            max: 8,
            min: 8
        },
        name: {
            type: Types.String,
            required: true,
            strict: true,
            max: 8
        },
        mobil: {
            type: Types.Number,
            required: true,
            strict: true,
            max: 13,
            min: 8
        },
        addresses: {
            type: Types.Array,
            required: true,
            strict: true,
        },
        custom: {
            type: (value: string, scheme: scheme): string => {
                return scheme.required ? value : 'customers'
            },
            required: true,
        }
    });

    async function validation() {
        await validator.parserSchemes({
            name: "Brayan Salgado",
            password: "123456789",
            confirmPassword: "123456",
            mobil: 320102032,
            addresses: [
                {
                    address: "kra 20 # 110 - 45"
                }
            ],
            custom: "custom"
        });
    }

    expect.assertions(1);
    await validation().catch(error => {
        expect(error.message).toBe('args_validation_errors')
    });
});


test('Error validation data undefined', async function () {

    const validator = new Lettuce({
        validType: {
            type: undefined,
        }
    });

    async function validation() {
        await validator.parserSchemes({
            validType: "1234567"
        });
    }

    expect.assertions(1);
    await validation().catch(error => {
        expect(error.message).toBe('validType => 1234567 no data type')
    });
});

test('Error validation', async function () {

    const validator = new Lettuce({
        password: {
            type: Types.String,
            required: true,
            strict: true,
            validation: (value) => new String(value).length >= 8,
        }
    });

    async function validation() {
        await validator.parserSchemes({
            password: "1234567"
        });
    }

    expect.assertions(1);
    await validation().catch(error => {
        expect(error.message).toBe('args_validation_errors')
    });
});

test('Data validation exception required', async function () {

    const validator = new Lettuce({
        name: {
            type: Types.String,
            required: true,
            strict: true
        }
    });

    async function validation() {
        await validator.parserSchemes({
        });
    }

    expect.assertions(1);
    await validation().catch(error => {
        expect(error.message).toBe('args_validation_errors')
    });
});

test('Data validation exception strict', async function () {

    const validator = new Lettuce({
        name: {
            type: Types.String,
            required: true,
            strict: true,
            message: {
                strict: "A string data type is expected"
            }
        }
    });

    async function validation() {
        await validator.parserSchemes({
            name: 124
        });
    }

    expect.assertions(2);
    await validation().catch(error => {
        expect(error.errors[0].name[0]).toBe('A string data type is expected')
        expect(error.message).toBe('args_validation_errors')
    });
});

test('Data validation exception strict', async function () {

    const validator = new Lettuce({
        name: {
            type: Types.String,
            required: true,
            strict: true
        }
    });

    async function validation() {
        await validator.parserSchemes({
            name: 124
        });
    }

    expect.assertions(1);
    await validation().catch(error => {
        expect(error.message).toBe('args_validation_errors')
    });
});

