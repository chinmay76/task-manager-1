import { apiClient } from "./axios"

export type TaskStatus = "pending" | "in-progress" | "done"

export type Task = {
  id: number
  title: string
  description: string
  status: TaskStatus
}

export const taskApi = {
  async fetchTasks() {
    const res = await apiClient.get<Task[]>("/tasks")
    return res.data
  },
  async createTask(payload: Omit<Task, "id">) {
    const res = await apiClient.post<Task>("/tasks", payload)
    return res.data
  },
  async updateTask(payload: Task) {
    const res = await apiClient.put<Task>(`/tasks/${payload.id}`, payload)
    return res.data
  },
  async deleteTask(id: number) {
    await apiClient.delete(`/tasks/${id}`)
    return id
  }
}
