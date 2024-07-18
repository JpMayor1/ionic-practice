import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todoController";

const todoRouter = express.Router();

todoRouter.get("/", getAllTodos);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
