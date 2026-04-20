import s from "./MainPage.module.css"
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "@/features/movies/api/moviesApi.ts"
import { MainPageMoviesItems } from "@/pages/MainPage/MainPageMoviesItems/MainPageMoviesItems.tsx"

export const MainPage = () => {
  const { data: popular } = useGetPopularMoviesQuery()
  const { data: topRated } = useGetTopRatedMoviesQuery()
  const { data: nowPlaying } = useGetNowPlayingMoviesQuery()
  const { data: upcoming } = useGetUpcomingMoviesQuery()

  return (
    <>
      <div
        className={s.backdrop}
        style={{
          backgroundImage: nowPlaying?.results[0].backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${nowPlaying?.results[0].backdrop_path})`
            : "none",
        }}
      >
        {nowPlaying?.results[0].backdrop_path}
      </div>
      <div className={s.container}>
        <MainPageMoviesItems
          data={popular}
          title={"Popular Movies"}
        />
        <MainPageMoviesItems
          data={topRated}
          title={"Top rated Movies"}
        />
        <MainPageMoviesItems
          data={nowPlaying}
          title={"Upcoming Movies"}
        />
        <MainPageMoviesItems
          data={upcoming}
          title={"Now Playing Movies"}
        />
      </div>
    </>
  )
}
