import { z } from "zod"

export const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

export type Movie = z.infer<typeof movieSchema>

export const paginatedMoviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
})

export const fetchMoviesResponseSchema = paginatedMoviesResponseSchema.extend({
  dates: z
    .object({
      maximum: z.string(),
      minimum: z.string(),
    })
    .optional(),
})

export type FetchMoviesResponse = z.infer<typeof fetchMoviesResponseSchema>
export type SearchMoviesResponse = z.infer<typeof paginatedMoviesResponseSchema>
export type SimilarMoviesResponse = z.infer<typeof paginatedMoviesResponseSchema>
export type DiscoverMoviesResponse = z.infer<typeof paginatedMoviesResponseSchema>

export const discoverSortBySchema = z.enum([
  "popularity.desc",
  "popularity.asc",
  "vote_average.desc",
  "vote_average.asc",
  "primary_release_date.desc",
  "primary_release_date.asc",
  "original_title.asc",
  "original_title.desc",
])

export type DiscoverSortBy = z.infer<typeof discoverSortBySchema>

export type DiscoverMoviesArgs = {
  page?: number
  sort_by?: DiscoverSortBy
  with_genres?: string
  "vote_average.gte"?: number
  "vote_average.lte"?: number
}

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type Genre = z.infer<typeof genreSchema>

export const movieGenresResponseSchema = z.object({
  genres: z.array(genreSchema),
})

export type MovieGenresResponse = z.infer<typeof movieGenresResponseSchema>

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

export const movieDetailsResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
  genres: z.array(genreSchema),
  runtime: z.number().nullable(),
})

export type MovieDetailsResponse = z.infer<typeof movieDetailsResponseSchema>

export const movieCreditsPersonSchema = z.object({
  adult: z.boolean(),
  gender: z.number().nullable(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
})

export const movieCastMemberSchema = movieCreditsPersonSchema.extend({
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
})

export const movieCrewMemberSchema = movieCreditsPersonSchema.extend({
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
})

export const movieCreditsResponseSchema = z.object({
  id: z.number(),
  cast: z.array(movieCastMemberSchema),
  crew: z.array(movieCrewMemberSchema),
})

export type MovieCastMember = z.infer<typeof movieCastMemberSchema>
export type MovieCrewMember = z.infer<typeof movieCrewMemberSchema>
export type MovieCreditsResponse = z.infer<typeof movieCreditsResponseSchema>
