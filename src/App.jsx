import React from "react";
import { TaskProvider } from "./context/TaskContext";
import Home from "./pages/Home";

export default function App() {
  return (
    <TaskProvider>
      <div className="bg-sky-200 grid py-4 min-h-screen">
        <Home />
      </div>
    </TaskProvider>
  );
}
