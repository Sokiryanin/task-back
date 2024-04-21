import express from "express";
import logger from "morgan";
import cors from "cors";

import boardsRouter from "./routes/api/boards-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/boards", boardsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

// мідлвар обробки помилки сервера
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;

/* ====================================================================== */
// import * as boardService from "./boards/index.js";

// const invokeAction = async ({
//   action,
//   id,
//   title,
//   tasks,
//   boardId,
//   taskId,
//   taskTitle,
//   description,
//   deadline,
//   priority,
// }) => {
//   switch (action) {
//     case "list":
//       const allBoards = await boardService.getAllBoards();
//       return console.log(allBoards);
//     //   return console.log(JSON.stringify(allBoards, null, 2));

//     case "getById":
//       const oneBoard = await boardService.getBoardById(id);
//       return console.log(oneBoard);

//     case "add":
//       const newBoard = await boardService.addBoard({ title, tasks });
//       return console.log(newBoard);

//     case "updateById":
//       const updateBoard = await boardService.updateBoardById(id, {
//         title,
//         tasks,
//       });

//     case "deleteBoard":
//       const deletedBoard = await boardService.deleteBoardById(id);
//       return console.log(deletedBoard);

//     case "addTask":
//       const newTask = await boardService.addTaskToBoard({
//         boardId,
//         taskId,
//         taskTitle,
//         description,
//         deadline,
//         priority,
//       });
//       return console.log(newTask);

//     case "deleteTask":
//       const deletedTask = await boardService.deleteTaskFromBoard({
//         boardId,
//         taskId,
//       });
//       return console.log(deletedTask);

//     case "updateTask":
//       const updatedTask = await boardService.updateTaskInBoard(
//         boardId,
//         taskId,
//         {
//           taskTitle,
//           description,
//           deadline,
//           priority,
//         }
//       );

//       return console.log(updatedTask);

//     default:
//       console.log("Unknow action");
//   }
// };

/* виклик функції для перевірки кейсів */

// invokeAction({
//   action: "deleteTask",
//   boardId: "2",
//   taskId: "VitHaSoWaPmU3KPrwjWWA",
// });

// invokeAction({ action: "list" });
// invokeAction({ action: "getById", id: "1" });

// invokeAction({ action: "add", title: "In progress", tasks: [] });

// invokeAction({
//   action: "updateById",
//   id: "uBFTnzE2BMbs3XXOAf59B",
//   title: "Finish",
//   tasks: [],
// });

// invokeAction({
//   action: "deleteBoard",
//   id: "CUwJH1jeklmO7_WV0gAyw",
// });

// invokeAction({
//   action: "addTask",
//   boardId: "HHlzL9_lQjpsXsaEQeY49",
//   taskTitle: "NEW new task",
//   description: "Make do it",
//   deadline: "2024-04-17",
//   priority: "High",
// });

// invokeAction({
//   action: "deleteTask",
//   boardId: "HHlzL9_lQjpsXsaEQeY49",
//   taskId: "G3W4nZvQLKnXE0mzbET-I",
// });

// invokeAction({
//     action: "updateTask",
//     boardId: "CUwJH1jeklmO7_WV0gAyw",
//     taskId: "f_dfIKrBN_n79EzGL9a8W",
//     taskTitle: "Sport task", // Сохраняем существующее значение taskTitle
//     description: "Nike do it!",
//     deadline: "2024-04-19", // Сохраняем существующее значение deadline
//     priority: "High",
//   });
