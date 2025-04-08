export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: "DONE" | "OPEN";
  created_at: Date;
  updated_at: Date;
};
