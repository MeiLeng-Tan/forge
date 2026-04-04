const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const User = require("./models/user");
const Project = require("./models/project");
const Issue = require("./models/issue");

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
      username: "user A",
      password: "pwd",
      email: "userA@email.com",
      role: "Project Manager",
    },
    {
      username: "user B",
      password: "pwd",
      email: "userB@email.com",
      role: "Project Manager",
    },
    {
      username: "user C",
      password: "pwd",
      email: "userC@email.com",
      role: "Software Engineer",
    },
    {
      username: "user D",
      password: "pwd",
      email: "userD@email.com",
      role: "Software Engineer",
    },
    {
      username: "user E",
      password: "pwd",
      email: "userE@email.com",
      role: "Software Engineer",
    },
  ];
  await User.deleteMany({});
  const user = await User.create(userData);
};

const createProject = async () => {
  const projectData = [
    {
      projectName: "GA Project 1",
      projectKey: "GA-proj-1",
      description: "Browser based games",
      owner: await User.findById("69d10bb566fd167f45da5069"), //replace the user Id
      member: [await User.findById("69d10bb566fd167f45da506c")], //replace the user Id
      status: "Completed",
    },
    {
      projectName: "GA Project 3",
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
  const project = Project.create(projectData);
};

const showAllProjects = async () => {
  const projects = await Project.find({}).populate("owner member");
  console.log("All projects", projects);
};

const createIssue = async () => {
  const issueData = [
    {
      issueName: "React Frontend",
      priority: "Medium",
      type: "Feature",
      project: await Project.findById("69d10f4a8b78e225d890eed0"),
      assignee: await User.findById("69d10bb566fd167f45da506d"),
      createdBy: await User.findById("69d10bb566fd167f45da506a"),
      status: "Proposed",
      comment: "Wireframe completed",
    },
    {
      issueName: "Backend",
      priority: "Medium",
      type: "Feature",
      project: await Project.findById("69d10f4a8b78e225d890eed0"),
      assignee: await User.findById("69d10bb566fd167f45da506b"),
      createdBy: await User.findById("69d10bb566fd167f45da506a"),
      status: "Proposed",
      comment: "Setting up MongoDB",
    },
    {
      issueName: "javascript",
      priority: "Medium",
      type: "Bug",
      project: await Project.findById("69d10bb566fd167f45da5069"),
      assignee: await User.findById("69d10bb566fd167f45da506c"),
      createdBy: await User.findById("69d10bb566fd167f45da506a"),
      status: "Proposed",
      comment: "Fixed bugs",
    },
  ];
  Issue.deleteMany({});
  const issue = Issue.create(issueData);
};

const showAllIssues = async () => {
  const issues = await Issue.find({}).populate("project assignee createdBy");
  console.log("All issues", issues);
};

const runQueries = async () => {
  console.log("Queries running.");
  //await createUser();
  //await createProject();
  // await showAllProjects();
  // await createIssue();
  // await showAllIssues();
};
