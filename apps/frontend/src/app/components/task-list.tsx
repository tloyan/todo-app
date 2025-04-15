"use client";
import { TaskType } from "@/types/task";
import { TaskItem } from "./task-item";
import { TaskApi } from "./task.api";
import { ActionDispatch } from "react";
import { TaskAction } from "./task.reducer";

export default function TaskList({
  tasks,
  dispatch,
}: {
  tasks: TaskType[];
  dispatch: ActionDispatch<[action: TaskAction]>;
}) {
  const handleToggleTaskCompletion = async (task: TaskType) => {
    const newStatus = task.status === "DONE" ? "OPEN" : "DONE";
    try {
      const updated_task = await TaskApi.update(task.id, { status: newStatus });
      dispatch({ type: "update", payload: { ...updated_task } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveTask = async (id: string) => {
    try {
      await TaskApi.delete(id);
      dispatch({ type: "delete", payload: { id } });
    } catch (error) {
      console.error(error);
    }
  };

  const openTasks = tasks.filter((t) => t.status === "OPEN");
  const doneTasks = tasks.filter((t) => t.status === "DONE");

  return (
    <>
      <div className="space-y-3">
        {tasks.length > 0 ? (
          <>
            {openTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                handleToggleTaskCompletion={handleToggleTaskCompletion}
                handleRemoveTask={handleRemoveTask}
              />
            ))}
            {doneTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                handleToggleTaskCompletion={handleToggleTaskCompletion}
                handleRemoveTask={handleRemoveTask}
              />
            ))}
          </>
        ) : (
          <div className="text-center p-8 text-muted-foreground">
            No tasks found matching your criteria
          </div>
        )}
      </div>
    </>
  );
}
