import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const TaskContext = createContext();

const STORAGE_KEY = "todoApp.v2";

const defaultFilters = {
  dateRange: "all",     // "all" | "today" | "week"
  priority: "all",      // "all" | "low" | "medium" | "high"
  search: "",           // substring match on text
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [filters, setFilters] = useState(defaultFilters);

  // ---- actions ----
  const addTask = (text, priority = "low") => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask = {
      id: crypto.randomUUID?.() ?? Date.now(),
      text: trimmed,
      isComplete: false,
      priority,                 // "low" | "medium" | "high"
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const toggleComplete = (id) =>
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, isComplete: !t.isComplete } : t)));

  const clearCompleted = () => setTasks(prev => prev.filter(t => !t.isComplete));

  const updateFilters = (patch) => setFilters(prev => ({ ...prev, ...patch }));

  // ---- persistence ----
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ---- derived state (filtered list) ----
  const value = useMemo(
    () => ({
      tasks,
      filters,
      addTask,
      deleteTask,
      toggleComplete,
      clearCompleted,
      updateFilters,
    }),
    [tasks, filters]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export const useTasks = () => useContext(TaskContext);
