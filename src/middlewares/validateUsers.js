import { signUpSchema, loginSchema } from "../schemas/usersSchema.js";

export async function validateUsers(req, res, next) {
  const validation = signUpSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }
  next();
}

export async function validateLogin(req, res, next) {
  const validation = loginSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }
  next();
}
