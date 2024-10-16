import {useState} from 'react'
import {useRouter} from 'next/router'
import Search from '@/svgs/Search'

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`shop?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div
      className="searchBox flex items-center relative"
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      <span className="pr-4">
        <Search />
      </span>
      <form onSubmit={handleSearch} className="relative">
        <input
          className={`transition-all duration-500 ease-in-out transform ${
            isHovered ? 'w-44 opacity-100 mr-4' : 'w-0 opacity-0'
          } px-2 py-1 outline-none border-2 border-transparent focus:border-primary bg-gray-200 rounded`}
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  )
}
