import s from "./MainPage.module.css"
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
} from "@/features/movies/api/moviesApi.ts"
import {MovieItems} from "@/features/movies/ui/MovieItems/MovieItems.tsx"
import {Search} from "@/features/search/ui/Search.tsx";
import {useNavigate} from "react-router";
import {Path} from "@/common/routing/path.ts";

export const MainPage = () => {
    const {data: popular} = useGetPopularMoviesQuery()
    const {data: topRated} = useGetTopRatedMoviesQuery()
    const {data: nowPlaying} = useGetNowPlayingMoviesQuery()
    const {data: upcoming} = useGetUpcomingMoviesQuery()
    const navigate = useNavigate()

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
                    <Search onSearch={(query) => navigate(`${Path.Search}?query=${encodeURIComponent(query)}`)}/>
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
