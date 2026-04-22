import s from "./Search.module.css";
import {useState} from "react";
import {useLazySearchMovieQuery} from "@/features/movies/api/moviesApi.ts";

export const Search = () => {
    const [query, setQuery] = useState<string>("")
    const [triggerSearchMovie] = useLazySearchMovieQuery()

    const handleSearchClick = () => {
        const normalizedQuery = query.trim()
        if (!normalizedQuery) return
        triggerSearchMovie({query: normalizedQuery})
    }

    return (
        <div className={s.searchInner}>
            <input
                type="search"
                placeholder={"Search for a movie"}
                onChange={(e) => setQuery(e.currentTarget.value)}
            />
            <button onClick={handleSearchClick}>Search</button>
        </div>
    );
};
