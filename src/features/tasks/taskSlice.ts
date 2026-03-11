import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { taskApi, Task } from "../../api/taskApi"
import { storage } from "../../utils/storage"

export type TaskState = {
  tasks: Task[]
  loading: boolean
  error: string | null
}

const initialTasks = storage.getTasks() as Task[] | null

const initialState: TaskState = {
  tasks: initialTasks ?? [],
  loading: false,
  error: null
}

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  return taskApi.fetchTasks()
})

export const createTask = createAsyncThunk(
  "tasks/create",
  async (payload: Omit<Task, "id">) => {
    return taskApi.createTask(payload)
  }
)

export const updateTask = createAsyncThunk("tasks/update", async (payload: Task) => {
  return taskApi.updateTask(payload)
})

export const deleteTask = createAsyncThunk("tasks/delete", async (id: number) => {
  return taskApi.deleteTask(id)
})

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
      storage.setTasks(state.tasks)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false
        state.tasks = action.payload
        storage.setTasks(state.tasks)
      })
      .addCase(fetchTasks.rejected, state => {
        state.loading = false
        state.error = "Failed to fetch tasks"
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload)
        storage.setTasks(state.tasks)
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id)
        if (index >= 0) state.tasks[index] = action.payload
        storage.setTasks(state.tasks)
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter(t => t.id !== action.payload)
        storage.setTasks(state.tasks)
      })
  }
})

export const { setTasks } = taskSlice.actions
export default taskSlice.reducer
