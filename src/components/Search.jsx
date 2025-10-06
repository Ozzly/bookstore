import React from 'react'

function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className='flex justify-center w-full'>
    <div className='search-container'>
      <div className='search-box'>
        <input 
            type='text'
            placeholder='Search for your book'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className='search-input'
        />
        <div className='clear-button-container'>
            <button onClick={() => setSearchTerm('')} className={searchTerm || "hidden"}>✕</button>

        </div>
        </div>
        <div className='search-icon flex items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search text-icon-neutral"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        </div>
    </div>
    </div>
  )
}

export default Search