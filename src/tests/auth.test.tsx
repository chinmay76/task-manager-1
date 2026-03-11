import { configureStore } from "@reduxjs/toolkit"
import authReducer, { login, logout } from "../features/auth/authSlice"
import { apiClient } from "../api/axios"
import ProtectedRoute from "../components/ProtectedRoute"
import { Provider } from "react-redux"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { render, screen } from "@testing-library/react"

jest.mock("../api/axios", () => ({
  apiClient: {
    post: jest.fn()
  }
}))

const mockedApi = apiClient as jest.Mocked<typeof apiClient>

describe("auth", () => {
  it("login success", async () => {
    mockedApi.post.mockResolvedValueOnce({ data: { token: "fake-jwt-token" } })
    const store = configureStore({ reducer: { auth: authReducer } })
    await store.dispatch(login({ username: "test", password: "test123" }) as any)
    const state = store.getState().auth
    expect(state.isAuthenticated).toBe(true)
    expect(state.token).toBe("fake-jwt-token")
  })

  it("login failure", async () => {
    mockedApi.post.mockRejectedValueOnce(new Error("Invalid"))
    const store = configureStore({ reducer: { auth: authReducer } })
    await store.dispatch(login({ username: "bad", password: "bad" }) as any)
    const state = store.getState().auth
    expect(state.isAuthenticated).toBe(false)
    expect(state.error).toBe("Invalid credentials")
  })

  it("logout", () => {
    const store = configureStore({ reducer: { auth: authReducer } })
    store.dispatch(logout())
    const state = store.getState().auth
    expect(state.isAuthenticated).toBe(false)
    expect(state.token).toBe(null)
  })

  it("protected route", () => {
    const store = configureStore({ reducer: { auth: authReducer } })
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/dashboard"]}>
          <Routes>
            <Route path="/login" element={<div>Login</div>} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div>Dashboard</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument()
    expect(screen.getByText("Login")).toBeInTheDocument()
  })
})
