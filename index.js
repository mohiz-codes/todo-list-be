const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors")
const todoRoutes = require("./Routes/todo.routes");
const authRoutes = require("./Routes/Auth.routes");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(todoRoutes);
app.use(authRoutes);

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