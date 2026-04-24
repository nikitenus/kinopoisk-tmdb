import type { FetchMoviesResponse, MoviesListArgs } from "@/features/movies/api/moviesApi.types.ts"
import { baseApi } from "@/app/baseApi.ts"

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNowPlayingMovies: build.query<FetchMoviesResponse, MoviesListArgs>({
      query: (params) => ({ url: "movie/now_playing", params }),
    }),
    getPopularMovies: build.query<FetchMoviesResponse, MoviesListArgs>({
      query: (params) => ({ url: "movie/popular", params }),
    }),
    getTopRatedMovies: build.query<FetchMoviesResponse, MoviesListArgs>({
      query: (params) => ({ url: "movie/top_rated", params }),
    }),
    getUpcomingMovies: build.query<FetchMoviesResponse, MoviesListArgs>({
      query: (params) => ({ url: "movie/upcoming", params }),
    }),
  }),
})

export const {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} = moviesApi
