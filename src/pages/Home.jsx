import React, { useRef, useState, useMemo } from "react";
import todo_icon from "../assets/todo_icon.png";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";
import { useTasks } from "../context/TaskContext";
import { filterByDateRange, filterByCustomRange } from "../utils/dateUtils";

export default function Home() {
  const { tasks, addTask, toggleComplete, deleteTask, filters } = useTasks();
  const inputRef = useRef(null);
  const [priority, setPriority] = useState("low");

  const onAdd = () => {
    addTask(inputRef.current?.value || "", priority);
    if (inputRef.current) inputRef.current.value = "";
    setPriority("low");
  };

  const onEnter = (e) => {
    if (e.key === "Enter") onAdd();
  };

  const visibleTasks = useMemo(() => {
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
    return bySearch;
  }, [tasks, filters]);

  const remaining = tasks.filter((t) => !t.isComplete).length;

  return (
    <main className="bg-blue-400 place-self-center w-11/12 max-w-md flex flex-col p-6 md:p-7 min-h-[560px] rounded-lg shadow-lg mx-auto">
      {/* Title */}
      <header className="flex items-center mt-3 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-do List</h1>
      </header>

      {/* Add form */}
      <section className="mt-6">
        <div className="flex items-stretch gap-2 bg-blue-200 rounded-full p-1">
          <input
            ref={inputRef}
            onKeyDown={onEnter}
            type="text"
            className="flex-1 bg-transparent h-12 pl-4 pr-2 placeholder:text-slate-600 outline-none"
            placeholder="Add a task"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-12 rounded-full bg-white/70 px-3 outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <button
            type="button"
            onClick={onAdd}
            className="rounded-full bg-orange-600 hover:bg-orange-700 w-28 md:w-32 h-12 text-white font-medium"
          >
            Add +
          </button>
        </div>
        <p className="mt-2 text-sm text-white/90">
          {remaining} task{remaining !== 1 ? "s" : ""} remaining
        </p>
      </section>

      {/* Filters */}
      <div className="mt-5 w-full">
        <FilterBar />
      </div>

      {/* Task list */}
      <section className="mt-4">
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
