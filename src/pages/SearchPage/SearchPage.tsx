import { Search } from "@/features/search/ui/Search.tsx"
import s from "./SearchPage.module.css"
import { useLazySearchMovieQuery } from "@/features/movies/api/moviesApi.ts"
import { MovieItem } from "@/features/movies/ui/MovieItems/MovieItem/MovieItem.tsx"
import {useEffect} from "react";
import {useSearchParams} from "react-router";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryFromUrl = searchParams.get("query")?.trim() ?? ""
  const [triggerSearchMovie, { data, isFetching, isError, isUninitialized }] = useLazySearchMovieQuery()

  useEffect(() => {
    if (!queryFromUrl) return
    triggerSearchMovie({query: queryFromUrl})
  }, [queryFromUrl, triggerSearchMovie])

  return (
    <div className={s.searchPage}>
      <h2>Search Results</h2>
      <Search
        initialQuery={queryFromUrl}
        onSearch={(query) => setSearchParams({query})}
      />
      {isFetching && <p>Loading...</p>}
      {isError && <p>Failed to load search results.</p>}
      {!isFetching && !isError && (isUninitialized || !data?.results?.length) && <p>Enter a movie title to start searching.</p>}
      {data?.results?.length && (
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
      )}
    </div>
  )
}
