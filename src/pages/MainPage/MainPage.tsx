import s from "./MainPage.module.css"
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
    useLazySearchMovieQuery,
} from "@/features/movies/api/moviesApi.ts"
import {MainPageMoviesItems} from "@/pages/MainPage/MainPageMoviesItems/MainPageMoviesItems.tsx"
import {useState} from "react";

export const MainPage = () => {
    const [query, setQuery] = useState<string>("")

    const {data: popular} = useGetPopularMoviesQuery()
    const {data: topRated} = useGetTopRatedMoviesQuery()
    const {data: nowPlaying} = useGetNowPlayingMoviesQuery()
    const {data: upcoming} = useGetUpcomingMoviesQuery()
    const [triggerSearchMovie] = useLazySearchMovieQuery()

    const handleSearchClick = () => {
        const normalizedQuery = query.trim()
        if (!normalizedQuery) return
        triggerSearchMovie({query: normalizedQuery})
    }

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
                    <div className={s.searchInner}>
                        <input
                            type="search"
                            placeholder={"Search for a movie"}
                            onChange={(e) => setQuery(e.currentTarget.value)}
                        />
                        <button onClick={handleSearchClick}>Search</button>
                    </div>
                </div>
            </div>
            <div className={s.container}>
                <MainPageMoviesItems
                    data={popular}
                    title={"Popular Movies"}
                />
                <MainPageMoviesItems
                    data={topRated}
                    title={"Top rated Movies"}
                />
                <MainPageMoviesItems
                    data={nowPlaying}
                    title={"Upcoming Movies"}
                />
                <MainPageMoviesItems
                    data={upcoming}
                    title={"Now Playing Movies"}
                />
            </div>
        </>
    )
}
