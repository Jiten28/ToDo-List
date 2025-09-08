import React from "react";

const styles = {
  low: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-600" },
  medium: { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-600" },
  high: { bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-600" },
  critical: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-600" },
};

export default function PriorityBadge({ level = "low" }) {
  const style = styles[level] || styles.low;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${style.bg} ${style.text}`}
    >
      <span className={`w-2 h-2 rounded-full mr-1 ${style.dot}`} />
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}
