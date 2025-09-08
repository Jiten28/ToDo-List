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

  // set to Monday 00:00 of this week
  const day = now.getDay(); // 0..6 (Sun..Sat)
  const diffToMonday = (day + 6) % 7; // number of days since Monday
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - diffToMonday);

  const nextMonday = new Date(monday);
  nextMonday.setDate(monday.getDate() + 7);

  return d >= monday && d < nextMonday;
};

export const filterByDateRange = (tasks, range) => {
  if (range === "today") return tasks.filter(t => isToday(t.createdAt));
  if (range === "week") return tasks.filter(t => isThisWeek(t.createdAt));
  return tasks;
};
