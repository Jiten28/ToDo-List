import React from "react";

const colors = {
  Work: "bg-purple-100 text-purple-800",
  Personal: "bg-blue-100 text-blue-800",
  Study: "bg-green-100 text-green-800",
  General: "bg-gray-100 text-gray-800",
};

export default function CategoryBadge({ category = "General" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${colors[category] || colors.General}`}
    >
      {category}
    </span>
  );
}
