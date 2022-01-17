import Lettuce from '../src/lettuce';
import Types from '../src/type';
import {ParserSchemesResponse} from "../functions/validator";
import {Args} from './types';

const userScheme = {
    email: 'lettuce@amateour.com',
    password: '12345678',
    confirmPassword: '12345678'
}

const validator = new Lettuce({
    email: {type: Types.String, required: true, strict: true},
    password: {type: Types.String, required: true, strict: true, min: 8},
    confirmPassword: {type: Types.String, required: true, strict: true, min: 8}
});

test('Validations schema success', async function () {

    async function validation() {

        const resp0: Args = await validator.parserSchemes(userScheme);

        expect(resp0.args.email.valueOf()).toBe(userScheme.email);
        expect(resp0.args.password.valueOf()).toBe(userScheme.password);
        expect(resp0.message).toBe("args_validation_successful");

        validator.valueOf = false;

        const resp1: ParserSchemesResponse = await validator.parserSchemes(userScheme);

        expect(resp1.args.email).toBe(userScheme.email);
        expect(resp1.args.password).toBe(userScheme.password);
        expect(resp1.message).toBe("args_validation_successful");
    }

    await validation();
});

test('Validations schema exception', async function () {

    async function validation() {
        await validator.parserSchemes({});
    }

    expect.assertions(1);
    await validation().catch(error => {
        expect(error.message).toMatch('args_validation_errors')
    });
});
