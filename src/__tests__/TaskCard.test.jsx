import { render, screen } from "@testing-library/react";
import TaskCard from "../components/TaskCard";

test("renders task text and priority", () => {
  const task = {
    id: 1,
    text: "Test task",
    priority: "critical",
    category: "Work",
    createdAt: new Date().toISOString(),
    deadline: null,
    isComplete: false,
  };
  render(<TaskCard task={task} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByText("Test task")).toBeInTheDocument();
  expect(screen.getByText(/Critical/i)).toBeInTheDocument();
  expect(screen.getByText(/Not applicable/i)).toBeInTheDocument();
});
