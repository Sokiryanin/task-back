import Joi from "joi";

export const boardAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `"title"  must be exist`,
  }),
  tasks: Joi.array().required(),
});

export const boardUpdateSchema = Joi.object({
  title: Joi.string(),
  tasks: Joi.array(),
});