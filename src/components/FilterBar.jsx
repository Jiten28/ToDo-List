import React, { useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import { filterByDateRange, filterByCustomRange } from "../utils/dateUtils";

export default function FilterBar() {
  const { tasks, filters, updateFilters, clearCompleted } = useTasks();

  const visibleCount = useMemo(() => {
    let byDate = filterByDateRange(tasks, filters.dateRange);
    if (filters.dateRange === "custom") {
      byDate = filterByCustomRange(tasks, filters.customStart, filters.customEnd);
    }
    const byPriority =
      filters.priority === "all"
        ? byDate
        : byDate.filter((t) => t.priority === filters.priority);
    const bySearch = filters.search
      ? byPriority.filter((t) =>
          t.text.toLowerCase().includes(filters.search.toLowerCase())
        )
      : byPriority;
    return bySearch.length;
  }, [tasks, filters]);

  return (
    <section className="bg-blue-200 rounded-xl p-4 w-full flex flex-col gap-4">
      {/* Row 1: Search + Priority */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Search…"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className="h-10 flex-1 rounded-lg bg-white/70 px-3 outline-none"
        />
        <select
          value={filters.priority}
          onChange={(e) => updateFilters({ priority: e.target.value })}
          className="h-10 rounded-lg bg-white/70 px-3 outline-none"
        >
          <option value="all">All priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Row 2: Date filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-700">Date:</span>
        {["all", "today", "week", "custom"].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => updateFilters({ dateRange: r })}
            className={`px-3 h-9 rounded-full text-sm font-medium transition ${
              filters.dateRange === r
                ? "bg-orange-600 text-white"
                : "bg-white/70 hover:bg-white"
            }`}
          >
            {r === "all"
              ? "All"
              : r === "today"
              ? "Today"
              : r === "week"
              ? "This Week"
              : "Custom"}
          </button>
        ))}

        {filters.dateRange === "custom" && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={filters.customStart || ""}
              onChange={(e) => updateFilters({ customStart: e.target.value })}
              className="h-9 rounded-lg bg-white/70 px-2 outline-none"
            />
            <input
              type="date"
              value={filters.customEnd || ""}
              onChange={(e) => updateFilters({ customEnd: e.target.value })}
              className="h-9 rounded-lg bg-white/70 px-2 outline-none"
            />
          </div>
        )}
      </div>

      {/* Row 3: Count + Clear */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-700">{visibleCount} shown</span>
        <button
          type="button"
          onClick={clearCompleted}
          className="px-3 h-9 rounded-full text-sm font-semibold bg-red-600 text-white hover:bg-red-700"
        >
          Clear completed
        </button>
      </div>
    </section>
  );
}
