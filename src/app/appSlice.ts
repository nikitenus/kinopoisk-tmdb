import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatus,
    error: null as string | null,
  },
  selectors: {
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
  },
  reducers: (create) => ({
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { selectAppStatus, selectAppError } = appSlice.selectors
export const { setAppErrorAC } = appSlice.actions

export const appReducer = appSlice.reducer
