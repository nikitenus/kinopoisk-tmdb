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

export const MainPage = () => {
  const { data: popular } = useGetPopularMoviesQuery()
  const { data: topRated } = useGetTopRatedMoviesQuery()
  const { data: nowPlaying } = useGetNowPlayingMoviesQuery()
  const { data: upcoming } = useGetUpcomingMoviesQuery()
  const navigate = useNavigate()

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
