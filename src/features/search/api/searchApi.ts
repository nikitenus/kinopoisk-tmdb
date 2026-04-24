import { baseApi } from "@/app/baseApi.ts"
import type { SearchMovieArgs, SearchMoviesResponse } from "@/features/movies/api/moviesApi.types.ts"

export const searchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchMovie: build.query<SearchMoviesResponse, SearchMovieArgs>({
      query: (params) => {
        return { url: "/search/movie", params }
      },
    }),
  }),
})

export const { useLazySearchMovieQuery } = searchApi
