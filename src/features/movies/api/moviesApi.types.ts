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

export type SimilarMoviesResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type DiscoverSortBy =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "primary_release_date.desc"
  | "primary_release_date.asc"
  | "original_title.asc"
  | "original_title.desc"

export type DiscoverMoviesArgs = {
  page?: number
  sort_by?: DiscoverSortBy
  with_genres?: string
  "vote_average.gte"?: number
  "vote_average.lte"?: number
}

export type DiscoverMoviesResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type Genre = {
  id: number
  name: string
}

export type MovieGenresResponse = {
  genres: Genre[]
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

export type MoviesListArgs = {
  language?: string
  page?: number
  region?: string
}

export type NowPlayingResponse = FetchMoviesResponse & { backdropPath: string | null }

export type MovieDetailsResponse = {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genres: { id: number; name: string }[]
  runtime: number | null
}

type MovieCreditsPerson = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
}

export type MovieCastMember = MovieCreditsPerson & {
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export type MovieCrewMember = MovieCreditsPerson & {
  credit_id: string
  department: string
  job: string
}

export type MovieCreditsResponse = {
  id: number
  cast: MovieCastMember[]
  crew: MovieCrewMember[]
}
