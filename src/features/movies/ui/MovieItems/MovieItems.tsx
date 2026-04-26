import type { FetchMoviesResponse } from "@/features/movies/api/moviesApi.types.ts"
import s from "./MovieItems.module.css"
import { MovieItem } from "@/features/movies/ui/MovieItems/MovieItem/MovieItem.tsx"
import { Link } from "react-router"

type Props = {
  data?: FetchMoviesResponse
  title: string
  viewMoreTo?: string
}

export const MovieItems = ({ data, title, viewMoreTo }: Props) => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2>{title}</h2>
        {viewMoreTo ? (
          <Link
            to={viewMoreTo}
            className={s.viewMore}
          >
            View More
          </Link>
        ) : null}
      </div>
      <div className={s.items}>
        {data?.results.slice(0, 6).map((movie) => {
          return (
            <MovieItem
              id={movie.id}
              voteAverage={movie.vote_average}
              title={movie.title}
              posterPath={movie.poster_path}
              key={movie.id}
            />
          )
        })}
      </div>
    </div>
  )
}
