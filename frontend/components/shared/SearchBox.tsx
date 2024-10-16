import Search from '@/svgs/Search'
import {useRouter} from 'next/router'
import {useState} from 'react'

export default function SearchBox() {
  const [isFocused, setIsFocused] = useState(true)
  const [query, setQuery] = useState('')

  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`shop?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div
      className="searchBox flex items-center"
      //   onMouseEnter={() => setIsFocused(true)}
      //   onMouseLeave={() => setIsFocused(false)}
    >
      <span className="pr-4">
        <Search />
      </span>
      {/* Optionally, you can render something different based on the focus state */}
      {isFocused && (
        <form onSubmit={handleSearch}>
          <input
            className=" px-2 py-1 focus:outline-none focus:ring-2 focus:border-primary"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      )}
    </div>
  )
}
