import { useEffect, useState } from "react"
import s from "./Favorites.module.css"
import type { FavoriteMovie } from "@/common/types"
import { FAVORITES_UPDATED_EVENT, getFavoriteMovies } from "@/common/utils/favoritesStorage.ts"
import { MovieItem } from "@/features/movies/ui/MovieItems/MovieItem/MovieItem.tsx"

export const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])

  useEffect(() => {
    const syncFavorites = () => {
      setFavorites(getFavoriteMovies())
    }

    syncFavorites()
    window.addEventListener("storage", syncFavorites)
    window.addEventListener(FAVORITES_UPDATED_EVENT, syncFavorites)

    return () => {
      window.removeEventListener("storage", syncFavorites)
      window.removeEventListener(FAVORITES_UPDATED_EVENT, syncFavorites)
    }
  }, [])

  return (
    <div className={s.container}>
      <h2>Favorites</h2>
      {!favorites.length ? (
        <p>You don&apos;t have favorite movies yet.</p>
      ) : (
        <div className={s.items}>
          {favorites.map((movie) => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
            />
          ))}
        </div>
      )}
    </div>
  )
}
