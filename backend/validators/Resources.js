import validateRequest from "../utils/ValidateRequest.js";
import * as Yup from "yup";

export const putClientsSchema = Yup.object({
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
        password: Yup
            .string()
            .required('Password is required')
            .min(3, 'Password must be at least 3 characters'),
    }),
});

export const postOrdersSchema = Yup.object({
    body: Yup.object({
        abonementId: Yup
            .string()
            .required('abonementId is required')
            .uuid('abonementId must be uuid type'),
    })
});

export const postCommentsSchema = Yup.object({
    body: Yup.object({
        coachId: Yup
            .string()
            .required('coachId is required')
            .uuid('coachId must be uuid type'),
        reviewText: Yup
            .string()
            .required('reviewText is required')
            .min(5, 'reviewText must be at least 10 characters')
            .max(200, 'reviewText must be at most 200 characters')
    })
});

export const putAbonementSchema = Yup.object({
    body: Yup.object({
        abonementId: Yup
            .string()
            .required('abonementId is required')
            .uuid('abonementId must be uuid type'),
        title: Yup
            .string()
            .required('title is required')
            .min(2, 'title must be at least 2 characters')
            .max(40, 'title must be at most 40 characters')
            .matches(/^[A-Za-zА-Яа-яЁё\s]*$/, 'Please enter valid title. ' +
                'Only english and russian upper and lower case symbols are allowed'),
        validityPeriod: Yup.number().positive().integer().required('validityPeriod is required').min(1).max(12),
        visitingTime: Yup.string().required('visitingTime is required').oneOf(
            ['7.00 - 14.00', '14.00 - 24.00', 'Any Time'],
            'Invalid visitingTime, must be one of: \'7.00 - 14.00\', \'14.00 - 24.00\', \'Any Time\''
        ),
        price: Yup
            .number()
            .typeError('price must be a number')
            .positive('price must be a positive number')
            .required('price is required')
            .min(1)
            .max(10000),
        services: Yup.array().of(Yup.string().uuid()).required('At least 1 service is required')
            .min(1, 'At least one UUID is required')
    })
});

export const postAbonementSchema = Yup.object({
    body: Yup.object({
        title: Yup
            .string()
            .required('title is required')
            .min(2, 'title must be at least 2 characters')
            .max(40, 'title must be at most 40 characters')
            .matches(/^[A-Za-zА-Яа-яЁё\s]*$/, 'Please enter valid title. ' +
                'Only english and russian upper and lower case symbols are allowed'),
        validityPeriod: Yup.number().positive().integer().required('validityPeriod is required').min(1).max(12),
        visitingTime: Yup.string().required('visitingTime is required').oneOf(
            ['7.00 - 14.00', '14.00 - 24.00', 'Any Time'],
            'Invalid visitingTime, must be one of: \'7.00 - 14.00\', \'14.00 - 24.00\', \'Any Time\''
        ),
        price: Yup
            .number()
            .typeError('price must be a number')
            .positive('price must be a positive number')
            .required('price is required')
            .min(1)
            .max(10000),
        services: Yup.array().of(Yup.string().uuid()).required('At least 1 service is required')
            .min(1, 'At least one UUID is required')
    })
});

export const deleteAbonementSchema = Yup.object({
    params: Yup.object({
        abonementId: Yup
            .string()
            .required('abonementId is required')
            .uuid('abonementId must be uuid type'),
    })
});

export const putCoachesSchema = Yup.object({
    body: Yup.object({
        id: Yup
            .string()
            .required('id is required')
            .uuid('id must be uuid type'),
        name: Yup
            .string()
            .required('name is required')
            .min(2, 'name must be at least 2 characters')
            .max(40, 'name must be at most 40 characters')
            .matches(/^[A-Za-zА-Яа-яЁё\s]*$/, 'Please enter valid name. ' +
                'Only english and russian upper and lower case symbols are allowed'),
        description: Yup
            .string()
            .required('description is required')
            .min(5, 'description must be at least 10 characters')
            .max(200, 'description must be at most 200 characters')
    })
});

export const postCoachesSchema = Yup.object({
    body: Yup.object({
        name: Yup
            .string()
            .required('name is required')
            .min(2, 'name must be at least 2 characters')
            .max(40, 'name must be at most 40 characters')
            .matches(/^[A-Za-zА-Яа-яЁё\s]*$/, 'Please enter valid name. ' +
                'Only english and russian upper and lower case symbols are allowed'),
        description: Yup
            .string()
            .required('description is required')
            .min(5, 'description must be at least 10 characters')
            .max(200, 'description must be at most 200 characters')
    })
});

export const deleteCoachesSchema = Yup.object({
    params: Yup.object({
        coachId: Yup
            .string()
            .required('coachId is required')
            .uuid('coachId must be uuid type'),
    })
});

class ResourcesValidator {
    static async putClients(req, res, next) {
        return validateRequest(req, res, next, putClientsSchema);
    }

    static async postOrders(req, res, next) {
        return validateRequest(req, res, next, postOrdersSchema);
    }

    static async postComments(req, res, next) {
        return validateRequest(req, res, next, postCommentsSchema);
    }

    static async putAbonement(req, res, next) {
        return validateRequest(req, res, next, putAbonementSchema);
    }

    static async postAbonement(req, res, next) {
        return validateRequest(req, res, next, postAbonementSchema);
    }

    static async deleteAbonement(req, res, next) {
        return validateRequest(req, res, next, deleteAbonementSchema);
    }

    static async putCoaches(req, res, next) {
        return validateRequest(req, res, next, putCoachesSchema);
    }

    static async postCoaches(req, res, next) {
        return validateRequest(req, res, next, postCoachesSchema);
    }

    static async deleteCoaches(req, res, next) {
        return validateRequest(req, res, next, deleteCoachesSchema);
    }
}

export default ResourcesValidator;