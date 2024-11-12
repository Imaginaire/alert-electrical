import {useState} from 'react'
import {useRouter} from 'next/router'
import Search from '@/svgs/Search'

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <>
      {/* Search Box - Mobile */}
      <div className="searchBoxMobile md:hidden w-full flex items-center ">
        <div className={`w-full flex bg-gray-200 px-2`}>
          <form onSubmit={handleSearch} className="w-full py-2">
            <input
              className={`transition-all w-full duration-500 ease-in-out transform px-2 py-3 placeholder-black outline-none border-2 border-transparent focus:border-primary rounded-l`}
              type="text"
              placeholder="Search our entire store"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <button
            className="bg-primary my-2 w-12 flex justify-center items-center border-primary ease-in-out transition-all rounded-r searchIcon"
            onClick={handleSearch}
          >
            <Search />
          </button>
        </div>
      </div>

      {/* Search Box - Desktop */}
      <div className="searchBox hidden md:flex items-center relative w-1/2">
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            className={` duration-500 placeholder-black w-full px-2 py-1 outline-none border-2 border-transparent focus:border-primary bg-gray-200 rounded-l`}
            type="text"
            placeholder="Search our entire store"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <button
          className="bg-primary p-2  border-primary ease-in-out transition-all rounded-r searchIcon"
          onClick={handleSearch}
        >
          <Search />
        </button>
      </div>
    </>
  )
}
