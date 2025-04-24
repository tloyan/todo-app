import { TaskType } from "@/app/components/task";

export class TaskApi {
  static async add(values: {
    title: string;
    description?: string | undefined;
    categories?: string[];
    priority?: "low" | "medium" | "high";
  }) {
    const response = await fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...values }),
    });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  }

  static async update(id: string, data: Partial<TaskType>) {
    const response = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  }

  static async delete(id: string) {
    const response = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: "DELETE",
    });

    console.log(await response.json());
  }
}
