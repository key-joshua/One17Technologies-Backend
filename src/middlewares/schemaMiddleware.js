import Joi from 'joi';
import joiPhone from 'joi-phone-number';
import validateSchema from './validateSchema';

const customJoi = Joi.extend(joiPhone);

const validateSaveUser = (req, res, next) => {
  const saveUserSchema = Joi.object()
    .keys({
      name: Joi.string().trim().min(2).required()
        .messages({
          'any.required': 'name is required',
          'string.empty': 'name is not allowed to be empty',
          'string.min': 'name length must be at least 2 characters long',
        }),
      phone: customJoi.string().phoneNumber({ format: 'international', strict: true }).required().messages({
        'any.required': 'phone is required',
        'string.empty': 'phone is not allowed to be empty',
        'phoneNumber.invalid': 'phone did not seem to be a phone number',
      }),
      dob: Joi.date()
        .min(new Date('1900-01-01').toISOString().split('T')[0])
        .max(new Date().toISOString().split('T')[0])
        .required()
        .messages({
          'any.required': 'dob is required',
          'string.empty': 'dob is not allowed to be empty',
        }),
    })
    .options({ abortEarly: false });

  return validateSchema(saveUserSchema, req.body, res, next);
};

const validateUpdateUser = (req, res, next) => {
  const updateUserSchema = Joi.object()
    .keys({
      name: Joi.string().trim().min(2)
        .messages({
          'any.required': 'name is required',
          'string.empty': 'name is not allowed to be empty',
          'string.min': 'name length must be at least 2 characters long',
        }),
      phone: customJoi.string().phoneNumber({ format: 'international', strict: true }).messages({
        'any.required': 'phone is required',
        'string.empty': 'phone is not allowed to be empty',
        'phoneNumber.invalid': 'phone did not seem to be a phone number',
      }),
      dob: Joi.date()
        .min(new Date('1900-01-01').toISOString().split('T')[0])
        .max(new Date().toISOString().split('T')[0])
        .messages({
          'any.required': 'dob is required',
          'string.empty': 'dob is not allowed to be empty',
        }),
    })
    .options({ abortEarly: false });

  return validateSchema(updateUserSchema, req.body, res, next);
};

export {
  validateSaveUser,
  validateUpdateUser,
};
