import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { TaskStatus } from "../../api/taskApi"

export type TaskFormValues = {
  title: string
  description: string
  status: TaskStatus
}

type TaskFormProps = {
  initialValues?: TaskFormValues
  onSubmit: (values: TaskFormValues) => void
  onCancel?: () => void
  submitLabel?: string
}

const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required")
})

const defaultValues: TaskFormValues = {
  title: "",
  description: "",
  status: "pending"
}

export default function TaskForm({
  initialValues = defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Create Task"
}: TaskFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={(values, helpers) => {
        onSubmit(values)
        helpers.setSubmitting(false)
        if (initialValues === defaultValues) helpers.resetForm()
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="card grid gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Title</label>
            <Field name="title" className="input mt-1" placeholder="Task title" />
            {errors.title && touched.title ? (
              <p className="mt-1 text-xs text-rose-600">{errors.title}</p>
            ) : null}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Description</label>
            <Field
              as="textarea"
              name="description"
              className="input mt-1 min-h-[100px]"
              placeholder="Describe the task"
            />
            {errors.description && touched.description ? (
              <p className="mt-1 text-xs text-rose-600">{errors.description}</p>
            ) : null}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Status</label>
            <Field as="select" name="status" className="input mt-1">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </Field>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {submitLabel}
            </button>
            {onCancel ? (
              <button type="button" className="btn-outline" onClick={onCancel}>
                Cancel
              </button>
            ) : null}
          </div>
        </Form>
      )}
    </Formik>
  )
}
