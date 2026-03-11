import { Task } from "../../api/taskApi"

type TaskCardProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="card flex flex-col gap-3">
      <div>
        <h3 className="text-base font-semibold text-slate-900">{task.title}</h3>
        <p className="mt-1 text-sm text-slate-600">{task.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {task.status}
        </span>
        <div className="flex gap-2">
          <button className="btn-outline" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="btn-outline" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
