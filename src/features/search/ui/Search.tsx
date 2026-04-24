import s from "./Search.module.css"
import { useEffect, useState } from "react"

type Props = {
  onSearch: (query: string) => void
  initialQuery?: string
}

export const Search = ({ onSearch, initialQuery = "" }: Props) => {
  const [query, setQuery] = useState<string>(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSearchClick = () => {
    const normalizedQuery = query.trim()
    if (!normalizedQuery) return
    onSearch(normalizedQuery)
    setQuery("")
  }

  return (
    <div className={s.searchInner}>
      <input
        type="search"
        placeholder={"Search for a movie"}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <button
        disabled={!query.trim()}
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  )
}
