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
    getMovieById: build.query<MovieDetailsResponse, number>({
      query: (id) => ({ url: `movie/${id}` }),
    }),
    getMovieCredits: build.query<MovieCreditsResponse, number>({
      query: (id) => ({ url: `movie/${id}/credits` }),
    }),
    getSimilarMovies: build.query<SimilarMoviesResponse, number>({
      query: (id) => ({ url: `/movie/${id}/similar` }),
    }),
    discoverMovies: build.query<DiscoverMoviesResponse, DiscoverMoviesArgs | void>({
      query: (params) => ({ url: "/discover/movie", params: params ?? undefined }),
    }),
    getMovieGenres: build.query<MovieGenresResponse, void>({
      query: () => ({ url: "/genre/movie/list" }),
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
