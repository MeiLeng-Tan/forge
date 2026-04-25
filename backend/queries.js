//Run to create dummy data in MongoDB

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const User = require("./models/user");
const Project = require("./models/project");
const Task = require("./models/task");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
  await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};

connect();

const runQueries = async () => {
  //Clear Database
  await User.deleteMany({});
  await Project.deleteMany({});
  await Task.deleteMany({});

  //Create User
  const roles = ["user", "admin"];
  const hashedPassword = await bcrypt.hash("password123", 12);
  const users = await User.insertMany(
    Array.from({ length: 10 }).map(() => ({
      username: faker.internet.username(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: faker.helpers.arrayElement(roles),
    })),
  );
  //Create Projects
  const projectStatus = ["To Do", "In Progress", "In Review", "Completed"];
  const projects = await Project.insertMany(
    Array.from({ length: 6 }).map(() => {
      // 1. Pick a lead first
      const lead = faker.helpers.arrayElement(users);

      // 2. Filter out the lead from the pool of potential members
      const potentialMembers = users.filter((user) => user._id !== lead._id);

      return {
        projectTitle: faker.company.catchPhrase(),
        projectKey: faker.string.alpha(4).toUpperCase(), // Added .toUpperCase() for standard key formatting
        description: faker.lorem.sentence(),
        projectLead: lead._id,
        // 3. Pick members only from the filtered list
        members: faker.helpers
          .arrayElements(potentialMembers, { min: 1, max: 5 })
          .map((user) => user._id),
        targetDate: faker.date.future(),
        status: faker.helpers.arrayElement(projectStatus),
      };
    }),
  );
  //Create Tasks
  const tasks = [];

  for (const project of projects) {
    const potentialAssignees = [project.projectLead, ...project.members];

    const taskCount = faker.number.int({ min: 2, max: 5 });

    for (let i = 0; i < taskCount; i++) {
      tasks.push({
        title: faker.hacker.ingverb() + " " + faker.hacker.noun(),
        description: faker.lorem.paragraph(),
        type: faker.helpers.arrayElement(["Bug", "Feature", "Improvement"]),
        project: project._id,
        assignee: faker.helpers.arrayElement(potentialAssignees),
        createdBy: faker.helpers.arrayElement(potentialAssignees),
        status: faker.helpers.arrayElement([
          "To Do",
          "In Progress",
          "In Review",
          "Done",
        ]),
        priority: faker.helpers.arrayElement([
          "None",
          "Low",
          "Medium",
          "High",
          "Urgent",
        ]),
        dueDate: faker.date.between({
          from: new Date(),
          to: project.targetDate,
        }),
      });
    }
  }

  await Task.insertMany(tasks);
};
