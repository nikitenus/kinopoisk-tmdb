import s from "./MainPage.module.css"
import { useGetNowPlayingMoviesQuery } from "@/features/movies/api/moviesApi.ts"
import { MainPageMoviesItems } from "@/pages/MainPage/MainPageMoviesItems/MainPageMoviesItems.tsx"

export const MainPage = () => {
  const { data: nowPlaying } = useGetNowPlayingMoviesQuery()

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
        <h1>Main page</h1>
        <MainPageMoviesItems
          data={nowPlaying}
          title={"now playing"}
        />
        <MainPageMoviesItems
          data={nowPlaying}
          title={"now playing"}
        />
      </div>
    </>
  )
}
