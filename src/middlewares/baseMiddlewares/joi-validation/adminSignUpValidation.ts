import { Joi } from "express-joi-validations";

const adminSignUpValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required().email(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required().min(6),
});

export { adminSignUpValidation };
