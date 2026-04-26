import s from "./CategoryMovies.module.css"
import { useSearchParams } from "react-router"
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "@/features/movies/api/moviesApi.ts"
import { MovieItem } from "@/features/movies/ui/MovieItems/MovieItem/MovieItem.tsx"
import { Pagination } from "@/common/components/Pagination/Pagination.tsx"
import { PageSkeleton } from "@/common/components/PageSkeleton/PageSkeleton.tsx"

const categoryTabs = [
  { key: "popular", label: "Popular" },
  { key: "top_rated", label: "Top Rated" },
  { key: "upcoming", label: "Upcoming" },
  { key: "now_playing", label: "Now Playing" },
] as const

type CategoryTab = (typeof categoryTabs)[number]["key"]

const categoryTitles: Record<CategoryTab, string> = {
  popular: "Popular Movies",
  top_rated: "Top Rated Movies",
  upcoming: "Upcoming Movies",
  now_playing: "Now Playing Movies",
}

const isCategoryTab = (value: string | null): value is CategoryTab => categoryTabs.some((tab) => tab.key === value)

export const CategoryMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromUrl = searchParams.get("tab")
  const currentTab: CategoryTab = isCategoryTab(tabFromUrl) ? tabFromUrl : "popular"

  const pageFromUrl = Number(searchParams.get("page"))
  const currentPage = Number.isInteger(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1

  const popular = useGetPopularMoviesQuery({ page: currentPage }, { skip: currentTab !== "popular" })
  const topRated = useGetTopRatedMoviesQuery({ page: currentPage }, { skip: currentTab !== "top_rated" })
  const upcoming = useGetUpcomingMoviesQuery({ page: currentPage }, { skip: currentTab !== "upcoming" })
  const nowPlaying = useGetNowPlayingMoviesQuery({ page: currentPage }, { skip: currentTab !== "now_playing" })

  const activeQuery = {
    popular,
    top_rated: topRated,
    upcoming,
    now_playing: nowPlaying,
  }[currentTab]

  if (activeQuery.isLoading) {
    return <PageSkeleton />
  }

  const handleTabChange = (tab: CategoryTab) => {
    setSearchParams({ tab, page: "1" })
  }

  const handlePageChange = (page: number) => {
    setSearchParams({ tab: currentTab, page: String(page) })
  }

  return (
    <div className={s.container}>
      <h2>Categories</h2>

      <nav className={s.menu}>
        {categoryTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={currentTab === tab.key ? `${s.menuButton} ${s.menuButtonActive}` : s.menuButton}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeQuery.isFetching && <p>Loading...</p>}
      {activeQuery.isError && <p>Failed to load movies.</p>}

      {!activeQuery.isFetching && !activeQuery.isError && activeQuery.data?.results?.length ? (
        <>
          <h3>{categoryTitles[currentTab]}</h3>
          <div className={s.items}>
            {activeQuery.data.results.map((movie) => (
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
      ) : null}

      {!activeQuery.isFetching && !activeQuery.isError && !activeQuery.data?.results?.length && (
        <h3>No movies found.</h3>
      )}

      <Pagination
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        pagesCount={activeQuery.data?.total_pages || 1}
      />
    </div>
  )
}
