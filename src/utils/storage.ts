export const storage = {
  getToken() {
    return localStorage.getItem("token")
  },
  setToken(token: string) {
    localStorage.setItem("token", token)
  },
  clearToken() {
    localStorage.removeItem("token")
  },
  getTasks() {
    const raw = localStorage.getItem("tasks")
    return raw ? JSON.parse(raw) : null
  },
  setTasks(tasks: unknown) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
}
