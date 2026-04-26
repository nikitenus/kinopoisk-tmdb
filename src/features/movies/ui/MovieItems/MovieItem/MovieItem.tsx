import s from "./MovieItem.module.css"
import noPoster from "@/assets/noPoster.svg"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useEffect, useState, type MouseEvent } from "react"
import { FAVORITES_UPDATED_EVENT, isFavoriteMovie, toggleFavoriteMovie } from "@/common/utils/favoritesStorage.ts"
import { Link, useLocation } from "react-router"
import { Path } from "@/common/routing/path.ts"

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
  const location = useLocation()
  const from = `${location.pathname}${location.search}${location.hash}`

  useEffect(() => {
    const syncFavorite = () => setIsFavorite(isFavoriteMovie(id))
    syncFavorite()
    window.addEventListener(FAVORITES_UPDATED_EVENT, syncFavorite)
    return () => window.removeEventListener(FAVORITES_UPDATED_EVENT, syncFavorite)
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
        <Link
          to={Path.MovieInfo.replace(":id", String(id))}
          state={{ from }}
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
        </Link>
      </div>
      <div>{title}</div>
    </div>
  )
}
