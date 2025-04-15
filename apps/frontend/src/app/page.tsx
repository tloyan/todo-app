import { TaskType } from "@/types/task";
import { TaskPage } from "./task-page";

const fetchTasks = async () => {
  const response = await fetch("http://localhost:4000/tasks");
  const data = await response.json();
  if (data.error) return [] as TaskType[];
  return data as TaskType[];
};

const fetchCategories = async () => {
  const response = await fetch("http://localhost:4000/tasks/categories");
  const data = await response.json();
  if (data.error) return [];
  return data.map((category: { name: string }) => category.name);
};

export default async function Home() {
  const tasks = await fetchTasks();
  const categories = await fetchCategories();
  console.log(categories);

  return (
    <div className="h-full min-h-full w-full bg-red-100 flex flex-col items-center justify-center flex-wrap">
      <TaskPage tasks={tasks} categories={["All", ...categories]} />
    </div>
  );
}
