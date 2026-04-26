import { useEffect, useState } from "react"
import type { DiscoverSortBy } from "@/features/movies/api/moviesApi.types.ts"
import { useDiscoverMoviesQuery, useGetMovieGenresQuery } from "@/features/movies/api/moviesApi.ts"
import { MovieItem } from "@/features/movies/ui/MovieItems/MovieItem/MovieItem.tsx"
import { Pagination } from "@/common/components/Pagination/Pagination.tsx"
import s from "./FilteredMovies.module.css"
import { FiltrationPanel } from "@/features/movies/ui/FiltrationPanel/FiltrationPanel.tsx"

const defaultSortBy: DiscoverSortBy = "popularity.desc"
const defaultRatingRange: [number, number] = [0, 10]

const sortOptions: { value: DiscoverSortBy; label: string }[] = [
  { value: "popularity.desc", label: "Popularity ↓" },
  { value: "popularity.asc", label: "Popularity ↑" },
  { value: "vote_average.desc", label: "Rating ↓" },
  { value: "vote_average.asc", label: "Rating ↑" },
  { value: "primary_release_date.desc", label: "Release date ↓" },
  { value: "primary_release_date.asc", label: "Release date ↑" },
  { value: "original_title.asc", label: "Title A -> Z" },
  { value: "original_title.desc", label: "Title Z -> A" },
]

export const FilteredMovies = () => {
  const [sortBy, setSortBy] = useState<DiscoverSortBy>(defaultSortBy)
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [ratingRange, setRatingRange] = useState<[number, number]>(defaultRatingRange)
  const [debouncedRatingRange, setDebouncedRatingRange] = useState<[number, number]>(defaultRatingRange)
  const [currentPage, setCurrentPage] = useState(1)

  const { data: genresData } = useGetMovieGenresQuery()

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedRatingRange(ratingRange)
      setCurrentPage(1)
    }, 200)

    return () => window.clearTimeout(timeoutId)
  }, [ratingRange])

  const { data, isFetching, isError } = useDiscoverMoviesQuery({
    page: currentPage,
    sort_by: sortBy,
    with_genres: selectedGenres.join(",") || undefined,
    "vote_average.gte": debouncedRatingRange[0],
    "vote_average.lte": debouncedRatingRange[1],
  })

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) => (prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]))
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setSortBy(defaultSortBy)
    setSelectedGenres([])
    setRatingRange(defaultRatingRange)
    setDebouncedRatingRange(defaultRatingRange)
    setCurrentPage(1)
  }

  return (
    <section className={s.page}>
      <FiltrationPanel
        sortBy={sortBy}
        sortOptions={sortOptions}
        ratingRange={ratingRange}
        selectedGenres={selectedGenres}
        genres={genresData?.genres ?? []}
        onSortChange={(value: DiscoverSortBy) => {
          setSortBy(value)
          setCurrentPage(1)
        }}
        onRatingChange={setRatingRange}
        onGenreToggle={toggleGenre}
        onReset={resetFilters}
      />

      <div className={s.results}>
        <div className={s.resultsHeader}>
          <h1 className={s.pageTitle}>Filtered Movies</h1>
          <p className={s.resultsCount}>{data?.total_results ?? 0} results</p>
        </div>

        {isFetching && <p>Loading movies...</p>}
        {isError && <p>Failed to load movies.</p>}

        {!isFetching && !isError && (
          <>
            <div className={s.moviesGrid}>
              {data?.results.map((movie) => (
                <MovieItem
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  voteAverage={movie.vote_average}
                />
              ))}
            </div>

            {!data?.results.length && <p>No movies found for the selected filters.</p>}

            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pagesCount={data?.total_pages || 1}
            />
          </>
        )}
      </div>
    </section>
  )
}
