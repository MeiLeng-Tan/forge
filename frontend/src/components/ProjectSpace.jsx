import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as workspaceService from "../services/projectSpaceService";
import { useNavigate } from "react-router";
import UserAvatar from "./UserAvatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useAuth } from "../context/AuthContext";
import CreateProjectForm from "./CreateProjectForm";

const ProjectSpace = () => {
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openProjectForm, setOpenProjectForm] = useState(false);

  const fetchWorkspace = async () => {
    // const workspaceData = await workspaceService.getProjects();
    const workspaceData = await workspaceService.getProjects(user);
    console.log(workspaceData.data.projects);
    setProjects(workspaceData.data.projects || []);
  };

  useEffect(() => {
    fetchWorkspace();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
          gap: 2,
        }}
      >
        <Card>
          <CardActionArea
            sx={{ height: "100%", border: "1px dashed grey" }}
            onClick={() => setOpenProjectForm(true)}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" color="primary">
                + Create New Project
              </Typography>
            </CardContent>
          </CardActionArea>
          <Dialog
            open={openProjectForm}
            onClose={() => setOpenProjectForm(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogContent>
              <CreateProjectForm
                onClose={() => {
                  setOpenProjectForm(false);
                  fetchWorkspace();
                }}
              />
            </DialogContent>
          </Dialog>
        </Card>
        {projects?.map((project, index) => (
          <Card key={project._id}>
            <CardActionArea
              onClick={() => setSelectedProject(index)}
              data-active={selectedProject === index ? "" : undefined}
              sx={{
                height: "100%",
                "&[data-active]": {
                  backgroundColor: "action.selected",
                  "&:hover": { backgroundColor: "action.selectedHover" },
                },
              }}
            >
              <CardContent sx={{ height: "100%" }}>
                <Typography variant="h9" component="div">
                  {project.projectTitle} [{project.projectKey}]
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {project.description}
                </Typography>
                <AvatarGroup max={4} total={project.members.length + 1}>
                  <UserAvatar
                    name={`${project.projectLead.firstName} ${project.projectLead.lastName}`}
                  />
                  {project.members.map((member) => (
                    <UserAvatar
                      key={member._id}
                      name={`${member.firstName} ${member.lastName}`}
                    />
                  ))}
                </AvatarGroup>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default ProjectSpace;
