import type { FavoriteMovie } from "@/common/types"

export const FAVORITES_STORAGE_KEY = "favorite-movies"
export const FAVORITES_UPDATED_EVENT = "favorites-updated"

const isBrowser = typeof window !== "undefined"

const parseFavorites = (value: string | null): FavoriteMovie[] => {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export const getFavoriteMovies = (): FavoriteMovie[] => {
  if (!isBrowser) return []
  return parseFavorites(localStorage.getItem(FAVORITES_STORAGE_KEY))
}

const saveFavorites = (favorites: FavoriteMovie[]) => {
  if (!isBrowser) return
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
  window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT))
}

export const isFavoriteMovie = (movieId: number) => {
  return getFavoriteMovies().some((movie) => movie.id === movieId)
}

export const toggleFavoriteMovie = (movie: FavoriteMovie) => {
  const favorites = getFavoriteMovies()
  const isFavorite = favorites.some((favoriteMovie) => favoriteMovie.id === movie.id)

  if (isFavorite) {
    saveFavorites(favorites.filter((favoriteMovie) => favoriteMovie.id !== movie.id))
    return false
  }

  saveFavorites([movie, ...favorites])
  return true
}
