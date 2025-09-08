import React, { useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import { filterByDateRange } from "../utils/dateUtils";

export default function FilterBar() {
  const { tasks, filters, updateFilters, clearCompleted } = useTasks();

  const visibleCount = useMemo(() => {
    const byDate = filterByDateRange(tasks, filters.dateRange);
    const byPriority = filters.priority === "all" ? byDate : byDate.filter(t => t.priority === filters.priority);
    const bySearch = filters.search
      ? byPriority.filter(t => t.text.toLowerCase().includes(filters.search.toLowerCase()))
      : byPriority;
    return bySearch.length;
  }, [tasks, filters]);

  return (
    <section aria-label="Filters" className="bg-blue-200 rounded-xl p-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor="search">Search tasks</label>
        <input
          id="search"
          type="search"
          placeholder="Search…"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className="h-10 rounded-lg bg-white/70 px-3 outline-none w-40 md:w-56"
        />

        <label className="sr-only" htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={filters.priority}
          onChange={(e) => updateFilters({ priority: e.target.value })}
          className="h-10 rounded-lg bg-white/70 px-3 outline-none"
        >
          <option value="all">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-700 mr-1">Date:</span>
        {["all", "today", "week"].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => updateFilters({ dateRange: r })}
            className={`px-3 h-9 rounded-full text-sm font-medium transition
              ${filters.dateRange === r ? "bg-orange-600 text-white" : "bg-white/70 hover:bg-white"}`}
            aria-pressed={filters.dateRange === r}
          >
            {r === "all" ? "All" : r === "today" ? "Today" : "This week"}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-slate-700">{visibleCount} shown</span>
          <button
            type="button"
            onClick={clearCompleted}
            className="px-3 h-9 rounded-full text-sm font-semibold bg-red-600 text-white hover:bg-red-700"
            title="Remove all completed tasks"
          >
            Clear completed
          </button>
        </div>
      </div>
    </section>
  );
}
