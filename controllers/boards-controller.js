import Board from "../models/Board.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

/* Boards */
const getBoards = async (req, res) => {
  const result = await Board.find();
  res.json(result);
};

const getBoardById = async (req, res) => {
  // req.params - получаем все динамические параметры из url.
  const { id } = req.params;
  const result = await Board.findById(id);

  if (!result) {
    throw HttpError(404, `Board with id=${id} not found`);
  }
  res.json(result);
};

const createBoard = async (req, res) => {
  /* нам потрібно передати тіло запиту, воно знаходитсья в req.body
console.log(req.body); */
  const result = await Board.create(req.body);
  res.status(201).json(result);
};

const updateByIdBoard = async (req, res) => {
  // якщо все ок то забираємо id з req.params
  const { id } = req.params;
  // передаємо в наш метод id і req.body
  const result = await Board.findByIdAndUpdate(id, req.body);

  // потрібно обробити якщо отримаємо null
  if (!result) {
    throw HttpError(404, `Board with id=${id} not found`);
  }
  res.json(result);
};

const deleteByIdBoard = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, `Board with id=${id} not found`);
  }

  // res.json(result);
  // res.status(204).send();
  res.json({
    message: "Delete success",
  });
};

/* Tasks */
// const createNewTask = async (req, res) => {
//   const result = await boardService.addTaskToBoard(req.body);
//   res.status(201).json(result);
// };
const createNewTask = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { taskTitle, description, deadline, priority } = req.body;

  const result = await Board.findById(id);
  if (!result) {
    throw HttpError(404, `Board with id=${id} not found`);
  }

  result.tasks.push({ taskTitle, description, deadline, priority });
  await result.save();

  res.status(201).json(result);
};

// const updateTaskById = async (req, res) => {
//   const { id, taskId } = req.params;
//   const result = await boardService.updateTaskInBoard(id, taskId, req.body);
//   if (!result) {
//     throw HttpError(
//       404,
//       `Task with id=${taskId} in board with id=${id} not found`
//     );
//   }
//   res.json(result);
// };
const updateTaskInBoard = async (req, res) => {
  const { id, taskId } = req.params;
  const { taskTitle, description, deadline, priority } = req.body;

  const updateObj = {
    "tasks.$[task]": {
      taskTitle,
      description,
      deadline,
      priority,
      boardId: id, // Сохраняем boardId
    },
  };

  const result = await Board.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
      arrayFilters: [{ "task._id": taskId }],
    }
  );

  if (!result) {
    throw HttpError(404, `Board with id=${id} not found`);
  }

  res.json(result);
};
// const deleteTaskById = async (req, res) => {
//   const { taskId } = req.params;
//   const result = await boardService.deleteTaskFromBoard(taskId); // Передаем taskId напрямую
//   console.log(result);

//   if (!result) {
//     throw HttpError(
//       404,
//       `Task with id=${taskId} in board with id=${id} not found`
//     );
//   }
//   res.json(result);
// };

const deleteTaskFromBoard = async (req, res) => {
  const { id, taskId } = req.params;

  // Находим доску по id
  const result = await Board.findById(id);
  if (!result) {
    throw HttpError(404, `Board with id=${id} not found`);
  }

  // Удаляем задачу по taskId
  result.tasks.pull({ _id: taskId });
  await result.save();

  res.json(result);
};

export default {
  getBoards: ctrlWrapper(getBoards),
  getBoardById: ctrlWrapper(getBoardById),
  createBoard: ctrlWrapper(createBoard),
  updateByIdBoard: ctrlWrapper(updateByIdBoard),
  deleteByIdBoard: ctrlWrapper(deleteByIdBoard),
  createNewTask: ctrlWrapper(createNewTask),
  updateTaskInBoard: ctrlWrapper(updateTaskInBoard),
  deleteTaskFromBoard: ctrlWrapper(deleteTaskFromBoard),
};

/* 
Коли дата приходить в форматі YYYY-MM-DD 
потрібно робити наступне:

const {date} = req.body;
const formatDate = ;
*/
