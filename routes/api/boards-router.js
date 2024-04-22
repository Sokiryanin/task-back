import express from "express";

import boardsController from "../../controllers/boards-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

const boardsRouter = express.Router();

/* Boards */
boardsRouter.get("/", boardsController.getBoards);
boardsRouter.get("/:id", boardsController.getBoardById);
boardsRouter.post("/", isEmptyBody, boardsController.createBoard);
boardsRouter.put("/:id", isEmptyBody, boardsController.updateByIdBoard);
boardsRouter.delete("/:id", boardsController.deleteByIdBoard);

/* Tasks */
boardsRouter.post("/:id/tasks", isEmptyBody, boardsController.createNewTask);
boardsRouter.put(
  "/:id/tasks/:taskId",
  isEmptyBody,
  boardsController.updateTaskById
);
boardsRouter.delete("/:id/tasks/:taskId", boardsController.deleteTaskById);


export default boardsRouter;
