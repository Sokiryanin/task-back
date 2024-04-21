import { HttpError } from "../helpers/index.js";
import boardService from "../models/boards/index.js";
import { boardAddSchema } from "../schemas/boardsSchemas.js";

/* Boards */

const getAllBoards = async (req, res, next) => {
  try {
    const result = await boardService.getAllBoards();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    // req.params - получаем все динамические параметры из url.

    const { id } = req.params;
    const result = await boardService.getBoardById(id);

    if (!result) {
      throw HttpError(404, `Board with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createBoard = async (req, res, next) => {
  try {
    /* нам потрібно передати тіло запиту, воно знаходитсья в req.body
console.log(req.body); */

    // Диструктуризуємо error
    const { error } = boardAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await boardService.addBoard(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// export const deleteBoard = (req, res) => {};
// export const updateBoard = (req, res) => {};

/* Tasks */

export default {
  getAllBoards,
  getById,
  createBoard,
};
