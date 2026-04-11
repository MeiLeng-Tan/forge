// const User = require("../models/user");
// const Project = require("../models/project");
// const express = require("express");
// const router = express.Router();

// const createProject = async (req, res) => {
//   const { projectName, projectKey, description, owner, members, status } =
//     req.body;
//   const projOwner = await User.findById(owner);
//   const projMembers = await User.findById(members);

//   const project = await Project.create({
//     projectName,
//     projectKey,
//     description,
//     projOwner,
//     projMembers,
//     status,
//   });
//   res.status(201).json({ project });
// };

// router.post("/new", createProject);

// module.exports = router;
