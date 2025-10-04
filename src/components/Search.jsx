import React from 'react'

function Search({ searchTerm, setSearchTerm }) {
  return (
    <div>
        <input 
            type='text'
            placeholder='Search for your book'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className='search-input'
        />
    </div>
  )
}

export default Search