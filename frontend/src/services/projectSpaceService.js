import api from "./api";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/projects`;

const getProjects = () => {
  return api.get("/projects");
};

// const getProjects = (username) => {
//   return api.get(`/projects?search${username}`);
// };

//Create new project
const createProject = (projectData) => {
  return api.post("/projects/new", projectData);
};

const queryUserByName = (username) => {
  return api.get(`/projects/query?search=${username}`);
};

export { getProjects, createProject, queryUserByName };
