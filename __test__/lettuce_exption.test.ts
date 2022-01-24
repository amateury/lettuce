import Lettuce from '../src/lettuce';
import Types from '../src/type';

test('Throw exception for data type', async function () {

    const validator = new Lettuce({
        password: {
            type: Types.String,
            required: true,
            strict: true,
            min: 8,
            message: "Error validation"
        }
    });

    async function validation() {
        await validator.parserSchemes({
            password: 1234567
        });
    }

    expect.assertions(1);
    await validation().catch(error => {
        expect(error.errors[0].password[0]).toBe('Error validation')
    });
});

test('Validations schema exception', async function () {

    const validator = new Lettuce({
        password: {
            type: Types.String,
            required: true,
            strict: true,
            min: 8,
            message: "Error validation"
        }
    });

    async function validation() {
        await validator.parserSchemes({
            password: "1234567"
        });
    }

    expect.assertions(2);
    await validation().catch(error => {
        expect(error.errors[0].password[0]).toBe('Error validation')
        expect(error.message).toBe('args_validation_errors')
    });
});
