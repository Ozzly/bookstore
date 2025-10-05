import React from 'react'

function BookCard({ book: 
    { title, author_name, edition_count, first_publish_year, cover_i }
    , isMarkedRead, onToggleReadStatus
 }) {
  return (
    <div className='book-card'>
        <div className='book-card-image-container'>
            <img src={cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : "/no-cover-image.png"} alt={title} />
            <p onClick={() => console.log(edition_count)} className='book-card-overlay'>
              {edition_count} {edition_count>1 ? "editions" : " edition"}
            </p>
        </div>
        <h3 title={title} className='book-title'>{title}</h3>
        <p title={author_name} className='book-author'>{author_name ? `By ${author_name}` : 'Unknown Author'}</p>
        <p className='book-year'>{first_publish_year || 'N/A'}</p>
        <div className='button-group'>
        <button onClick={onToggleReadStatus} className='mark-as-read-button'>{isMarkedRead ? "Unmark" : "Mark as Read"}</button>
        <button className='dropdown-button'>⌄</button>

        </div>
    </div>
  )
}

export default BookCard