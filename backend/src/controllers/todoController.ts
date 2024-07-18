import { Request, Response } from "express";
import { Todo } from "../models/todoModel";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.create(req.body);
    res.json({ message: "Todo created", todo });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Todo updated", todo });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.log(error);
  }
};
