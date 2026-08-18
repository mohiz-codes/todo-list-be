const express = require("express");

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../Controllers/todo.controller");

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

module.exports = router;