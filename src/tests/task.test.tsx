import { configureStore } from "@reduxjs/toolkit"
import taskReducer, { createTask, deleteTask, fetchTasks, updateTask } from "../features/tasks/taskSlice"
import { taskApi } from "../api/taskApi"
import { render, screen, fireEvent } from "@testing-library/react"
import TaskForm from "../features/tasks/TaskForm"

jest.mock("../api/taskApi", () => ({
  taskApi: {
    fetchTasks: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn()
  }
}))

const mockedApi = taskApi as jest.Mocked<typeof taskApi>

describe("tasks", () => {
  it("fetch tasks", async () => {
    mockedApi.fetchTasks.mockResolvedValueOnce([
      { id: 1, title: "Test", description: "Desc", status: "pending" }
    ])
    const store = configureStore({ reducer: { tasks: taskReducer } })
    await store.dispatch(fetchTasks() as any)
    const state = store.getState().tasks
    expect(state.tasks).toHaveLength(1)
  })

  it("create task", async () => {
    mockedApi.createTask.mockResolvedValueOnce({
      id: 2,
      title: "New",
      description: "New desc",
      status: "pending"
    })
    const store = configureStore({ reducer: { tasks: taskReducer } })
    await store.dispatch(createTask({ title: "New", description: "New desc", status: "pending" }) as any)
    expect(store.getState().tasks.tasks).toHaveLength(1)
  })

  it("update task", async () => {
    mockedApi.updateTask.mockResolvedValueOnce({
      id: 1,
      title: "Updated",
      description: "Desc",
      status: "done"
    })
    const store = configureStore({ reducer: { tasks: taskReducer } })
    store.dispatch({
      type: "tasks/fetch/fulfilled",
      payload: [{ id: 1, title: "Old", description: "Desc", status: "pending" }]
    })
    await store.dispatch(
      updateTask({ id: 1, title: "Updated", description: "Desc", status: "done" }) as any
    )
    expect(store.getState().tasks.tasks[0].status).toBe("done")
  })

  it("delete task", async () => {
    mockedApi.deleteTask.mockResolvedValueOnce(1)
    const store = configureStore({ reducer: { tasks: taskReducer } })
    store.dispatch({
      type: "tasks/fetch/fulfilled",
      payload: [{ id: 1, title: "Old", description: "Desc", status: "pending" }]
    })
    await store.dispatch(deleteTask(1) as any)
    expect(store.getState().tasks.tasks).toHaveLength(0)
  })

  it("form validation", async () => {
    render(<TaskForm onSubmit={() => {}} />)
    fireEvent.click(screen.getByRole("button", { name: /create task/i }))
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument()
  })
})
