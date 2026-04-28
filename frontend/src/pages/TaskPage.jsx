import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import KanbanBoard from "../components/KanbanBoard";
import CreateTaskDialog from "../components/TaskModal";

export default function TaskPage () {
    const { projectId } = useParams ();
    const [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/tasks/${projectId}`)
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch(console.error);
    },[projectId])


    return (
        <div style={{ padding: "20px "}}>
            <h2>This is your Kanban board</h2>
            <CreateTaskDialog />
            <KanbanBoard tasks={tasks} setTasks={setTasks}/>
        </div>
    );
};
