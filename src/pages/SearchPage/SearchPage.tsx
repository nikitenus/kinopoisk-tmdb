import {Search} from "@/features/search/ui/Search.tsx";
import s from './SearchPage.module.css'

export const SearchPage = () => {
    return (
        <div className={s.searchPage}>
            <h2>Search Results</h2>
            <Search/>
            <p>Enter a movie title to start searching.</p>
        </div>
    );
};
