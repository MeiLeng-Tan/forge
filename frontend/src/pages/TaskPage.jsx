import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/TaskModal";

export default function TaskPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] =
    useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/tasks/${projectId}`
    )
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(console.error);
  }, [projectId]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      `http://localhost:3000/api/projects/${projectId}/members`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, [projectId]);


  const handleCreateTask = () => {
    setSelectedTask(null);

    setOpen(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);

    setOpen(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",

          justifyContent: "space-between",

          marginBottom: "20px",
        }}
      >
        <h2>Project Kanban Board</h2>

        <button onClick={handleCreateTask}>
          + Create Task
        </button>
      </div>

      <KanbanBoard
        tasks={tasks}
        setTasks={setTasks}
        onTaskClick={handleTaskClick}
      />

      <TaskModal
        open={open}
        setOpen={setOpen}
        selectedTask={selectedTask}
        tasks={tasks}
        setTasks={setTasks}
        members={members}
        projectId={projectId}
      />
    </div>
  );
}