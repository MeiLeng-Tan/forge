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
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as workspaceService from "../services/projectSpaceService";
import { useNavigate } from "react-router";
import UserAvatar from "./UserAvatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useAuth } from "../context/AuthContext";
import CreateProjectForm from "./CreateProjectForm";
import ProjectDetailsCard from "./ProjectDetailsCard";

const ProjectSpace = () => {
  const { user } = useAuth();
  // const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [openProjectCard, setOpenProjectCard] = useState(false);

  const fetchWorkspace = async () => {
    try {
      const workspaceData = await workspaceService.getProjects(user);
      const projectsData = workspaceData.data.projects || [];
      const projectsDataWithProgress = await Promise.all(
        projectsData.map(async (proj) => {
          try {
            const progressData = await workspaceService.getProjectProgress(
              proj._id,
            );
            return {
              ...proj,
              progress: progressData.data,
            };
          } catch (err) {
            console.error(
              `Failed to fetch progress for ${proj.projectKey}`,
              err,
            );
            return { ...proj, progress: { completed: 0, total: 0 } };
          }
        }),
      );
      setProjects(projectsDataWithProgress);
    } catch (err) {
      console.error("Failed to fetch workspace:", err);
    }
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
              onClick={() => {
                setSelectedProject(index);
                setSelectedProjectId(project._id);
                setOpenProjectCard(true);
              }}
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
                <Stack>
                  <Typography variant="h9">{project.projectTitle}</Typography>
                  <Typography variant="h9">{project.projectKey}</Typography>
                  <Typography variant="h9">
                    {project.progress.completed} / {project.progress.total}{" "}
                    tasks completed
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {project.description}
                  </Typography>
                </Stack>

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
        <Dialog
          open={openProjectCard}
          onClose={() => setOpenProjectCard(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>
            <ProjectDetailsCard
              projectId={selectedProjectId}
              onClose={() => {
                setOpenProjectCard(false);
                fetchWorkspace();
              }}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default ProjectSpace;
