import { Route, Routes } from "react-router"
import { Path } from "./path"
import { MainPage } from "@/pages/MainPage/MainPage"
import { CategoryMovies } from "@/pages/CategoryMovies"
import { FilteredMovies } from "@/pages/FilteredMovies"
import { Search } from "@/pages/Search"
import { Favorites } from "@/pages/Favorites"
import { PageNotFound } from "@/pages/PageNotFound"

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
        element={<Search />}
      />
      <Route
        path={Path.Favorites}
        element={<Favorites />}
      />
      <Route
        path={Path.PageNotFound}
        element={<PageNotFound />}
      />
    </Routes>
  )
}
