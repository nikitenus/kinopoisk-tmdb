import { useParams, Link, useLocation } from "react-router"
import {
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
} from "@/features/movies/api/moviesApi.ts"
import noPoster from "@/assets/noPoster.svg"
import { Path } from "@/common/routing/path.ts"
import { MovieItem } from "@/features/movies/ui/MovieItems/MovieItem/MovieItem.tsx"
import s from "./MovieInfo.module.css"
import { PageSkeleton } from "@/common/components/PageSkeleton/PageSkeleton.tsx"

const getReleaseYear = (releaseDate: string) => {
  if (!releaseDate) return "Unknown"
  return releaseDate.slice(0, 4)
}

export const MovieInfo = () => {
  const { id } = useParams()
  const location = useLocation()
  const movieId = Number(id)
  const backTo =
    typeof location.state === "object" &&
    location.state !== null &&
    "from" in location.state &&
    typeof (location.state as { from?: unknown }).from === "string"
      ? (location.state as { from: string }).from
      : Path.Main

  const { data, isLoading } = useGetMovieByIdQuery(movieId)
  const { data: credits } = useGetMovieCreditsQuery(movieId)
  const { data: similarMovies } = useGetSimilarMoviesQuery(movieId)

  if (isLoading) {
    return <PageSkeleton variant="details" />
  }

  const posterUrl = data?.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : noPoster
  const genres = data?.genres?.map((genre) => genre.name).join(", ") || "Unknown"
  const runtime = data?.runtime ? `${data.runtime} min` : "Unknown"
  const voteAverage = data?.vote_average
  const rating = typeof voteAverage === "number" ? voteAverage.toFixed(1) : "Unknown"
  const title = data?.title || "Movie"
  const year = getReleaseYear(data?.release_date || "")
  const overview = data?.overview || "No description available."
  const topCast = (credits?.cast ?? [])
    .slice()
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 6)
  const topSimilarMovies = (similarMovies?.results ?? []).slice(0, 6)

  return (
    <section className={s.container}>
      <Link
        to={backTo}
        className={s.backLink}
      >
        Back
      </Link>

      <div className={s.card}>
        <img
          className={s.poster}
          src={posterUrl}
          alt={title}
        />

        <div className={s.content}>
          <h1 className={s.title}>{title}</h1>
          <p className={s.meta}>
            <span className={s.metaLabel}>Year:</span> {year}
          </p>
          <p className={s.meta}>
            <span className={s.metaLabel}>Rating:</span> {rating}
          </p>
          <p className={s.meta}>
            <span className={s.metaLabel}>Genres:</span> {genres}
          </p>
          <p className={s.meta}>
            <span className={s.metaLabel}>Duration:</span> {runtime}
          </p>
          <div className={s.descriptionBlock}>
            <h2 className={s.descriptionTitle}>Description</h2>
            <p className={s.overview}>{overview}</p>
          </div>
        </div>
      </div>
      <div className={s.castSection}>
        <h2 className={s.descriptionTitle}>Cast</h2>
        <div className={s.castGrid}>
          {topCast.map((actor) => {
            const actorImage = actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : noPoster

            return (
              <article
                key={actor.credit_id}
                className={s.castItem}
              >
                <img
                  src={actorImage}
                  alt={actor.name}
                  className={s.castImage}
                />
                <div className={s.castInfo}>
                  <p className={s.castName}>{actor.name}</p>
                  <p className={s.castCharacter}>{actor.character}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      <div className={s.similarSection}>
        <h2 className={s.descriptionTitle}>Similar Movies</h2>
        <div className={s.similarMoviesContainer}>
          {topSimilarMovies.map((movie) => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
