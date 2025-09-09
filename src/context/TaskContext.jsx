import React, { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("todoApp")) || []
  );

  const [filters, setFilters] = useState({
    search: "",
    priority: "all",
    category: "all",
    dateRange: "all",
    sortBy: "createdAt",
  });

  useEffect(() => {
    localStorage.setItem("todoApp", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, priority, category, deadline, createdAt) => {
    if (!text.trim()) return;
    const newTask = {
      id: Date.now(),
      text,
      priority,
      category,
      deadline: deadline || null,
      createdAt: createdAt || new Date().toISOString(),
      isComplete: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleComplete = (id) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isComplete: !t.isComplete } : t
      )
    );

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const updateFilters = (updates) =>
    setFilters((prev) => ({ ...prev, ...updates }));

  const clearCompleted = () =>
    setTasks((prev) => prev.filter((t) => !t.isComplete));

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleComplete,
        deleteTask,
        filters,
        updateFilters,
        clearCompleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
