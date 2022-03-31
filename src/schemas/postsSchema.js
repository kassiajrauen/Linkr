import joi from "joi";

const postsSchema = joi.object({
  userId: joi.number().integer().required(),
  description: joi.string().allow("").required(),
  link: joi.string().uri().required(),
});

export default postsSchema;
