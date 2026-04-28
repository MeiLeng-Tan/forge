//from mateiral UI 
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CreateTaskDialog ({ projectId, onTaskCreated }) {
  const [open, setOpen] = React.useState(false);
  
  const [form,setForm] = React.useState({
    title: "",
    description: "",
    // asignee:"",
    type:"Feature",
    status:"Todo",
    priority:"None"
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch ("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        ...form,
        project: projectId,
        createdBy: "69d9aebcf689d13dd0d4882a"
        })
      });

      const data = await res.json();
      console.log("Created:", data)

      setOpen(false);

      onTaskCreated && onTaskCreated();

    } catch (err) {
      console.error(err);
    }
  }

return (
    <React.Fragment>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Add Task
      </Button>

      <BootstrapDialog
        onClose={() => setOpen(false)}
        open={open}
      >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Task
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
          <Typography>Title</Typography>
          <input name="title" value={form.title} onChange={handleChange} />

          <Typography>Description</Typography>
          <textarea name="description" value={form.description} onChange={handleChange} />

          <Typography>Type</Typography>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="Feature">Feature</option>
            <option value="Bug">Bug</option>
            <option value="Improvement">Improvement</option>
          </select>

          <Typography>Status</Typography>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Todo">Todo</option>
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
      </DialogActions>

      </BootstrapDialog>
    </React.Fragment>
  );
}