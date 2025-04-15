"use client";
import { TaskType } from "@/types/task";
import { useState } from "react";
import { tasksReducer } from "./components/task.reducer";
import { useReducer } from "react";

import TaskListHeader from "./components/task-list-header";
import TaskList from "./components/task-list";

export const sortOptions = [
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
  // { label: "Due Date (Earliest)", value: "date-asc" },
  // { label: "Due Date (Latest)", value: "date-desc" },
  // { label: "Priority (High-Low)", value: "priority-desc" },
  // { label: "Priority (Low-High)", value: "priority-asc" },
];

export function TaskPage({
  tasks,
  categories,
}: {
  tasks: TaskType[];
  categories: string[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [localTasks, dispatch] = useReducer(tasksReducer, tasks);

  const filteredTasks = filterTasks(localTasks, {
    searchQuery,
    selectedCategory,
    sortBy,
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white flex flex-col gap-4 mb-6">
      <TaskListHeader
        categories={categories}
        dispatch={dispatch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <TaskList tasks={filteredTasks} dispatch={dispatch} />
    </div>
  );
}

function filterTasks(
  tasks: TaskType[],
  {
    searchQuery,
    selectedCategory,
    sortBy,
  }: {
    searchQuery: string;
    selectedCategory: string;
    sortBy: { label: string; value: string };
  }
) {
  // Filter tasks based on search query and category
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      task.categories.find((t) => t.name === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Sort filtered tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy.value) {
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      // case "date-asc":
      //   return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      // case "date-desc":
      //   return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      // case "priority-desc":
      //   const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      //   return priorityOrder[b.priority] - priorityOrder[a.priority];
      // case "priority-asc":
      //   const priorityOrderAsc = { High: 3, Medium: 2, Low: 1 };
      //   return priorityOrderAsc[a.priority] - priorityOrderAsc[b.priority];
      default:
        return 0;
    }
  });
  return sortedTasks;
}
