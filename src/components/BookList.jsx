import React from "react";
import BookCard from "./BookCard";

function BookList({
  books,
  readBooks,
  toggleReadStatus,
  planToReadBooks,
  togglePlanToReadStatus,
}) {
  return (
    <ul className="flex flex-wrap justify-center gap-4">
      {books.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          isMarkedRead={readBooks && readBooks.some((b) => b.key === book.key)}
          onToggleReadStatus={() => toggleReadStatus(book)}
          isPlannedToRead={
            planToReadBooks && planToReadBooks.some((b) => b.key === book.key)
          }
          onTogglePlanToReadStatus={() => togglePlanToReadStatus(book)}
        />
      ))}
    </ul>
  );
}

export default BookList;
