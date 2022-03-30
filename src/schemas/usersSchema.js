import joi from "joi";

const signUpSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  pictureUrl: joi.string().uri(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export { signUpSchema, loginSchema };
