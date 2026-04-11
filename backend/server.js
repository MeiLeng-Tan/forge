const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth-routes");
const projectController = require("./controllers/projectsController");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.get("/test", (req, res) => {
  res.json({ message: "server is working" });
});

app.use("/auth", authRouter);
app.use("/proj", projectController);

app.listen(3000, () => {
  console.log("The express app is ready!");
});


//ZOE: router for task management 
const issueController = require ("./controllers/issueController");

app.post ("/api/tasks", issueController.createTask);
app.get("/api/tasks/:projectID", issueController.getTasksByProject);
app.delete("/api/tasks/:id", issueController.deleteTask)
