import express from "express";
import boardsController from "../../controllers/boards-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";

import {
  boardAddSchema,
  boardAddTaskSchema,
  boardUpdateSchema,
  boardUpdateTaskSchema,
} from "../../schemas/boardsSchemas.js";

import { validateBody } from "../../decorators/index.js";

const boardsRouter = express.Router();

/* Boards */
boardsRouter.get("/", boardsController.getBoards);

boardsRouter.get("/:id", boardsController.getBoardById);

boardsRouter.post(
  "/",
  isEmptyBody,
  validateBody(boardAddSchema),
  boardsController.createBoard
);

boardsRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(boardUpdateSchema),
  boardsController.updateByIdBoard
);

boardsRouter.delete("/:id", boardsController.deleteByIdBoard);

/* Tasks */
boardsRouter.post(
  "/:id/tasks",
  isEmptyBody,
  validateBody(boardAddTaskSchema),
  boardsController.createNewTask
);

boardsRouter.put(
  "/:id/tasks/:taskId",
  isEmptyBody,
  validateBody(boardUpdateTaskSchema),
  boardsController.updateTaskById
);
boardsRouter.delete("/:id/tasks/:taskId", boardsController.deleteTaskById);

export default boardsRouter;
