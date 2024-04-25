import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";
import Joi from "joi";

const priorityList = ["high", "medium", "low"];

/* JOI schema */
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
  taskTitle: Joi.string().required(),
  description: Joi.string().required(),
  deadline: Joi.date().required(),
  priority: Joi.string()
    .valid(...priorityList)
    .required(),
});

export const boardUpdateTaskSchema = Joi.object({
  taskTitle: Joi.string(),
  description: Joi.string(),
  deadline: Joi.date(),
  priority: Joi.string().valid(...priorityList),
});

export const boardTitleSchema = Joi.object({
  title: Joi.string().required(),
});

/* Mongoose schema */
const taskSchema = new Schema({
  boardId: {
    type: String,
  },
  taskTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: priorityList,
    required: true,
  },
});

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tasks: {
      type: [taskSchema], // Массив задач, каждая из которых соответствует схеме taskSchema
      default: [], // По умолчанию tasks пустой массив
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post("save", handleSaveError);

boardSchema.pre("findOneAndUpdate", preUpdate);

boardSchema.post("findOneAndUpdate", handleSaveError);

const Board = model("board", boardSchema);

export default Board;


