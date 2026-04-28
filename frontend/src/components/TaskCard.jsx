import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable ({
    id: task._id
  })
  
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    background: "white",
    padding: "10px",
    borderRadius: "6px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "10px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <small>Priority: {task.priority}</small>
    </div>
  );
}