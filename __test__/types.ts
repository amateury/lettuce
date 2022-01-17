import {ParserSchemesResponse} from "../functions/validator";

export interface Args extends  ParserSchemesResponse{
    args: {
        email: string,
        password: string,
        confirmPassword: string,
    }
}