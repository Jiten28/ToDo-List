import { render, screen } from "@testing-library/react";
import PriorityBadge from "../components/PriorityBadge";

test("renders critical priority badge", () => {
  render(<PriorityBadge level="critical" />);
  expect(screen.getByText(/Critical/i)).toBeInTheDocument();
});
