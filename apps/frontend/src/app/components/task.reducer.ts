import { TaskType } from "@/types/task";

export function tasksReducer(
  state: TaskType[],
  action: { type: "add" | "update" | "delete"; payload: Partial<TaskType> }
): TaskType[] {
  switch (action.type) {
    case "add":
      return [...state, action.payload as TaskType];
    case "update":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t
      );
    case "delete":
      return state.filter((task) => action.payload.id != task.id);
    default:
      throw new Error();
  }
}
