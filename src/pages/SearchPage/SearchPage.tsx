import { Search } from "@/features/search/ui/Search.tsx"
import s from "./SearchPage.module.css"
import { MovieItem } from "@/features/movies/ui/MovieItems/MovieItem/MovieItem.tsx"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { useLazySearchMovieQuery } from "@/features/search/api/searchApi.ts"
import { Pagination } from "@/common/components/Pagination/Pagination.tsx"
import { PageSkeleton } from "@/common/components/PageSkeleton/PageSkeleton.tsx"

export const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const queryFromUrl = searchParams.get("query")?.trim() ?? ""
  const [triggerSearchMovie, { data, isFetching, isLoading, isError, isUninitialized }] = useLazySearchMovieQuery()

  useEffect(() => {
    if (!queryFromUrl) return
    triggerSearchMovie({ query: queryFromUrl, page: currentPage })
  }, [queryFromUrl, triggerSearchMovie, currentPage])

  const onSearchHandler = (query: string) => {
    setCurrentPage(1)
    setSearchParams({ query })
  }

  if (queryFromUrl && isLoading) {
    return <PageSkeleton withSearch />
  }

  return (
    <div className={s.searchPage}>
      <h2>Search results</h2>
      <Search
        initialQuery={queryFromUrl}
        onSearch={onSearchHandler}
      />
      {isFetching && <p>Loading...</p>}
      {isError && <p>Failed to load search results.</p>}
      {!isFetching && !isError && isUninitialized && (
        <p>Enter a movie title to start searching.</p>
      )}
      {data?.results?.length ? (
        <>
          <h3>{`Results for "${queryFromUrl}"`}</h3>
          <div className={s.movieItemsContainer}>
            {data.results.map((movie) => (
              <MovieItem
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
              />
            ))}
          </div>
        </>
      ) : queryFromUrl && !isUninitialized && !isFetching && !isError ? (
        <h3>{`No matches found for "${queryFromUrl}"`}</h3>
      ) : null
      }
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.total_pages || 1}
      />
    </div>
  )
}
