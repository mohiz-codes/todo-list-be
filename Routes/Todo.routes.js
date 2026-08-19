const express = require("express");

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../Controllers/todo.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/todos", authMiddleware, getTodos);
router.post("/todos", authMiddleware, createTodo);
router.put("/todos/:id", authMiddleware, updateTodo);
router.delete("/todos/:id", authMiddleware, deleteTodo);

module.exports = router;