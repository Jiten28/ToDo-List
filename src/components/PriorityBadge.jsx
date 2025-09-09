import React from "react";

const styles = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-600 text-white font-bold",
};

export default function PriorityBadge({ level = "low" }) {
  return (
    <span
      aria-label={`Priority ${level}`}
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${styles[level] || styles.low}`}
    >
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}
