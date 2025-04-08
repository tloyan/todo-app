export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: "DONE" | "OPEN";
  categories: {
    name: string;
  }[];
  created_at: Date;
  updated_at: Date;
};
