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

  const onAdd = () => {
    addTask(inputRef.current?.value || "", priority);
    if (inputRef.current) inputRef.current.value = "";
    setPriority("low");
  };

  const onEnter = (e) => {
    if (e.key === "Enter") onAdd();
  };

  const visibleTasks = useMemo(() => {
    const byDate = filterByDateRange(tasks, filters.dateRange);
    const byPriority = filters.priority === "all" ? byDate : byDate.filter(t => t.priority === filters.priority);
    const bySearch = filters.search
      ? byPriority.filter(t => t.text.toLowerCase().includes(filters.search.toLowerCase()))
      : byPriority;
    return bySearch;
  }, [tasks, filters]);

  const remaining = tasks.filter(t => !t.isComplete).length;

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
          <label className="sr-only" htmlFor="new-task">Add a task</label>
          <input
            id="new-task"
            ref={inputRef}
            onKeyDown={onEnter}
            type="text"
            className="border-0 outline-none flex-1 bg-transparent h-12 pl-4 pr-2 placeholder:text-slate-600"
            placeholder="Add a task"
          />

          <label className="sr-only" htmlFor="new-priority">Priority</label>
          <select
            id="new-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-12 rounded-full bg-white/70 px-3 outline-none"
            aria-label="Choose priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            type="button"
            onClick={onAdd}
            className="border-none rounded-full bg-orange-600 hover:bg-orange-700 w-28 md:w-32 h-12 text-white font-medium"
          >
            Add +
          </button>
        </div>

        <p className="mt-2 text-sm text-white/90">
          {remaining} task{remaining !== 1 ? "s" : ""} remaining
        </p>
      </section>

      {/* Filters */}
      <div className="mt-5">
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
