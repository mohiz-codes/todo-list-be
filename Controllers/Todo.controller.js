const Todo = require("../Models/Todo.model");

// READ
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE
const createTodo = async (req, res) => {
  const { text, status } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({
      message: "error text invalid",
    });
  }

  try {
    const todos = await Todo.create(req.body);

    res.status(201).json({
      data: todos,
      message: "Task added successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Task failed",
    });
  }
};

// UPDATE
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Todo.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "task not found",
      });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTask = await Todo.findByIdAndDelete(id);

    if (!deleteTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(deleteTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};