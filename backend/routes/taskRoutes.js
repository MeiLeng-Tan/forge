const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {
    createTask,
    getTasksByProject,
    deleteTask,
    updateTask,
} = require("../controllers/issueController");

router.post("/tasks", verifyToken, createTask);

router.get("/tasks/:projectId", verifyToken, getTasksByProject);

router.delete("/tasks/:id", verifyToken, deleteTask);

router.patch("/tasks/:id", verifyToken, updateTask);

module.exports = router ;