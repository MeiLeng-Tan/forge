import {
  DndContext,
  closestCorners,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

const columns = ["Todo", "In Progress", "In Review", "Done"];

export default function KanbanBoard({ tasks, setTasks }) {
  const [grouped, setGrouped] = useState ({});

  useEffect(()=>{
    const map = {};

    columns.forEach((col) => {
      map[col]=tasks.filter((t)=>t.status === col);
    });

    setGrouped(map);
  }, [tasks]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = task.find((t) => t._id === taskId);

    if (!task || task.status === newStatus) return;

    const updatedTasks = tasks.map((t) => 
      t._id === taskId ? {...t, status: newStatus} : t);

    setTasks (updatedTasks);

    try{
      await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })
    } catch (err) {
      console.error("Update failed", err)
    }
  };


  return (
     <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        {columns.map((col) => (
          <div key={col} style={{ width: "250px" }}>
            <h3>{col}</h3>

            <SortableContext
              items={grouped[col]?.map((t) => t._id) || []}
              strategy={verticalListSortingStrategy}
            >
              <div
                id={col} 
                style={{
                  minHeight: "300px",
                  background: "#f4f5f7",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                {grouped[col]?.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
}