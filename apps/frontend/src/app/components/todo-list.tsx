"use client";

import { AddTaskForm } from "@/components/forms/add-task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskType } from "@/types/task";
import { useReducer, useState } from "react";
import { tasksReducer } from "./task.reducer";
import { Task } from "./task";
import { TaskApi } from "./task.api";

export default function TodoList({ remoteTasks }: { remoteTasks: TaskType[] }) {
  const [tasks, dispatch] = useReducer(tasksReducer, remoteTasks);
  const [open, setOpen] = useState(false);

  const handleAddTask = async (values: {
    title: string;
    description?: string | undefined;
  }) => {
    try {
      const task = await TaskApi.add(values);
      dispatch({ type: "add", payload: { ...task } });
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

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

  const openTasks = tasks
    .filter((t) => t.status === "OPEN")
    // @ts-expect-error right and side must be blablabla
    .sort((a, b) => a.id - b.id);

  const doneTasks = tasks
    .filter((t) => t.status === "DONE")
    // @ts-expect-error right and side must be blablabla
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return (
    <Card className="w-full max-w-md ml-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Todo List
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add new Task</DialogTitle>
              <AddTaskForm onSubmit={handleAddTask} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No tasks yet. Add one above!
            </p>
          ) : (
            <>
              {openTasks.map((task: TaskType) => (
                <Task
                  key={task.id}
                  task={task}
                  handleToggleTaskCompletion={handleToggleTaskCompletion}
                  handleRemoveTask={handleRemoveTask}
                />
              ))}
              {doneTasks.map((task: TaskType) => (
                <Task
                  key={task.id}
                  task={task}
                  handleToggleTaskCompletion={handleToggleTaskCompletion}
                  handleRemoveTask={handleRemoveTask}
                />
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
