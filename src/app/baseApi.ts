import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setAppErrorAC } from "@/app/appSlice.ts"

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
    return headers
  },
})

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result.error) {
      let error: string | null = null

      switch (result.error.status) {
        case "FETCH_ERROR":
          error = "Ошибка сети. Проверь подключение к интернету."
          break
        case 401:
          error = "Невалидный AUTH_TOKEN. Проверь VITE_ACCESS_TOKEN."
          break
        case 404:
          error = "Ошибка 404. Endpoint не найден."
          break
      }

      if (error) {
        api.dispatch(setAppErrorAC({ error }))
      }
    }

    return result
  },
  tagTypes: ["Movie", "Search"],
  endpoints: () => ({}),
})
