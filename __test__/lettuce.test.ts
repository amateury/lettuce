import Lettuce from '../src/lettuce';
import Types from '../src/type';
import {ParserSchemesResponse} from "../functions/validator";
import {Args} from './types';

const userScheme = {
    email: 'lettuce@amateour.com',
    password: '12345678',
    confirmPassword: '12345678',
    lastName: "Brayan Salgado"
}

const schemes = {
    id: {
        type: Types.String, required: true, value: 'dd89918b-6638-4f18-ad22-c80b416ac89e', strict: true
    },
    email: {type: Types.String, required: true, strict: true, validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)},
    password: {type: Types.String, required: true, strict: true, min: 8},
    confirmPassword: {type: Types.String, required: true, strict: true, min: 8},
    lastName: {type: Types.String, required: true, strict: true, min: 2, max: 50}
}

const validator = new Lettuce(schemes);

test('Validations schema success', async function () {

    async function validation() {

        const resp0: Args = await validator.parserSchemes(userScheme);

        expect(resp0.args.id.valueOf()).toBe('dd89918b-6638-4f18-ad22-c80b416ac89e');
        expect(resp0.args.email.valueOf()).toBe(userScheme.email);
        expect(resp0.args.password.valueOf()).toBe(userScheme.password);
        expect(resp0.message).toBe("args_validation_successful");

        validator.reset()

        validator.schemes = schemes;
        validator.values = userScheme;

        validator.valueOf = false;

        const resp1: ParserSchemesResponse = await validator.parserSchemes(userScheme);

        expect(resp1.args.id).toBe('dd89918b-6638-4f18-ad22-c80b416ac89e');
        expect(resp1.args.email.valueOf()).toBe(userScheme.email);
        expect(resp1.args.email).toBe(userScheme.email);
        expect(resp1.args.password).toBe(userScheme.password);
        expect(resp1.message).toBe("args_validation_successful");
    }

    await validation();
});

