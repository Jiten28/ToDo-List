export const isToday = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

export const isThisWeek = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = (day + 6) % 7;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - diffToMonday);
  const nextMonday = new Date(monday);
  nextMonday.setDate(monday.getDate() + 7);
  return d >= monday && d < nextMonday;
};

export const isOverdue = (iso) => {
  if (!iso) return false;
  const deadline = new Date(iso);
  return deadline < new Date();
};

export const filterByDateRange = (tasks, range) => {
  if (range === "today") return tasks.filter(t => isToday(t.createdAt));
  if (range === "week") return tasks.filter(t => isThisWeek(t.createdAt));
  if (range === "overdue") return tasks.filter(t => isOverdue(t.deadline));
  return tasks;
};
