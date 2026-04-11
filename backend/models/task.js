const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const taskSchema = new mongoose.Schema(
  {
    taskTitle: {
      type: String,
      required: [true, "Issue name is required."],
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    type: {
      type: String,
      required: true,
      enum: ["Bug", "Feature", "Improvement"],
    },
    projectKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["To Do", "In Progress", "In Review", "Done"],
      default: "To Do",
    },
    comment: [commentSchema],
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
