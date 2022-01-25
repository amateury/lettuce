import Lettuce from '../src/lettuce';
import Types from '../src/type';
import {
    verifyErrors,
    MessageValidationErrors,
    MessageValidationSuccessful,
    exception
} from "../src/verifyErrors";


test('Message validation errors', async () => {
    expect(MessageValidationErrors).toBe('args_validation_errors');
    expect(MessageValidationSuccessful).toBe('args_validation_successful');
});

test('Error response (browser)', async () => {
    try {
        exception({
            message: "error_validation",
        }) 
    } catch (error) {
        const {message} : any = error;
        expect(message).toBe('error_validation');
    }

    expect.assertions(1);
});

test('Error response (Server)', async () => {
    try {
        exception({
            message: "error_validation",
        }, 500) 
    } catch (error) {
        const {message, statusCode} : any = error;
        expect(statusCode).toBe(500);
        expect(message).toBe('error_validation');
    }

    expect.assertions(2);
});

test('Args validation errors', async () => {
    const Snack = new Lettuce({
        email: {type: Types.String, required: true, strict: true},
        password: {type: Types.String, required: true, strict: true, min: 8}
    });

    try {
        await Snack.parserSchemes({
            email: "test@sandwich.com",
            password: "123",
        });
    } catch (error) {
        const {message} : any = error;
        expect(message).toBe('args_validation_errors');
    }
    expect.assertions(1);
});

test('Args verify errors', async () => {
    try {
        await verifyErrors([
            {
                password: [ { message: 'minimum_characters', value: 8 } ]
            }
        ]);
    } catch (error) {
        const {message} : any = error;
        expect(message).toBe('args_validation_errors');
    }
    expect.assertions(1);
});