import express from "express";
import boardsController from "../../controllers/boards-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";
import {
  boardAddSchema,
  boardTitleSchema,
  boardUpdateSchema,
} from "../../models/Board.js";

const boardsRouter = express.Router();

/* Boards */
boardsRouter.get("/", boardsController.getBoards);

boardsRouter.get("/:id", isValidId, boardsController.getBoardById);

boardsRouter.post(
  "/",
  isEmptyBody,
  validateBody(boardAddSchema),
  boardsController.createBoard
);

boardsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(boardUpdateSchema),
  boardsController.updateByIdBoard
);

boardsRouter.patch(
  "/:id/title",
  isValidId,
  isEmptyBody,
  validateBody(boardTitleSchema),
  boardsController.updateByIdBoard
);

boardsRouter.delete("/:id", isValidId, boardsController.deleteByIdBoard);

// /* Tasks */
// boardsRouter.post(
//   "/:id/tasks",
//   isEmptyBody,
//   validateBody(boardAddTaskSchema),
//   boardsController.createNewTask
// );

// boardsRouter.put(
//   "/:id/tasks/:taskId",
//   isEmptyBody,
//   validateBody(boardUpdateTaskSchema),
//   boardsController.updateTaskById
// );

// boardsRouter.delete("/:id/tasks/:taskId", boardsController.deleteTaskById);

export default boardsRouter;
