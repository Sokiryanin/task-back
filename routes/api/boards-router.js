import express from "express";

import boardsController from "../../controllers/boards-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

const boardsRouter = express.Router();

boardsRouter.get("/", boardsController.getAllBoards);

boardsRouter.get("/:id", boardsController.getById);

boardsRouter.post("/", isEmptyBody, boardsController.createBoard);

// boardsRouter.delete("/:id", boardsService.deleteBoardById);

// boardsRouter.post("/", boardsService.addBoard);

// boardsRouter.put("/:id", boardsService.updateBoardById);

export default boardsRouter;
