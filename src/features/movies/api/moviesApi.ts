import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { FetchMoviesResponse } from "@/features/movies/api/moviesApi.types.ts"

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
      return headers
    },
  }),
  tagTypes: ["Movie"],
  endpoints: (build) => ({
    getNowPlayingMovies: build.query<FetchMoviesResponse, { language?: string; page?: number; region?: string } | void>(
      { query: () => "movie/now_playing" },
    ),
    getPopularMovies: build.query<FetchMoviesResponse, { language?: string; page?: number; region?: string } | void>({
      query: () => "movie/popular",
    }),
    getTopRatedMovies: build.query<FetchMoviesResponse, { language?: string; page?: number; region?: string } | void>({
      query: () => "movie/top_rated",
    }),
    getUpcomingMovies: build.query<FetchMoviesResponse, { language?: string; page?: number; region?: string } | void>({
      query: () => "movie/upcoming",
    }),
  }),
})

export const { useGetNowPlayingMoviesQuery, useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, useGetUpcomingMoviesQuery,  } = moviesApi
