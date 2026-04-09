const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    issueName: {
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
    status: {
      type: String,
      required: true,
      enum: ["Backlog", "Todo", "In Progress", "In Review", "Done"],
      default: "Backlog"
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
