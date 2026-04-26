import type {
  DiscoverMoviesArgs,
  DiscoverMoviesResponse,
  FetchMoviesResponse,
  MovieGenresResponse,
  MovieCreditsResponse,
  MovieDetailsResponse,
  MoviesListArgs,
  NowPlayingResponse,
  SimilarMoviesResponse,
} from "@/features/movies/api/moviesApi.types.ts"
import {
  fetchMoviesResponseSchema,
  movieCreditsResponseSchema,
  movieDetailsResponseSchema,
  movieGenresResponseSchema,
  paginatedMoviesResponseSchema,
} from "@/features/movies/api/moviesApi.types.ts"
import { baseApi } from "@/app/baseApi.ts"

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNowPlayingMovies: build.query<NowPlayingResponse, MoviesListArgs | void>({
      query: (params) => ({ url: "movie/now_playing", params: params ?? undefined }),
      transformResponse: (response: unknown) => {
        const validatedResponse = fetchMoviesResponseSchema.parse(response)
        const withBackdrop = validatedResponse.results.filter((m) => m.backdrop_path)
        const backdropPath = withBackdrop.length
          ? withBackdrop[Math.floor(Math.random() * withBackdrop.length)].backdrop_path
          : null

        return { ...validatedResponse, backdropPath }
      },
    }),
    getPopularMovies: build.query<FetchMoviesResponse, MoviesListArgs | void>({
      query: (params) => ({ url: "movie/popular", params: params ?? undefined }),
      transformResponse: (response: unknown) => fetchMoviesResponseSchema.parse(response),
    }),
    getTopRatedMovies: build.query<FetchMoviesResponse, MoviesListArgs | void>({
      query: (params) => ({ url: "movie/top_rated", params: params ?? undefined }),
      transformResponse: (response: unknown) => fetchMoviesResponseSchema.parse(response),
    }),
    getUpcomingMovies: build.query<FetchMoviesResponse, MoviesListArgs | void>({
      query: (params) => ({ url: "movie/upcoming", params: params ?? undefined }),
      transformResponse: (response: unknown) => fetchMoviesResponseSchema.parse(response),
    }),
    getMovieById: build.query<MovieDetailsResponse, number>({
      query: (id) => ({ url: `movie/${id}` }),
      transformResponse: (response: unknown) => movieDetailsResponseSchema.parse(response),
    }),
    getMovieCredits: build.query<MovieCreditsResponse, number>({
      query: (id) => ({ url: `movie/${id}/credits` }),
      transformResponse: (response: unknown) => movieCreditsResponseSchema.parse(response),
    }),
    getSimilarMovies: build.query<SimilarMoviesResponse, number>({
      query: (id) => ({ url: `/movie/${id}/similar` }),
      transformResponse: (response: unknown) => paginatedMoviesResponseSchema.parse(response),
    }),
    discoverMovies: build.query<DiscoverMoviesResponse, DiscoverMoviesArgs | void>({
      query: (params) => ({ url: "/discover/movie", params: params ?? undefined }),
      transformResponse: (response: unknown) => paginatedMoviesResponseSchema.parse(response),
    }),
    getMovieGenres: build.query<MovieGenresResponse, void>({
      query: () => ({ url: "/genre/movie/list" }),
      transformResponse: (response: unknown) => movieGenresResponseSchema.parse(response),
    }),
  }),
})

export const {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
  useDiscoverMoviesQuery,
  useGetMovieGenresQuery,
} = moviesApi
