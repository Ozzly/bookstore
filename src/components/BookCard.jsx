import React from 'react'

function BookCard({ book: 
    { title, author_name, edition_count, first_publish_year, cover_i }
 }) {
  return (
    <div className='book-card'>

        
        <h3>{title}</h3>
        <p>{author_name}</p>
        <div className='book-card-image-container'>
            <img src={cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : "/no-cover-image.png"} alt={title} />
            <p className='book-card-overlay'>{edition_count} {edition_count>1 ? "editions" : " edition"}</p>
        </div>


             
    </div>
  )
}

export default BookCard