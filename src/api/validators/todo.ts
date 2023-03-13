import Joi from "joi";

/**
 * Validator for user details during registration
 * @validator
 */

export const TodoValidation: any = Joi.object({
    title: Joi.string().required(),
    task: Joi.string().required(),
    
})