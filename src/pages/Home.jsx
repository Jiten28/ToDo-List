import React, { useRef, useState, useMemo } from "react";
import todo_icon from "../assets/todo_icon.png";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";
import { useTasks } from "../context/TaskContext";
import { filterByDateRange } from "../utils/dateUtils";

export default function Home() {
  const { tasks, addTask, toggleComplete, deleteTask, filters } = useTasks();
  const inputRef = useRef(null);

  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("General");
  const [customCategory, setCustomCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const onAdd = () => {
    const finalCategory =
      category === "Custom" && customCategory.trim() !== ""
        ? customCategory
        : category;

    addTask(
      inputRef.current?.value || "",
      priority,
      finalCategory,
      deadline || null,
      new Date().toISOString()
    );

    if (inputRef.current) inputRef.current.value = "";
    setPriority("low");
    setCategory("General");
    setCustomCategory("");
    setDeadline("");
  };

  const onEnter = (e) => {
    if (e.key === "Enter") onAdd();
  };

  const visibleTasks = useMemo(() => {
    let filtered = filterByDateRange(tasks, filters.dateRange);
    if (filters.priority !== "all")
      filtered = filtered.filter((t) => t.priority === filters.priority);
    if (filters.category !== "all")
      filtered = filtered.filter((t) => t.category === filters.category);
    if (filters.search)
      filtered = filtered.filter((t) =>
        t.text.toLowerCase().includes(filters.search.toLowerCase())
      );

    // Sorting
    switch (filters.sortBy) {
      case "deadline":
        filtered.sort((a, b) =>
          a.deadline && b.deadline
            ? new Date(a.deadline) - new Date(b.deadline)
            : a.deadline
            ? -1
            : 1
        );
        break;
      case "priority":
        const order = { critical: 1, high: 2, medium: 3, low: 4 };
        filtered.sort((a, b) => order[a.priority] - order[b.priority]);
        break;
      case "category":
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "createdAt":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }, [tasks, filters]);

  const remaining = tasks.filter((t) => !t.isComplete).length;

  return (
    <main className="bg-blue-400 place-self-center w-11/12 max-w-6xl flex flex-col p-6 md:p-8 min-h-[600px] rounded-lg shadow-lg mx-auto">
      {/* Header */}
      <header className="flex items-center gap-2 mb-4">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-do List</h1>
      </header>

      {/* Row 1: Add Task (full width) */}
      <section className="bg-blue-200 rounded-xl p-3 w-full">
        <input
          ref={inputRef}
          onKeyDown={onEnter}
          type="text"
          placeholder="Add a task"
          className="border-0 outline-none bg-white/70 rounded-md h-10 px-3 w-full mb-2"
        />
        <div className="flex flex-wrap gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-10 rounded-lg bg-white/70 px-3 outline-none"
          >
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
            <option value="critical">Critical</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 rounded-lg bg-white/70 px-3 outline-none"
          >
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
            <option value="Custom">Custom</option>
          </select>

          {category === "Custom" && (
            <input
              type="text"
              placeholder="Enter category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="h-10 rounded-lg bg-white/70 px-3 outline-none flex-1"
            />
          )}

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="h-10 rounded-lg bg-white/70 px-3 outline-none"
          />

          <button
            onClick={onAdd}
            className="rounded-lg bg-orange-600 hover:bg-orange-700 px-4 h-10 text-white font-medium"
          >
            Add +
          </button>
        </div>
        <p className="text-sm text-slate-700 mt-2">
          {remaining} task{remaining !== 1 ? "s" : ""} remaining
        </p>
      </section>

      {/* Row 2: Unified Toolbar */}
      <section className="mt-4 bg-blue-200 rounded-xl p-3">
        <FilterBar />
      </section>

      {/* Row 3: Task list */}
      <section className="mt-4 flex-1">
        {visibleTasks.length === 0 ? (
          <p className="text-white/90 text-center mt-6">No tasks to show.</p>
        ) : (
          visibleTasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onToggle={toggleComplete}
              onDelete={deleteTask}
            />
          ))
        )}
      </section>
    </main>
  );
}
