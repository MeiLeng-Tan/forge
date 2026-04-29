const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const requireRole = require("../middleware/requireRole");
const {
  createProject,
  getProjects,
  getProjectById,
  editProject,
  deleteProject,
  queryUser,
  queryProject,
  getUserProjects,
  getProjectProgress,
  getProjectMembers,
} = require("../controllers/projectsController");

router.get("/query", verifyToken, queryUser);
router.get("/", verifyToken, getProjects);
router.post("/new", verifyToken, createProject);
router.get("/:projectId", getProjectById);
router.patch("/:projectId/edit", editProject);
router.get("/:projectId/progress", getProjectProgress);
router.get("/:projectId/members",verifyToken,getProjectMembers);
router.get("/:projectId", verifyToken, getProjectById);

// router.patch(
//   "/:projectId/edit",
//   verifyToken,
//   requireRole("admin"),
//   editProject,
// );
// router.delete("/:projectId", verifyToken, requireRole("admin"), deleteProject);

module.exports = router;
