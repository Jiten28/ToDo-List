# **ToDo List Application**

### **Overview**

The ToDo List is a modern and efficient task management application built using **React.js with Vite** and styled with **Tailwind CSS**. It helps users organize their day by allowing them to **add, edit, delete, prioritize, and filter tasks** effortlessly. The intuitive interface ensures an excellent user experience while maintaining strong functionality.

![image](https://github.com/user-attachments/assets/ee972f64-7324-4785-a4b3-865483592b33)

---

### **Key Features**

* **Task Addition**: Add tasks with customizable priority levels (Low, Medium, High, Critical).
* **Task Editing (Planned)**: Modify tasks to adapt to schedule changes.
* **Task Deletion**: Remove completed or unnecessary tasks effortlessly.
* **Completion Tracking**: Mark tasks as completed to visualize progress.
* **Filter Options**:

  * View tasks by **status** (all, completed, pending).
  * Filter by **date** → *All, Today, This Week, Custom Date Range*.
  * Filter by **priority** → *Low, Medium, High, Critical*.
  * Search tasks by text.
* **Priority Badges**: Each task displays a colored badge with a label for its priority.
* **Persistent Storage**: Tasks are saved in **localStorage** and restored on reload.
* **Responsive Design**: Fully responsive UI for desktop, tablet, and mobile.

---

### **Challenges**

* **State Management**: Achieved clean separation of **business logic** (tasks) and **UI state** (filters) using React Context API.
* **Dynamic Filtering**: Ensured real-time re-rendering of tasks when filters change.
* **User Experience**: Balanced multiple features with a simple, clutter-free UI.
* **Accessibility**: Used semantic HTML, labels, and ARIA attributes for better usability.

---

### **Future Enhancements**

* **Task Editing**: Inline editing of existing tasks.
* **User Authentication**: Allow saving tasks across devices.
* **Category Management**: Group tasks into categories (e.g., Work, Personal).
* **Drag-and-Drop Interface**: Reorder tasks intuitively.
* **Dark Mode**: Toggle between light and dark themes.
* **Backend Integration**: Store tasks in a cloud database for multi-device sync.

---

### **Technology Stack**

* **Frontend**: React.js (with Vite)
* **Styling**: Tailwind CSS
* **State Management**: React Context API + Hooks
* **Storage**: LocalStorage

---

### **Steps to Start the Project**

1. **Setup Environment**: Install Node.js and npm/yarn.
2. **Create React Vite App**:

   ```bash
   npm create vite@latest todo-list --template react
   cd todo-list
   npm install
   ```
3. **Install Tailwind CSS**:
   Follow the [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation) for Vite.
4. **Add Project Files**: Copy the `src/` structure with components, context, and utils.
5. **Run the Application**:

   ```bash
   npm run dev
   ```
6. **Test the Application**: Verify adding, completing, deleting, and filtering tasks.

---

### **Libraries and Installation Commands**

1. **React + Vite**

   ```bash
   npm create vite@latest todo-list --template react
   ```

2. **Tailwind CSS**

   * [Installation Guide](https://tailwindcss.com/docs/installation)
   * Used for modern responsive styling.

3. **React Icons (Optional)**

   ```bash
   npm install react-icons
   ```

   * For enhancing UI with icons.

---
