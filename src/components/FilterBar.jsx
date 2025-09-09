import React, { useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import { filterByDateRange } from "../utils/dateUtils";
import { Search, Filter } from "lucide-react"; // using lucide icons

export default function FilterBar() {
  const { tasks, filters, updateFilters, clearCompleted } = useTasks();

  const visibleCount = useMemo(() => {
    let filtered = filterByDateRange(tasks, filters.dateRange);
    if (filters.priority !== "all")
      filtered = filtered.filter((t) => t.priority === filters.priority);
    if (filters.category !== "all")
      filtered = filtered.filter((t) => t.category === filters.category);
    if (filters.search)
      filtered = filtered.filter((t) =>
        t.text.toLowerCase().includes(filters.search.toLowerCase())
      );
    return filtered.length;
  }, [tasks, filters]);

  return (
    <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between w-full">
      {/* Search */}
      <div className="flex items-center gap-2 flex-1">
        <Search className="w-5 h-5 text-slate-700" />
        <input
          type="search"
          placeholder="Search tasks…"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className="h-10 w-full rounded-lg bg-white/70 px-3 outline-none"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 md:justify-end flex-1">
        <Filter className="w-5 h-5 text-slate-700 mr-1" />

        {/* Priority */}
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

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => updateFilters({ category: e.target.value })}
          className="h-10 rounded-lg bg-white/70 px-3 outline-none"
        >
          <option value="all">All categories</option>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>

        {/* Date */}
        {["all", "today", "week", "overdue"].map((r) => (
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
              ? "This week"
              : "Overdue"}
          </button>
        ))}

        {/* Count + Clear */}
        <span className="text-sm text-slate-700">{visibleCount} shown</span>
        <button
          type="button"
          onClick={clearCompleted}
          className="px-3 h-9 rounded-full text-sm font-semibold bg-red-600 text-white hover:bg-red-700"
        >
          Clear
        </button>
      </div>
    </section>
  );
}
