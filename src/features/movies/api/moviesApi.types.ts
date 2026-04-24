import type { Movie } from "@/common/types"

export type FetchMoviesResponse = {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type SearchMoviesResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type SearchMovieArgs = {
  query: string
  include_adult?: boolean
  language?: string
  primary_release_year?: string
  page?: number
  region?: string
  year?: string
}

export type MoviesListArgs =
  | {
      language?: string
      page?: number
      region?: string
    }
  | undefined
