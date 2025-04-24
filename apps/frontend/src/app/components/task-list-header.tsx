import { Check, ChevronDown, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { priorityOptions, sortOptions } from "../task-page";
import { CreateTaskForm } from "@/app/components/forms/create-task.form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TaskApi } from "./task.api";
import { ActionDispatch } from "react";
import { TaskAction } from "./task.reducer";

export default function TaskListHeader({
  categories,
  dispatch,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  selectedPriority,
  setSelectedPriority,
}: {
  categories: string[];
  dispatch: ActionDispatch<[action: TaskAction]>;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  selectedCategory: string;
  setSelectedCategory: (s: string) => void;
  sortBy: { label: string; value: string };
  setSortBy: (s: { label: string; value: string }) => void;
  selectedPriority: { label: string; value: string };
  setSelectedPriority: (s: { label: string; value: string }) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleAddTask = async (values: {
    title: string;
    description?: string | undefined;
    categories?: string[];
    priority?: "low" | "medium" | "high";
  }) => {
    try {
      const task = await TaskApi.add(values);
      dispatch({ type: "add", payload: { ...task } });
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex items-center space-x-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>+</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add new Task</DialogTitle>
            <CreateTaskForm onSubmit={handleAddTask} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-white"
        />
      </div>

      {/* Category filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full sm:w-auto justify-between"
          >
            Category: {selectedCategory}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuGroup>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                {selectedCategory === category && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Priority filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full sm:w-auto justify-between"
          >
            Priority: {selectedPriority.label}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuGroup>
            {priorityOptions.map((priority) => (
              <DropdownMenuItem
                key={priority.value}
                onClick={() => setSelectedPriority(priority)}
              >
                {priority.label}
                {selectedPriority.value === priority.value && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full sm:w-auto justify-between"
          >
            Sort: {sortBy.label}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[220px]">
          <DropdownMenuGroup>
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setSortBy(option)}
              >
                {option.label}
                {sortBy.value === option.value && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
