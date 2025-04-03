"use client";

import { AddTaskForm } from "@/components/forms/add-task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Task } from "@/types/task";
import { Trash } from "lucide-react";
import { useState } from "react";

export default function TodoList({ remoteTasks }: { remoteTasks: Task[] }) {
  const [tasks, setTasks] = useState(remoteTasks);
  const [open, setOpen] = useState(false);

  const addTask = async (values: {
    title: string;
    description?: string | undefined;
  }) => {
    try {
      const response = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      const task = await response.json();
      setOpen(false);
      setTasks([...tasks, task]);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTaskCompletion = async (task: Task) => {
    const newStatus = task.status === "DONE" ? "OPEN" : "DONE";
    console.log(task.status);
    console.log(newStatus);
    try {
      const response = await fetch(`http://localhost:4000/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error();
      }

      setTasks(
        tasks.map((t) =>
          t.id === task.id ? { ...task, status: newStatus } : t
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const removeTask = async (id: string) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

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
              <AddTaskForm onSubmit={addTask} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No tasks yet. Add one above!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.status === "DONE"}
                    onCheckedChange={() => toggleTaskCompletion(task)}
                  />
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`font-medium ${task.status === "DONE" ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTask(task.id)}
                  aria-label="Remove task"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
