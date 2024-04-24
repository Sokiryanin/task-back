import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import boardsRouter from "./routes/api/boards-router.js";

dotenv.config();
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
