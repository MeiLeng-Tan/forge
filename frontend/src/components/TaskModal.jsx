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
  assignees: [],
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

  members,

  projectId,
}) {
  const [form, setForm] = React.useState(defaultForm);

  React.useEffect(() => {
    if (selectedTask) {
      setForm({
        title: selectedTask.title || "",

        description: selectedTask.description || "",

        assignees: selectedTask.assignees?.map((u) => u._id) || [],

        type: selectedTask.type || "Feature",

        status: selectedTask.status || "To Do",

        priority: selectedTask.priority || "None",
      });
    } else {
      setForm(defaultForm);
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleAddAssignee = (userId) => {
    if (form.assignees.includes(userId)) return;

    setForm({
      ...form,

      assignees: [...form.assignees, userId],
    });
  };

  const handleRemoveAssignee = (userId) => {
    setForm({
      ...form,

      assignees: form.assignees.filter((id) => id !== userId),
    });
  };

  const handleSubmit = async () => {
    try {
      if (selectedTask) {
        const res = await fetch(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/tasks/${selectedTask._id}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(form),
          },
        );

        const updatedTask = await res.json();

        const updatedTasks = tasks.map((t) =>
          t._id === updatedTask._id ? updatedTask : t,
        );

        setTasks(updatedTasks);
      } else {
        const res = await fetch(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/tasks`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              ...form,

              project: projectId,
            }),
          },
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
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/tasks/${selectedTask._id}`,
        {
          method: "DELETE",
        },
      );

      setTasks(tasks.filter((t) => t._id !== selectedTask._id));

      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>
        {selectedTask ? "Edit Task" : "Create Task"}

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

        <Typography>Assigned Users</Typography>

        <div
          style={{
            display: "flex",

            gap: "10px",

            flexWrap: "wrap",

            marginBottom: "15px",
          }}
        >
          {form.assignees.map((userId) => {
            const user = members.find((m) => m._id === userId);

            if (!user) return null;

            return (
              <div
                key={user._id}
                style={{
                  display: "flex",

                  alignItems: "center",

                  gap: "5px",

                  background: "#eee",

                  padding: "5px 10px",

                  borderRadius: "20px",
                }}
              >
                <UserAvatar name={user.username} />

                <span>{user.username}</span>

                <button onClick={() => handleRemoveAssignee(user._id)}>
                  x
                </button>
              </div>
            );
          })}
        </div>

        {/* ADD ASSIGNEE */}
        <Typography>Add Assignee</Typography>

        <select onChange={(e) => handleAddAssignee(e.target.value)}>
          <option>Select User</option>

          {members.map((member) => (
            <option key={member._id} value={member._id}>
              {member.username}
            </option>
          ))}
        </select>

        <Typography>Type</Typography>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="Feature">Feature</option>

          <option value="Bug">Bug</option>

          <option value="Improvement">Improvement</option>
        </select>

        <Typography>Status</Typography>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="To Do">To Do</option>

          <option value="In Progress">In Progress</option>

          <option value="In Review">In Review</option>

          <option value="Done">Done</option>
        </select>

        <Typography>Priority</Typography>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="None">None</option>

          <option value="Low">Low</option>

          <option value="Medium">Medium</option>

          <option value="High">High</option>

          <option value="Urgent">Urgent</option>
        </select>
      </DialogContent>

      <DialogActions>
        {selectedTask && (
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        )}

        <Button onClick={() => setOpen(false)}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          {selectedTask ? "Save Changes" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
