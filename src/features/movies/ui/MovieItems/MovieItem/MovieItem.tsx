import s from "./MovieItem.module.css"
import noPoster from "@/assets/noPoster.svg"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useEffect, useState, type MouseEvent } from "react"
import { FAVORITES_UPDATED_EVENT, isFavoriteMovie, toggleFavoriteMovie } from "@/common/utils/favoritesStorage.ts"

type Props = {
  id: number
  title: string
  posterPath: string | null
  voteAverage: number
}

const getRating = (rating: number) => {
  if (rating >= 7) return s.ratingHigh
  if (rating >= 5) return s.ratingMedium
  return s.ratingLow
}

export const MovieItem = ({ id, title, posterPath, voteAverage }: Props) => {
  const posterUrl = posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : noPoster
  const [isFavorite, setIsFavorite] = useState(() => isFavoriteMovie(id))

  useEffect(() => {
    setIsFavorite(isFavoriteMovie(id))
  }, [id])

  useEffect(() => {
    const handleFavoritesUpdate = () => setIsFavorite(isFavoriteMovie(id))
    window.addEventListener(FAVORITES_UPDATED_EVENT, handleFavoritesUpdate)
    return () => window.removeEventListener(FAVORITES_UPDATED_EVENT, handleFavoritesUpdate)
  }, [id])

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsFavorite(
      toggleFavoriteMovie({
        id,
        title,
        poster_path: posterPath,
        vote_average: voteAverage,
      }),
    )
  }

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
            <button
              type="button"
              className={`${s.favoriteButton} ${isFavorite ? s.favoriteButtonActive : ""}`}
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </button>
            <span className={`${s.rating} ${getRating(voteAverage)}`}>{voteAverage.toFixed(1)}</span>
          </div>
        </a>
      </div>
      <div>{title}</div>
    </div>
  )
}
