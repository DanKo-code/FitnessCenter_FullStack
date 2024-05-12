import validateRequest from "../utils/ValidateRequest.js";
import * as Yup from "yup";

export const signInSchema = Yup.object({
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

export const signUpSchema = Yup.object({
    body: Yup.object({
        firstName: Yup
            .string()
            .required('FirstName is required')
            .min(2, 'FirstName must be at least 2 characters')
            .max(40, 'FirstName must be at most 40 characters')
            .matches(/^[A-Za-zА-Яа-яЁё\s]*$/, 'Please enter valid FirstName. ' +
                'Only english and russian upper and lower case symbols are allowed'),
        lastName: Yup
            .string()
            .required('LastName is required')
            .min(2, 'LastName must be at least 2 characters')
            .max(40, 'LastName must be at most 40 characters')
            .matches(/^[A-Za-zА-Яа-яЁё\s]*$/, 'Please enter valid LastName. ' +
                'Only english and russian upper and lower case symbols are allowed'),
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

export const logoutSchema = Yup.object({
    cookies: Yup.object({
        refreshToken: Yup.string().required("RefreshToken is required"),
    }),
});

export const refreshSchema = Yup.object({
    cookies: Yup.object({
        refreshToken: Yup.string().required("RefreshToken is required"),
    }),
});

class AuthValidator {
    static async signIn(req, res, next) {
        return validateRequest(req, res, next, signInSchema);
    }

    static async signUp(req, res, next) {
        return validateRequest(req, res, next, signUpSchema);
    }

    static async logOut(req, res, next) {
        return validateRequest(req, res, next, logoutSchema);
    }

    static async refresh(req, res, next) {
        return validateRequest(req, res, next, refreshSchema);
    }
}

export default AuthValidator;
