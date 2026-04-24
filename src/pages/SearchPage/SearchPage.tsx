import { Search } from "@/features/search/ui/Search.tsx"
import s from "./SearchPage.module.css"
import { MovieItem } from "@/features/movies/ui/MovieItems/MovieItem/MovieItem.tsx"
import { useEffect } from "react"
import { useSearchParams } from "react-router"
import { useLazySearchMovieQuery } from "@/features/search/api/searchApi.ts"

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryFromUrl = searchParams.get("query")?.trim() ?? ""
  const [triggerSearchMovie, { data, isFetching, isError, isUninitialized }] = useLazySearchMovieQuery()

  useEffect(() => {
    if (!queryFromUrl) return
    triggerSearchMovie({ query: queryFromUrl })
  }, [queryFromUrl, triggerSearchMovie])

  return (
    <div className={s.searchPage}>
      <h2>Search results</h2>
      <Search
        initialQuery={queryFromUrl}
        onSearch={(query) => setSearchParams({ query })}
      />
      {}
      {isFetching && <p>Loading...</p>}
      {isError && <p>Failed to load search results.</p>}
      {!isFetching && !isError && (isUninitialized || !data?.results?.length) && (
        <p>Enter a movie title to start searching.</p>
      )}
      {data?.results?.length ? (
        <>
          <h3>{`Results for "${queryFromUrl}"`}</h3>
          <div className={s.movieItemsContainer}>
            {data.results.map((movie) => (
              <MovieItem
                key={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
              />
            ))}
          </div>
        </>
      ) : (
        <h3>{`No matches found for "${queryFromUrl}"`}</h3>
      )}
    </div>
  )
}
