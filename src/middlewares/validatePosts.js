import postsSchema from "../schemas/postsSchema.js";

export async function validatePosts(req, res, next) {
  const validation = postsSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }
  next();
}
