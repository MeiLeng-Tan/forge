const express = require("express");
// const router = express.Router();
const Project = require("../models/project");
const User = require("../models/user");

const createProject = async (req, res) => {
  const {
    projectTitle,
    projectKey,
    description,
    projectLead,
    members,
    targetDate,
    status,
  } = req.body;
  try {
    if (
      !projectTitle ||
      !projectKey ||
      !description ||
      !projectLead ||
      !targetDate ||
      !status
    ) {
      return res.status(400).json({ message: "Missing required project info" });
    }

    const project = await Project.create({
      projectTitle,
      projectKey,
      description,
      projectLead,
      members: members || [],
      targetDate,
      status,
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Project Title or Key already exists." });
    }
    res.status(500).json({ err });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({})
      .populate("projectLead", "firstName lastName")
      .populate("members", "firstName lastName");
    res.status(200).json({ projects });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const userId = req.user.userId;

    const projects = await Project.find({
      $or: [{ projectLead: userId }, { members: userId }],
    })
      .populate("projectLead", "firstName lastName")
      .populate("members", "firstName lastName");
    res.status(200).json({ projects });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId)
      .populate("projectLead", "username")
      .populate("members", "username");

    if (!project) {
      return res.st(404).json({ message: "Project not found." });
    }
    res.status(200).json({ project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//query fitler
const queryFilter = (queryParams) => {
  const { search } = queryParams;
  if (!search) return;

  return {
    $or: [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
    ],
  };
};

const queryProject = async (req, res) => {
  try {
    const query = queryFilter(req.query);
    const project = await Project.find({ projectLead: query })
      .populate("projectLead", "firstName lastName")
      .populate("members", "firstName lastName");
    res.status(200).json({ project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const queryUser = async (req, res) => {
  try {
    const query = queryFilter(req.query);
    const users = await User.find(query).limit(10);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const updates = req.body;
    const updatedProject = await Project.findByIdAndUpdate(projectId, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.json({ message: "Proejct updated.", project: updatedProject });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(200).send({ message: "Project deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProjectMembers = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.projectId
    )
      .populate("members", "username")
      .populate("projectLead", "username");

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found" });
    }

     const allMembers = [
      project.projectLead,
      ...project.members,
    ];

    const uniqueMembers = allMembers.filter(
      (member, index, self) =>
        index ===
        self.findIndex(
          (m) =>
            m._id.toString() ===
            member._id.toString()
        )
    );

    res.json(uniqueMembers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  editProject,
  deleteProject,
  queryProject,
  queryUser,
  getProjects,
  getProjectMembers,
};