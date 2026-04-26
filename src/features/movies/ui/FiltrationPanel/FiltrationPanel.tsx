import Slider from "@mui/material/Slider"
import type { DiscoverSortBy, Genre } from "@/features/movies/api/moviesApi.types.ts"
import s from "./FiltrationPanel.module.css"

type SortOption = {
  value: DiscoverSortBy
  label: string
}

type Props = {
  sortBy: DiscoverSortBy
  sortOptions: SortOption[]
  ratingRange: [number, number]
  selectedGenres: number[]
  genres: Genre[]
  onSortChange: (sortBy: DiscoverSortBy) => void
  onRatingChange: (ratingRange: [number, number]) => void
  onGenreToggle: (genreId: number) => void
  onReset: () => void
}

export const FiltrationPanel = ({
  sortBy,
  sortOptions,
  ratingRange,
  selectedGenres,
  genres,
  onSortChange,
  onRatingChange,
  onGenreToggle,
  onReset,
}: Props) => {
  return (
    <aside className={s.filters}>
      <div className={s.filterBlock}>
        <h2 className={s.blockTitle}>Filters / Sort</h2>
        <select
          className={s.select}
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as DiscoverSortBy)}
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={s.filterBlock}>
        <h2 className={s.blockTitle}>Rating</h2>
        <Slider
          value={ratingRange}
          onChange={(_, value) => onRatingChange(value as [number, number])}
          min={0}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
        />
        <p className={s.ratingValue}>
          {ratingRange[0].toFixed(1)} - {ratingRange[1].toFixed(1)}
        </p>
      </div>

      <div className={s.filterBlock}>
        <h2 className={s.blockTitle}>Genres</h2>
        <div className={s.genreButtons}>
          {genres.map((genre) => {
            const isActive = selectedGenres.includes(genre.id)

            return (
              <button
                key={genre.id}
                type="button"
                className={isActive ? `${s.genreButton} ${s.genreButtonActive}` : s.genreButton}
                onClick={() => onGenreToggle(genre.id)}
              >
                {genre.name}
              </button>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        className={s.resetButton}
        onClick={onReset}
      >
        Reset filters
      </button>
    </aside>
  )
}
