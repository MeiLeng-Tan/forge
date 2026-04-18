const Project = require("../models/project");

const requireRole = (...allowedRoles) => async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.userId;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const isAdmin = project.projectLead.toString() === userId;
    const isMember = project.members.some((m) => m.toString() === userId);

    const userRole = isAdmin ? "admin" : isMember ? "member" : null;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: insufficient role." });
    }

    req.projectRole = userRole;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = requireRole;
