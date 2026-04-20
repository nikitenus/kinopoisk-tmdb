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
