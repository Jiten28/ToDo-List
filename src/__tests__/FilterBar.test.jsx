import { render, screen } from "@testing-library/react";
import { TaskProvider } from "../context/TaskContext";
import FilterBar from "../components/FilterBar";

test("renders search input and filters", () => {
  render(
    <TaskProvider>
      <FilterBar />
    </TaskProvider>
  );
  expect(screen.getByPlaceholderText(/Search tasks/i)).toBeInTheDocument();
  expect(screen.getByText(/All priorities/i)).toBeInTheDocument();
});
