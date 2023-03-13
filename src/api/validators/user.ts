import Joi from "joi";

/**
 * Validator for user details during registration
 * @validator
 */

export const UserValidation : any = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
});

export const UserVerification : any = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
});

