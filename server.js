const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Todo = require("./Models/todo.model");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// READ
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//CREATE
app.post("/todos", async (req, res) => {
  const { text, status } = req.body;

  if (!text || text.trim() === "") {
    res.status(400).json({
      message: "error text invalid",
    });
  }

  try {
    const todos = await Todo.create(req.body);
    res.status(201).json({ data: todos, message: "Task added successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Task failed" });
  }
});
//UPDATE
app.put("/todos/:id", async (req, res) => {
  try {
    const { text, status } = req.body;
    const { id } = req.params;
    const Updatedtask = await Todo.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true },
    );

    if (!Updatedtask) {
      res.status(404).json({
        message: "task not found",
      });
    }

    res.status(200).json(Updatedtask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//DELETE
app.delete('/todos/:id', async (req,res) => {
  try{
    const {id} = req.params;
    const deleteTask = await Todo.findByIdAndDelete(id)


    if (!deleteTask) {
      return res.status(404).json({
        message : "Task not found"
      });

    }
    res.status(200).json(deleteTask);

  }
  catch(error){
    res.status(500).json({
      message : error.message
    })
  }
})

// CONNECT TO DATABASE
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database Connected");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error.message);
  });

module.exports = app;
