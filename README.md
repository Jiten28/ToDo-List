#  ToDo List Application

### 📌 Overview
The **ToDo List** is a modern and efficient task management application built using **React.js with Vite** and styled with **Tailwind CSS**.  
It helps users organize their day by allowing them to **add, delete, filter, prioritize, and sort tasks** effortlessly.  
The app features an intuitive UI, persistence with `localStorage`, and responsive design for desktop and mobile.

<img width="1863" height="878" alt="image" src="https://github.com/user-attachments/assets/e4f60e1f-8064-44ab-bf9a-a6654370d8c6" />

---

### ✨ Key Features

- **Task Management**
  - ➕ Add tasks with **priority** (Low, Medium, High, Critical)
  - 📂 Assign **categories** (General, Work, Personal, Study, or Custom)
  - 📅 Add **deadline** (optional → "Not applicable" if none)
  - ✅ Mark tasks complete
  - ❌ Delete tasks

- **Filtering & Search**
  - 🔍 Search by task text
  - ⚙️ Filter by:
    - Priority (Low → Critical)
    - Category
    - Date (All, Today, This Week, Overdue)
  - 📊 Sort tasks by:
    - Deadline
    - Priority
    - Category
    - Created time

- **UI Enhancements**
  - 🎨 **PriorityBadge**: color-coded labels (Critical → red, High → orange, Medium → yellow, Low → green)
  - 📋 **FilterBar**: unified toolbar with search, filters, sort, and clear completed button
  - 🕒 **Timestamps**: show created time + deadline
  - 📱 Fully responsive for desktop and mobile

- **Persistence**
  - Tasks saved in **localStorage**, restored automatically on reload.

---

### 🛠️ Challenges Solved

- **State Management** → Used **React Context API** for shared task & filter state.
- **Dynamic Filtering** → Real-time filtering and sorting using memoized hooks.
- **Responsive Layout** → Desktop:
  - Row 1: Add Task
  - Row 2: Search + FilterBar inline
  - Row 3: Task list  
  Mobile:
  - Row 1: Add Task
  - Row 2: Search + Filters stacked
  - Row 3: Task list
- **User Experience** → Balanced multiple features while keeping UI clean and accessible.

---

### 🚀 Future Enhancements

- ✏️ Task Editing (inline editing of text, category, deadline)
- 👤 Authentication (multi-device sync)
- 🗂️ Category Management (custom categories persisted)
- 📦 Drag-and-drop reordering
- 🌙 Dark Mode
- ☁️ Backend Integration (cloud DB sync)

---

### ⚙️ Technology Stack

- **Frontend** → React.js (Vite)
- **Styling** → Tailwind CSS
- **Icons** → Lucide React
- **State Management** → React Context API + Hooks
- **Testing** → Jest + React Testing Library
- **Storage** → localStorage

---

### 📦 Getting Started

1. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd todo-list
````

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run App**

   ```bash
   npm run dev
   ```

4. **Run Tests**

   ```bash
   npm test
   ```

---

### 🧪 Tests Included

* `TaskCard.test.jsx` → verifies task render (text, critical badge, deadline)
* `PriorityBadge.test.jsx` → ensures priority badges display correctly
* `FilterBar.test.jsx` → ensures search and filters render

---
Demo Link: https://to-do-list-six-ecru-67.vercel.app
---

👨‍💻 **Author:** Jiten Kumar
📍 Hyderabad, India
🎓 B.Tech CSE (AIML), Malla Reddy Institute of Technology and Science
🌐 https://jitenkumarportfolio.netlify.app

```

---

✅ This README is **submission-ready** and covers every required section.  

👉 Do you also want me to **write a sample commit history plan** (like `feat: add FilterBar`, `feat: add PriorityBadge`, `feat: add sorting`), so your repo looks clean and professional when they check the commits?
```
