import React from "react";
import PriorityBadge from "./PriorityBadge";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-start justify-between my-3 gap-3 bg-blue-100 rounded-lg p-3 shadow">
      <div className="flex-1">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onToggle(task.id)}
        >
          <input type="checkbox" checked={task.isComplete} readOnly className="w-5 h-5" />
          <p
            className={`ml-2 font-medium ${
              task.isComplete ? "line-through decoration-slate-600" : ""
            }`}
          >
            {task.text}
          </p>
          <PriorityBadge level={task.priority} />
        </div>

        {/* Meta info */}
        <div className="ml-7 mt-1 text-xs text-slate-700 space-y-1">
          <p>📅 Created at: {new Date(task.createdAt).toLocaleString()}</p>
          <p>
            ⏳ Deadline:{" "}
            {task.deadline
              ? new Date(task.deadline).toLocaleDateString()
              : "Not applicable"}
          </p>
          <p>📂 Category: {task.category}</p>
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-600 hover:text-red-800 font-bold px-2"
      >
        ✖
      </button>
    </div>
  );
}
