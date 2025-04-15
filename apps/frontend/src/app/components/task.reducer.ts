import { TaskType } from "@/types/task";

export type TaskAction =
  | { type: "add"; payload: TaskType }
  | { type: "update"; payload: TaskType }
  | { type: "delete"; payload: { id: string } }
  | { type: "set"; payload: TaskType[] };

export function tasksReducer(
  state: TaskType[],
  action: TaskAction
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
    case "set":
      return action.payload;
    default:
      throw new Error();
  }
}
