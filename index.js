const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors")


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const todoRoutes = require("./Routes/todo.routes");

app.use(todoRoutes);

// CONNECT TO DATABASE
mongoose.connect(process.env.MONGODB_URI)
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