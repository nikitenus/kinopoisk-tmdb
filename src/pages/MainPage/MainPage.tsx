import s from "./MainPage.module.css"
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
} from "@/features/movies/api/moviesApi.ts"
import {MovieItems} from "@/features/movies/ui/MovieItems/MovieItems.tsx"
import {Search} from "@/features/movies/ui/Search/Search.tsx";

export const MainPage = () => {
    const {data: popular} = useGetPopularMoviesQuery()
    const {data: topRated} = useGetTopRatedMoviesQuery()
    const {data: nowPlaying} = useGetNowPlayingMoviesQuery()
    const {data: upcoming} = useGetUpcomingMoviesQuery()

    return (
        <>
            <div
                className={s.backdrop}
                style={{
                    backgroundImage: nowPlaying?.results[0]?.backdrop_path
                        ? `url("https://image.tmdb.org/t/p/original${nowPlaying?.results[0]?.backdrop_path})`
                        : "none",
                }}
            >
                <div className={s.search}>
                    <h1>Welcome</h1>
                    <h2>Browse highlighted titles from TMDB</h2>
                    <Search/>
                </div>
            </div>
            <div className={s.container}>
                <MovieItems
                    data={popular}
                    title={"Popular Movies"}
                />
                <MovieItems
                    data={topRated}
                    title={"Top rated Movies"}
                />
                <MovieItems
                    data={nowPlaying}
                    title={"Upcoming Movies"}
                />
                <MovieItems
                    data={upcoming}
                    title={"Now Playing Movies"}
                />
            </div>
        </>
    )
}
