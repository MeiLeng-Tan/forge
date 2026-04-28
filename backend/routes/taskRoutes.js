const express = require("express");
const router = express.Router();

const {
    createTask,
    getTasksByProject,
    deleteTask,
    updateTask,
} = require("../controllers/issueController");

router.post("/tasks", createTask);

router.get("/tasks/:projectId", getTasksByProject);

router.delete("/tasks/:id", deleteTask);

router.patch("/:id", updateTask);

module.exports = router ;