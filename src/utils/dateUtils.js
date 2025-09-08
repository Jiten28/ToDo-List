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

  const day = now.getDay(); // 0=Sun
  const diffToMonday = (day + 6) % 7;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - diffToMonday);

  const nextMonday = new Date(monday);
  nextMonday.setDate(monday.getDate() + 7);

  return d >= monday && d < nextMonday;
};

export const filterByDateRange = (tasks, range) => {
  if (range === "today") return tasks.filter((t) => isToday(t.createdAt));
  if (range === "week") return tasks.filter((t) => isThisWeek(t.createdAt));
  return tasks;
};

export const filterByCustomRange = (tasks, start, end) => {
  if (!start || !end) return tasks;
  const s = new Date(start);
  const e = new Date(end);
  e.setHours(23, 59, 59, 999);
  return tasks.filter((t) => {
    const d = new Date(t.createdAt);
    return d >= s && d <= e;
  });
};
