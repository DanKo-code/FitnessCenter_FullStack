import validateRequest from "../utils/ValidateRequest.js";
import * as Yup from "yup";

export const postOrdersSchema = Yup.object({
    body: Yup.object({
        email: Yup
            .string()
            .required('Email is required')
            .email('Please enter valid Email'),
        password: Yup
            .string()
            .required('Password is required')
            .min(3, 'Password must be at least 3 characters'),
    }),
});

class ResourcesValidator {
    static async signIn(req, res, next) {
        return validateRequest(req, res, next, postOrdersSchema);
    }


}

export default ResourcesValidator;