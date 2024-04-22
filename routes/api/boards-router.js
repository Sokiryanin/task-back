import express from "express";

import boardsController from "../../controllers/boards-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

const boardsRouter = express.Router();

boardsRouter.get("/", boardsController.getBoards);

boardsRouter.get("/:id", boardsController.getBoardById);

boardsRouter.post("/", isEmptyBody, boardsController.createBoard);

boardsRouter.put("/:id", isEmptyBody, boardsController.updateByIdBoard);

boardsRouter.delete("/:id", boardsController.deleteByIdBoard);




export default boardsRouter;
