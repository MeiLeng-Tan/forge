const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, "Project name is required."],
      unique: true,
    },
    projectKey: {
      type: String,
      required: true,
      unique: [true, "Project key must be unique."],
      uppercase: true
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["Owner", "Admin", "Member"],
          default: "Member",
        },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["Proposed", "In Progress", "On Hold", "Completed"],
      default: "Proposed",
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
