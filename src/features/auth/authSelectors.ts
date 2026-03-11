import { RootState } from "../../app/store"

export const selectAuth = (state: RootState) => state.auth
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectAuthError = (state: RootState) => state.auth.error
