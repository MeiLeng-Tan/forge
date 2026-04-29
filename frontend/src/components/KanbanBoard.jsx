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

const columns = [
  "To Do",
  "In Progress",
  "In Review",
  "Done",
];

export default function KanbanBoard({
  tasks,
  setTasks,
  onTaskClick,
}) {
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    const map = {};

    columns.forEach((col) => {
      map[col] = tasks.filter(
        (t) => t.status === col
      );
    });

    setGrouped(map);
  }, [tasks]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;

    const newStatus = over.id;

    const task = tasks.find(
      (t) => t._id === taskId
    );

    if (!task) return;

    const updatedTasks = tasks.map((t) =>
      t._id === taskId
        ? { ...t, status: newStatus }
        : t
    );

    setTasks(updatedTasks);

    try {
      await fetch(
        `http://localhost:3000/api/tasks/${taskId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: "flex",

          gap: "20px",
        }}
      >
        {columns.map((col) => (
          <div
            key={col}
            id={col}
            style={{
              width: "300px",

              background: "#f4f5f7",

              padding: "15px",

              borderRadius: "10px",

              minHeight: "500px",
            }}
          >
            <h3>{col}</h3>

            <SortableContext
              items={
                grouped[col]?.map((t) => t._id) ||
                []
              }
              strategy={
                verticalListSortingStrategy
              }
            >
              {grouped[col]?.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onClick={onTaskClick}
                />
              ))}
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
}