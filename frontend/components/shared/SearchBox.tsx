import {useState} from 'react'
import {useRouter} from 'next/router'
import Search from '@/svgs/Search'

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`shop?search=${encodeURIComponent(query)}`)
    }
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Search Box - Mobile */}
      <div className="searchBoxMobile md:hidden flex items-center z-[50] ">
        <span onClick={() => setIsOpen(!isOpen)}>
          <Search />
        </span>

        <div
          className={`absolute top-[127px] left-0 w-full ${isOpen ? 'pointer-events-auto' : 'pointer-events-none '} `}
        >
          <form onSubmit={handleSearch} className="w-full ">
            <input
              className={`transition-all duration-500 ease-in-out transform ${
                isOpen ? 'w-full opacity-100  ' : ' w-0 opacity-0'
              } px-2 py-2 outline-none border-2 border-transparent focus:border-secondary bg-gray-200 rounded-b`}
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* Search Box - Desktop */}
      <div
        className="searchBox md:flex items-center relative hidden"
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
    </>
  )
}
