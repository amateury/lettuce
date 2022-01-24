import Lettuce from '../src/lettuce';
import Types from '../src/type';
import {verifyErrors} from "../src/verifyErrors";

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