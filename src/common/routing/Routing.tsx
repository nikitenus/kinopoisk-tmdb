import { Route, Routes } from "react-router"
import { Path } from "./path"
import { MainPage } from "@/pages/MainPage/MainPage"
import { CategoryMovies } from "@/pages/CategoryMovies"
import { FilteredMovies } from "@/pages/FilteredMovies"
import { SearchPage } from "@/pages/SearchPage"
import { Favorites } from "@/pages/Favorites"
import { PageNotFound } from "@/pages/PageNotFound"
import { MovieInfo } from "@/features/movies/ui/MovieInfo/MovieInfo.tsx"

export const Routing = () => {
  return (
    <Routes>
      <Route
        path={Path.Main}
        element={<MainPage />}
      />
      <Route
        path={Path.CategoryMovies}
        element={<CategoryMovies />}
      />
      <Route
        path={Path.FilteredMovies}
        element={<FilteredMovies />}
      />
      <Route
        path={Path.Search}
        element={<SearchPage />}
      />
      <Route
        path={Path.Favorites}
        element={<Favorites />}
      />
      <Route
        path={Path.MovieInfo}
        element={<MovieInfo />}
      />
      <Route
        path={Path.PageNotFound}
        element={<PageNotFound />}
      />
    </Routes>
  )
}
