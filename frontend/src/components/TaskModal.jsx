import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import UserAvatar from "./UserAvatar";

const defaultForm = {
  title: "",
  description: "",
  assignee: "",
  type: "Feature",
  status: "To Do",
  priority: "None",
};

export default function TaskModal({
  open,
  setOpen,

  selectedTask,

  tasks,
  setTasks,

  projectId,
}) {
  const [form, setForm] =
    React.useState(defaultForm);

  
  React.useEffect(() => {
    const taskData = selectedTask
    ? {
        title: selectedTask.title || "",

        description:
          selectedTask.description || "",

        type:
          selectedTask.type || "Feature",

        status:
          selectedTask.status || "To Do",

        priority:
          selectedTask.priority || "None",
      }
      : defaultForm;

      setForm(taskData);
    }, [selectedTask]);

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async () => {
    try {
      if (selectedTask) {
        const res = await fetch(
          `http://localhost:3000/api/tasks/${selectedTask._id}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(form),
          }
        );

        const updatedTask =
          await res.json();

        const updatedTasks = tasks.map((t) =>
          t._id === updatedTask._id
            ? updatedTask
            : t
        );

        setTasks(updatedTasks);
      }

      else {
        const res = await fetch(
          "http://localhost:3000/api/tasks",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              ...form,

              project: projectId,
            }),
          }
        );

        const newTask = await res.json();

        setTasks([newTask, ...tasks]);
      }

      setOpen(false);

      setForm(defaultForm);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `http://localhost:3000/api/tasks/${selectedTask._id}`,
        {
          method: "DELETE",
        }
      );

      const filteredTasks = tasks.filter(
        (t) => t._id !== selectedTask._id
      );

      setTasks(filteredTasks);

      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {selectedTask
          ? "Edit Task"
          : "Create Task"}

        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",

            right: 8,

            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography>Title</Typography>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          style={{
            width: "100%",
            marginBottom: "15px",
          }}
        />

        <Typography>Description</Typography>

        


        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          style={{
            width: "100%",
            height: "120px",
            marginBottom: "15px",
          }}
        />

        <Typography>Type</Typography>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="Feature">
            Feature
          </option>

          <option value="Bug">Bug</option>

          <option value="Improvement">
            Improvement
          </option>
        </select>

        <Typography>Status</Typography>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="To Do">
            To Do
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="In Review">
            In Review
          </option>

          <option value="Done">
            Done
          </option>
        </select>

        <Typography>Priority</Typography>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="None">
            None
          </option>

          <option value="Low">Low</option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>

          <option value="Urgent">
            Urgent
          </option>
        </select>
      </DialogContent>

      <DialogActions>
        {/* DELETE BUTTON */}
        {selectedTask && (
          <Button
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}

        <Button
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {selectedTask
            ? "Save Changes"
            : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}