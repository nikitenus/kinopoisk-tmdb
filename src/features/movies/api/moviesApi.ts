import type { FetchMoviesResponse, MoviesListArgs, NowPlayingResponse } from "@/features/movies/api/moviesApi.types.ts"
import { baseApi } from "@/app/baseApi.ts"

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNowPlayingMovies: build.query<NowPlayingResponse, MoviesListArgs | void>({
      query: (params) => ({ url: "movie/now_playing", params: params ?? undefined }),
      transformResponse: (response: FetchMoviesResponse) => {
        const withBackdrop = response.results.filter((m) => m.backdrop_path)
        const backdropPath = withBackdrop.length
          ? withBackdrop[Math.floor(Math.random() * withBackdrop.length)].backdrop_path
          : null

        return { ...response, backdropPath }
      },
    }),
    getPopularMovies: build.query<FetchMoviesResponse, MoviesListArgs | void>({
      query: (params) => ({ url: "movie/popular", params: params ?? undefined }),
    }),
    getTopRatedMovies: build.query<FetchMoviesResponse, MoviesListArgs | void>({
      query: (params) => ({ url: "movie/top_rated", params: params ?? undefined }),
    }),
    getUpcomingMovies: build.query<FetchMoviesResponse, MoviesListArgs | void>({
      query: (params) => ({ url: "movie/upcoming", params: params ?? undefined }),
    }),
  }),
})

export const {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} = moviesApi
