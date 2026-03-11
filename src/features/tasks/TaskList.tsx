import { Task } from "../../api/taskApi"
import TaskCard from "./TaskCard"

type TaskListProps = {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <div className="grid gap-4">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
