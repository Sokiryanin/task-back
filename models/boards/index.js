import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
/* */

/* отримаємо абсолютний шлях до boards.json */
const boardsPath = path.resolve("models", "boards", "boards.json");

/* Функція що перезаписує JSON */
const updateBoards = (boards) =>
  fs.writeFile(boardsPath, JSON.stringify(boards, null, 2));

/* Boards functions */
const getAllBoards = async () => {
  /* считываем все доски, 
  указываем абсолютный адрес файла при помощи path
  */
  const result = await fs.readFile(boardsPath, "utf-8");
  /* перетворюємо на обʼєкт */
  return JSON.parse(result);
};

const getBoardById = async (id) => {
  const boards = await getAllBoards();
  const result = boards.find((item) => item.id === id);

  /* если в базе данных нет елемента с указаным id то она в
  возвращает null
  */
  return result || null;
};

const addBoard = async ({ title, tasks }) => {
  const boards = await getAllBoards();
  const newBoard = {
    id: nanoid(),
    title,
    tasks,
  };

  boards.push(newBoard);
  /* что бы после записи новой доски оставались пробелы,
 то вторым аргументом передается null а третьим 
 аргументом передается 2
 */
  await updateBoards(boards);
  return newBoard;
};

const deleteBoardById = async (id) => {
  const boards = await getAllBoards();

  const index = boards.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  /* splice повертає видалений обʼєкт */
  const [result] = boards.splice(index, 1);
  await updateBoards(boards);
  return result;
};

const updateBoardById = async (id, data) => {
  const boards = await getAllBoards();
  const index = boards.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }
  boards[index] = { id, ...data };
  await updateBoards(boards);
  return boards[index];
};

/* Tasks functions */

const addTaskToBoard = async ({
  boardId,
  taskTitle,
  description,
  deadline,
  priority,
}) => {
  const boards = await getAllBoards();
  const newTask = {
    boardId,
    taskId: nanoid(),
    taskTitle,
    description,
    deadline,
    priority,
  };

  const index = boards.findIndex((board) => board.id === boardId);

  if (index === -1) {
    return null; // Если доска с указанным id не найдена
  }

  boards[index].tasks.push(newTask);
  await updateBoards(boards);
  return boards[index];
};

const deleteTaskFromBoard = async ({ boardId, taskId }) => {
  const boards = await getAllBoards();

  const index = boards.findIndex((board) => board.id === boardId);

  if (index === -1) {
    return null; // Если доска с указанным id не найдена
  }

  const taskIndex = boards[index].tasks.findIndex(
    (task) => task.taskId === taskId
  );

  if (taskIndex === -1) {
    return null; // Если задача с указанным taskId не найдена в доске
  }

  const deletedTask = boards[index].tasks.splice(taskIndex, 1)[0]; // Удаление задачи из массива задач
  await updateBoards(boards);
  return deletedTask;
};

const updateTaskInBoard = async (boardId, taskId, newData) => {
  const boards = await getAllBoards();
  const boardIndex = boards.findIndex((board) => board.id === boardId);

  if (boardIndex === -1) {
    return null; // Если доска с указанным id не найдена
  }

  const taskIndex = boards[boardIndex].tasks.findIndex(
    (task) => task.taskId === taskId
  );

  if (taskIndex === -1) {
    return null; // Если задача с указанным taskId не найдена в доске
  }

  /* При обновлении любого аргумента в задаче, 
  перезапишется только измененный аргумент */

  boards[boardIndex].tasks[taskIndex] = {
    ...boards[boardIndex].tasks[taskIndex],
    ...newData,
  };
  await updateBoards(boards);
  return boards[boardIndex];
};

export default {
  getAllBoards,
  getBoardById,
  addBoard,
  deleteBoardById,
  updateBoardById,
  addTaskToBoard,
  deleteTaskFromBoard,
  updateTaskInBoard,
};
