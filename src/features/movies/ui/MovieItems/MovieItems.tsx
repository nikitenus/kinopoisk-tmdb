import type {FetchMoviesResponse} from "@/features/movies/api/moviesApi.types.ts"
import s from "./MovieItems.module.css"
import {MovieItem} from "@/features/movies/ui/MovieItems/MovieItem/MovieItem.tsx";

type Props = {
    data?: FetchMoviesResponse
    title: string
}

export const MovieItems = ({data, title}: Props) => {
    return (
        <div className={s.container}>
            <h2>{title}</h2>
            <div className={s.items}>
                {data?.results.slice(0, 6).map((movie) => {
                    return (
                        <MovieItem voteAverage={movie.vote_average} title={movie.title} posterPath={movie.poster_path} key={movie.id}/>
                    )
                })}
            </div>
        </div>
    )
}
