import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { apiClient } from "../../api/axios"
import { storage } from "../../utils/storage"

export type AuthState = {
  isAuthenticated: boolean
  token: string | null
  loading: boolean
  error: string | null
}

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/login", payload)
      return res.data as { token: string }
    } catch (err) {
      return rejectWithValue("Invalid credentials")
    }
  }
)

const initialToken = storage.getToken()

const initialState: AuthState = {
  isAuthenticated: Boolean(initialToken),
  token: initialToken,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false
      state.token = null
      state.error = null
      storage.clearToken()
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
        state.loading = false
        state.isAuthenticated = true
        state.token = action.payload.token
        storage.setToken(action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Login failed"
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
