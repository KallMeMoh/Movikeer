import React from 'react'

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className='search'>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input
          placeholder="Search"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        />
      </div>
    </div>
  )
}

export default SearchBar