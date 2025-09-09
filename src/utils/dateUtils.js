export function filterByDateRange(tasks, range) {
  if (range === "all") return tasks;

  const now = new Date();
  return tasks.filter((t) => {
    if (!t.deadline) return false;
    const d = new Date(t.deadline);

    switch (range) {
      case "today":
        return d.toDateString() === now.toDateString();
      case "week":
        const weekLater = new Date();
        weekLater.setDate(now.getDate() + 7);
        return d >= now && d <= weekLater;
      case "overdue":
        return d < now;
      default:
        return true;
    }
  });
}
