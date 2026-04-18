const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  editProject,
  deleteProject,
} = require("../controllers/projectsController");

router.get("/", getProjects);
router.post("/new", createProject);
router.get("/:projectId", getProjectById);
router.patch("/:projectId/edit", editProject);
router.delete("/:projectId", deleteProject);

module.exports = router;
