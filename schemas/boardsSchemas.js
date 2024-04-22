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

export const boardAddTaskSchema = Joi.object({
  boardId: Joi.string(),
  taskTitle: Joi.string(),
  description: Joi.string(),
  deadline: Joi.date(),
  priority: Joi.string(),
});

export const boardUpdateTaskSchema = Joi.object({
  boardId: Joi.string(),
  taskId: Joi.string(),
  taskTitle: Joi.string(),
  description: Joi.string(),
  deadline: Joi.date(),
  priority: Joi.string(),
});