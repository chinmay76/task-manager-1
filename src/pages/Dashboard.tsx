import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Loader from "../components/Loader"
import EmptyState from "../components/EmptyState"
import TaskForm, { TaskFormValues } from "../features/tasks/TaskForm"
import TaskList from "../features/tasks/TaskList"
import { createTask, deleteTask, fetchTasks, updateTask } from "../features/tasks/taskSlice"
import { Task } from "../api/taskApi"

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { tasks, loading, error } = useAppSelector(state => state.tasks)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const formValues = useMemo<TaskFormValues>(() => {
    if (!editingTask) return undefined
    return {
      title: editingTask.title,
      description: editingTask.description,
      status: editingTask.status
    }
  }, [editingTask])

  const handleSubmit = (values: TaskFormValues) => {
    if (editingTask) {
      dispatch(updateTask({ ...editingTask, ...values }))
      setEditingTask(null)
      return
    }
    dispatch(createTask(values))
  }

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id))
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">Create, track, and complete tasks.</p>
        </div>
      </div>

      <TaskForm
        initialValues={formValues}
        onSubmit={handleSubmit}
        onCancel={editingTask ? () => setEditingTask(null) : undefined}
        submitLabel={editingTask ? "Update Task" : "Create Task"}
      />

      {loading ? <Loader /> : null}
      {error ? <EmptyState title="Something went wrong" description={error} /> : null}

      {!loading && tasks.length === 0 ? (
        <EmptyState title="No tasks yet" description="Create your first task to get started." />
      ) : (
        <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
      )}
    </div>
  )
}
