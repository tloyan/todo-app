export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: "DONE" | "OPEN";
  categories: {
    name: string;
  }[];
  priority: "low" | "medium" | "high";
  due_date: Date;
  created_at: Date;
  updated_at: Date;
};
