import { HttpError } from "../helpers/index.js";
import boardService from "../models/boards/index.js";
import {
  boardAddSchema,
  boardAddTaskSchema,
  boardUpdateSchema,
  boardUpdateTaskSchema,
} from "../schemas/boardsSchemas.js";

/* Boards */

const getBoards = async (req, res, next) => {
  try {
    const result = await boardService.getAllBoards();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getBoardById = async (req, res, next) => {
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

const updateByIdBoard = async (req, res, next) => {
  try {
    const { error } = boardUpdateSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    // якщо все ок то забираємо id з req.params
    const { id } = req.params;

    // передаємо в наш метод id і req.body
    const result = await boardService.updateBoardById(id, req.body);
    // потрібно обробити якщо отримаємо null
    if (!result) {
      throw HttpError(404, `Board with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteByIdBoard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await boardService.deleteBoardById(id);

    if (!result) {
      throw HttpError(404, `Board with id=${id} not found`);
    }
    res.json(result);
    // res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/* Tasks */

const createNewTask = async (req, res, next) => {
  try {
    const { error } = boardAddTaskSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await boardService.addTaskToBoard(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateTaskById = async (req, res, next) => {
  try {
    const { error } = boardUpdateTaskSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id, taskId } = req.params;
    const result = await boardService.updateTaskInBoard(id, taskId, req.body);
    if (!result) {
      throw HttpError(
        404,
        `Task with id=${taskId} in board with id=${id} not found`
      );
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteTaskById = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const result = await boardService.deleteTaskFromBoard(taskId); // Передаем taskId напрямую
    console.log(result);

    if (!result) {
      throw HttpError(
        404,
        `Task with id=${taskId} in board with id=${id} not found`
      );
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getBoards,
  getBoardById,
  createBoard,
  updateByIdBoard,
  deleteByIdBoard,
  createNewTask,
  updateTaskById,
  deleteTaskById,
};
