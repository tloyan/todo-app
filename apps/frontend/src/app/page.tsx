import { Task } from "@/types/task";
import { use } from "react";
import TodoList from "./components/todo-list";

const fetchTasks = async () => {
  const response = await fetch("http://localhost:4000/tasks");
  const data = await response.json();
  return data as Task[];
};

export default function Home() {
  const tasks = use(fetchTasks());

  return (
    <div className="h-full min-h-full w-full bg-red-100 flex items-center justify-start flex-wrap">
      <TodoList remoteTasks={tasks} />
    </div>
  );
}
