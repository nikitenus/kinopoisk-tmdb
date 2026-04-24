import type { FetchMoviesResponse } from "@/features/movies/api/moviesApi.types.ts"
import { baseApi } from "@/app/baseApi.ts"

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNowPlayingMovies: build.query<
      FetchMoviesResponse,
      {
        language?: string
        page?: number
        region?: string
      } | void
    >({ query: () => "movie/now_playing" }),
    getPopularMovies: build.query<
      FetchMoviesResponse,
      {
        language?: string
        page?: number
        region?: string
      } | void
    >({
      query: () => "movie/popular",
    }),
    getTopRatedMovies: build.query<
      FetchMoviesResponse,
      {
        language?: string
        page?: number
        region?: string
      } | void
    >({
      query: () => "movie/top_rated",
    }),
    getUpcomingMovies: build.query<
      FetchMoviesResponse,
      {
        language?: string
        page?: number
        region?: string
      } | void
    >({
      query: () => "movie/upcoming",
    }),
  }),
})

export const {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} = moviesApi
