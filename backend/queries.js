import { useFormState } from "react-dom";

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const User = require("./models/user");
const Project = require("./models/project");
const Task = require("./models/task");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
  await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};

connect();

/*----- Query Functions -----*/
const createUser = async () => {
  const userData = [
    {
      username: "simon",
      password: "pwd",
      email: "simon@email.com",
      firstName: "Simon",
      lastName: "Lau",
      role: "Project Manager",
    },
    {
      username: "mervyn",
      password: "pwd",
      email: "mervyn@email.com",
      firstName: "Mervyn",
      lastName: "Chua",
      role: "Software Engineer",
    },
    {
      username: "zoe",
      password: "pwd",
      email: "zoe@email.com",
      firstName: "Zoe",
      lastName: "Tan",
      role: "Software Engineer",
    },
    {
      username: "meileng",
      password: "pwd",
      email: "meileng@email.com",
      firstName: "MeiLeng",
      lastName: "Tan",
      role: "Software Engineer",
    },
  ];
  await User.deleteMany({});
  const user = await User.create(userData);
  return user;
};

const createProject = async (users) => {
  const projectData = [
    {
      projectTitle: "GA Project 1",
      projectKey: "GA-proj-1",
      description: "Browser based games",
      owner: await User.findById("69d10bb566fd167f45da5069"), //replace the user Id
      member: [await User.findById("69d10bb566fd167f45da506c")], //replace the user Id
      status: "Completed",
      progress: "100",
    },
    {
      projectTitle: "GA Project 3",
      projectKey: "GA-proj-3",
      description: "MERN stack project",
      owner: await User.findById("69d10bb566fd167f45da506a"), //replace the user Id
      member: [
        await User.findById("69d10bb566fd167f45da506d"),
        await User.findById("69d10bb566fd167f45da506b"),
      ], //replace the user Id
      status: "Proposed",
    },
  ];

  await Project.deleteMany({});
  const project = await Project.create(projectData);
};

const showAllProjects = async () => {
  const projects = await Project.find({}).populate("projectLead members");
  console.log("All projects", projects);
};

const createTask = async () => {
  const taskData = [
    {
      taskTitle: "React Frontend",
      priority: "Medium",
      type: "Feature",
      projectKey: await Project.findById("69d9c335393265f6f8fa4368"),
      assignee: await User.findById("69d9b6374cf0f65a0c2f7732"),
      createdBy: await User.findById("69d9b6374cf0f65a0c2f7731"),
      dueDate: "2026/4/15",
      status: "To Do",
      comment: {
        text: "Wireframe completed",
        author: await User.findById("69d9b6374cf0f65a0c2f7732"),
      },
    },
    {
      taskTitle: "Backend",
      priority: "Medium",
      type: "Feature",
      projectKey: await Project.findById("69d9c335393265f6f8fa4368"),
      assignee: await User.findById("69d9b6374cf0f65a0c2f7734"),
      createdBy: await User.findById("69d9b6374cf0f65a0c2f7733"),
      dueDate: "2026/4/15",
      status: "In Progress",
      comment: {
        text: "Setting up MongoDB",
        author: await User.findById("69d9b6374cf0f65a0c2f7734"),
      },
    },
    {
      taskTitle: "JS",
      priority: "Medium",
      type: "Bug",
      projectKey: await Project.findById("69d9c335393265f6f8fa4367"),
      assignee: await User.findById("69d9b6374cf0f65a0c2f7734"),
      createdBy: await User.findById("69d9b6374cf0f65a0c2f7734"),
      dueDate: "2026/4/01",
      status: "Done",
      comment: {
        text: "Fixed bugs",
        author: await User.findById("69d9b6374cf0f65a0c2f7734"),
      },
    },
  ];
  Issue.deleteMany({});
  const issue = Issue.create(issueData);
};

const showAllTasks = async () => {
  const tasks = await Task.find({}).populate("projectKey assignee createdBy");
  console.log("All tasks", tasks);
};

const runQueries = async () => {
  console.log("Queries running.");
  //await createUser();
  //await createProject();
  // await showAllProjects();
  // await createIssue();
  // await showAllIssues();
};
