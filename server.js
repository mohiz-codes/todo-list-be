const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let todos = [];
//READ
app.get("/todos", (req, res) => {
  res.json(todos);
});
//CREATE
app.post("/todos", (req, res) => {
  let newTask = {
    id: Date.now(),
    text: req.body.text,
    status: req.body.status,
  };
  todos.push(newTask);
  console.log(todos);
  res.json(newTask); //result variable is waiting for some value which it will use to spread the task array this sends that in json format
});
//UPDATE
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = todos.find((todo) => todo.id === id);

  if (req.body.status !== undefined) {
    task.status = req.body.status;
  }

  if (req.body.text !== undefined) {
    task.text = req.body.text;
  }

  res.json(task);
});
//DELETE
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = todos.find((todo) => todo.id == id);
  todos = todos = todos.filter((todo) => todo.id !== id);
  res.json(todos);
  console.log(todos);
});

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

module.exports = app;