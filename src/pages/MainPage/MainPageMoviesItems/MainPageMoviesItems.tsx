import type { FetchMoviesResponse } from "@/features/movies/api/moviesApi.types.ts"
import s from "@/pages/MainPage/MainPage.module.css"

type Props = {
  data?: FetchMoviesResponse
  title: string
}

export const MainPageMoviesItems = ({ data, title }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className={s.items}>
        {data?.results.slice(0, 6).map((movie) => {
          return (
            <div key={movie.id}>
              <div>
                poster:
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt="poster"
                  className={s.poster}
                />
              </div>
              <div>title: {movie.title}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
