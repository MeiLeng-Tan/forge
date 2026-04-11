const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
{
    issueName: { 
      type: String,
      required: [true, "Task title is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    type: {
      type: String,
      required: true,
      enum: ["Bug", "Feature", "Improvement"],
    },
    status: {
      type: String,
      required: true,
      enum: ["To Do", "In Progress", "In Review", "Done"], // 统一你的前端需求
      default: "To Do",
    },
    priority: {
      type: String,
      required: true,
      enum: ["None", "Low", "Medium", "High", "Urgent"], // 增加了 None 和 Urgent
      default: "None",
    },
    dueDate: { 
      type: Date,
    },
    project: {
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
    comment: { 
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
