import { Schema, model } from "mongoose";

const boardSchema = new Schema({
  title: String,
  tasks: Array,
});

const Board = model("board", boardSchema);

export default Board;
