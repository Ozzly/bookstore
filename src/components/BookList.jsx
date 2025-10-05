import React from 'react'
import BookCard from './BookCard';


function BookList({books, readBooks, toggleReadStatus}) {
  return (
    <ul className='book-list'>
          {books.map((book) => (
            <BookCard 
            key={book.key} 
            book={book}
            isMarkedRead={readBooks.includes(book.key)}
            onToggleReadStatus={() => toggleReadStatus(book.key)}
            />
            
          ))}
    </ul>
  )
}

export default BookList