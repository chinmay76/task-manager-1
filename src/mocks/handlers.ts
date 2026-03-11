import { http, HttpResponse } from "msw"

let tasks = [
  {
    id: 1,
    title: "Learn React",
    description: "Practice hooks",
    status: "pending"
  }
]

export const handlers = [
  http.post("/login", async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string
      password: string
    }

    if (username === "test" && password === "test123") {
      return HttpResponse.json({ token: "fake-jwt-token" }, { status: 200 })
    }

    return new HttpResponse(null, { status: 401 })
  }),

  http.get("/tasks", () => {
    return HttpResponse.json(tasks, { status: 200 })
  }),

  http.post("/tasks", async ({ request }) => {
    const newTask = (await request.json()) as {
      title: string
      description: string
      status: string
    }

    const created = {
      ...newTask,
      id: Date.now()
    }

    tasks.push(created)

    return HttpResponse.json(created, { status: 201 })
  }),

  http.put("/tasks/:id", async ({ params, request }) => {
    const { id } = params
    const updated = (await request.json()) as Record<string, unknown>

    tasks = tasks.map(task => (task.id === Number(id) ? { ...task, ...updated } : task))

    return HttpResponse.json(updated, { status: 200 })
  }),

  http.delete("/tasks/:id", ({ params }) => {
    const { id } = params
    tasks = tasks.filter(task => task.id !== Number(id))
    return new HttpResponse(null, { status: 200 })
  })
]
