import React from 'react'

function BookCard({ book: 
    { title, author_name, edition_count, first_publish_year, cover_i }
 }) {
  return (
    <div className='book-card'>
        
              <h3>{title}</h3>
              <p>{author_name}</p>
              <p>Editions: {edition_count}</p>
              <img src={cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : "/no-cover-image.png"} alt={title} />


             
    </div>
  )
}

export default BookCard