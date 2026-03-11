import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import ErrorMessage from "../components/ErrorMessage"
import { login } from "../features/auth/authSlice"
import { selectAuth, selectIsAuthenticated } from "../features/auth/authSelectors"

const schema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
})

export default function Login() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuth)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="mx-auto grid max-w-md gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600">Use test / test123 to log in.</p>
      </div>
      {auth.error ? <ErrorMessage message={auth.error} /> : null}
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={schema}
        onSubmit={values => {
          dispatch(login(values))
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="card grid gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Username</label>
              <Field name="username" className="input mt-1" placeholder="test" />
              {errors.username && touched.username ? (
                <p className="mt-1 text-xs text-rose-600">{errors.username}</p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Password</label>
              <Field type="password" name="password" className="input mt-1" placeholder="test123" />
              {errors.password && touched.password ? (
                <p className="mt-1 text-xs text-rose-600">{errors.password}</p>
              ) : null}
            </div>
            <button type="submit" className="btn-primary" disabled={isSubmitting || auth.loading}>
              {auth.loading ? "Signing in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
