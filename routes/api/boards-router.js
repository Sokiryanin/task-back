import express from "express";

import boardsController from "../../controllers/boards-controller.js";

const boardsRouter = express.Router();

boardsRouter.get("/", boardsController.getAllBoards);

boardsRouter.get("/:id", boardsController.getById);

// boardsRouter.delete("/:id", boardsService.deleteBoardById);

// boardsRouter.post("/", boardsService.addBoard);

// boardsRouter.put("/:id", boardsService.updateBoardById);

export default boardsRouter;
