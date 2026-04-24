import s from "./MovieItem.module.css"
import noPoster from "@/assets/noPoster.svg"

type Props = {
  title: string
  posterPath: string | null
  voteAverage: number
}

const getRating = (rating: number) => {
  if (rating >= 7) return s.ratingHigh
  if (rating >= 5) return s.ratingMedium
  return s.ratingLow
}

export const MovieItem = ({ title, posterPath, voteAverage }: Props) => {
  const posterUrl = posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : noPoster

  return (
    <div className={s.movieContainer}>
      <div>
        <a
          href="#"
          className={s.posterLink}
        >
          <div className={s.posterFrame}>
            <div
              className={`${s.posterBg} ${!posterPath ? s.posterBgFallback : ""}`}
              style={{
                backgroundImage: `url("${posterUrl}")`,
              }}
            />
            <span className={`${s.rating} ${getRating(voteAverage)}`}>{voteAverage.toFixed(1)}</span>
          </div>
        </a>
      </div>
      <div>{title}</div>
    </div>
  )
}
