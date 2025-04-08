import { TaskType } from "@/types/task";

export class TaskApi {
  static async add(values: {
    title: string;
    description?: string | undefined;
  }) {
    const response = await fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...values, title: false }),
    });

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
    await fetch(`http://localhost:4000/tasks/${id}`, {
      method: "DELETE",
    });
  }
}
