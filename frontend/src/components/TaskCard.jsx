import { useDraggable } from "@dnd-kit/core";

import UserAvatar from "./UserAvatar";

export default function TaskCard({
  task,
  onClick,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,

    background: "white",

    padding: "15px",

    borderRadius: "10px",

    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",

    marginBottom: "12px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        {...listeners}
        {...attributes}
        style={{
          cursor: "grab",

          marginBottom: "10px",

          fontSize: "14px",

          color: "gray",
        }}
      >
        ☰ Drag
      </div>



      <div onClick={() => onClick(task)}>
        <div
          style={{
            display: "flex",

            justifyContent: "space-between",

            alignItems: "center",
          }}
        >
          <strong>{task.title}</strong>

          {task.assignee && (
            <UserAvatar
              name={task.assignee.username}
            />
          )}
        </div>

        <div
          style={{
            display: "flex",

            gap: "10px",

            marginTop: "12px",

            fontSize: "12px",
          }}
        >
          <span>{task.type}</span>

          <span>{task.priority}</span>
        </div>
      </div>
    </div>
  );
}