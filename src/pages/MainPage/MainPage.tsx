import { Path } from "@/common/routing/path.ts"
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "@/features/movies/api/moviesApi.ts"
import { MovieItems } from "@/features/movies/ui/MovieItems/MovieItems.tsx"
import { Search } from "@/features/search/ui/Search.tsx"
import { useNavigate } from "react-router"
import s from "./MainPage.module.css"
import { PageSkeleton } from "@/common/components/PageSkeleton/PageSkeleton.tsx"

export const MainPage = () => {
  const popularQuery = useGetPopularMoviesQuery()
  const topRatedQuery = useGetTopRatedMoviesQuery()
  const nowPlayingQuery = useGetNowPlayingMoviesQuery()
  const upcomingQuery = useGetUpcomingMoviesQuery()
  const navigate = useNavigate()
  const isLoading =
    popularQuery.isLoading || topRatedQuery.isLoading || nowPlayingQuery.isLoading || upcomingQuery.isLoading

  if (isLoading) {
    return <PageSkeleton withSearch />
  }

  const popular = popularQuery.data
  const topRated = topRatedQuery.data
  const nowPlaying = nowPlayingQuery.data
  const upcoming = upcomingQuery.data

  return (
    <>
      <div
        className={s.backdrop}
        style={{
          backgroundImage: nowPlaying?.backdropPath
            ? `url("https://image.tmdb.org/t/p/original${nowPlaying.backdropPath}")`
            : "none",
        }}
      >
        <div className={s.search}>
          <h1>Welcome</h1>
          <h2>Browse highlighted titles from TMDB</h2>
          <Search onSearch={(query) => navigate(`${Path.Search}?query=${encodeURIComponent(query)}`)} />
        </div>
      </div>
      <div className={s.container}>
        <MovieItems
          data={popular}
          title={"Popular Movies"}
          viewMoreTo={`${Path.CategoryMovies}?tab=popular&page=1`}
        />
        <MovieItems
          data={topRated}
          title={"Top rated Movies"}
          viewMoreTo={`${Path.CategoryMovies}?tab=top_rated&page=1`}
        />
        <MovieItems
          data={nowPlaying}
          title={"Now Playing Movies"}
          viewMoreTo={`${Path.CategoryMovies}?tab=now_playing&page=1`}
        />
        <MovieItems
          data={upcoming}
          title={"Upcoming Movies"}
          viewMoreTo={`${Path.CategoryMovies}?tab=upcoming&page=1`}
        />
      </div>
    </>
  )
}
