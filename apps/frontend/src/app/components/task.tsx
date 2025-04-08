import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TaskType } from "@/types/task";
import { Trash } from "lucide-react";

export function Task({
  task,
  handleToggleTaskCompletion,
  handleRemoveTask,
}: {
  task: TaskType;
  handleToggleTaskCompletion: (task: TaskType) => void;
  handleRemoveTask: (id: string) => void;
}) {
  return (
    <div
      key={task.id}
      className="flex items-center justify-between p-3 rounded-lg border"
    >
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.status === "DONE"}
          onCheckedChange={() => handleToggleTaskCompletion(task)}
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
        onClick={() => handleRemoveTask(task.id)}
        aria-label="Remove task"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
