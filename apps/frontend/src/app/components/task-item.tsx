import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TaskType } from "@/app/components/task";
import { Trash } from "lucide-react";
import { getPriorityColor } from "../utils/priority-color";

export function TaskItem({
  task,
  handleToggleTaskCompletion,
  handleRemoveTask,
}: {
  task: TaskType;
  handleToggleTaskCompletion: (task: TaskType) => void;
  handleRemoveTask: (id: string) => void;
}) {
  return (
    <>
      <div
        key={task.id}
        className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center gap-3"
      >
        <div className="flex items-center justify-start gap-5 w-full">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.status === "DONE"}
            onCheckedChange={() => handleToggleTaskCompletion(task)}
          />
          <div className="flex-1 items-center justify-center">
            <label
              htmlFor={`task-${task.id}`}
              className={`block font-medium ${task.status === "DONE" ? "line-through text-muted-foreground" : ""}`}
            >
              {task.title}
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {task.categories?.map((category) => (
                <Badge key={category.name} variant="secondary">
                  {category.name}
                </Badge>
              ))}
              {task.priority && (
                <Badge
                  className={getPriorityColor(task.priority) + " text-white"}
                >
                  {task.priority}
                </Badge>
              )}
              {task.due_date && (
                <span className="text-sm text-muted-foreground">
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <div className="ml-auto">
            {/* <Button
              variant="ghost"
              size="icon"
              aria-label="Edit task"
            >
              <Edit className="h-4 w-4" />
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveTask(task.id)}
              aria-label="Remove task"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
