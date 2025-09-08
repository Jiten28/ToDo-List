import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";
import PriorityBadge from "./PriorityBadge";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center gap-3 bg-blue-100 rounded-lg p-3 my-2">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0"
        aria-pressed={task.isComplete}
        aria-label={task.isComplete ? "Mark as incomplete" : "Mark as complete"}
      >
        <img src={task.isComplete ? tick : not_tick} alt="" className="w-7" />
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`ml-1 font-medium break-words ${
            task.isComplete ? "line-through decoration-slate-500" : ""
          }`}
        >
          {task.text}
        </p>
        <div className="mt-1 ml-1 flex items-center gap-2 text-xs text-slate-600">
          <PriorityBadge level={task.priority} />
          <time dateTime={task.createdAt}>
            {new Date(task.createdAt).toLocaleString()}
          </time>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="p-2 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
        aria-label="Delete task"
        title="Delete"
      >
        <img src={delete_icon} alt="" className="w-4" />
      </button>
    </div>
  );
}
