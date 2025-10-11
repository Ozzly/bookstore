import React from "react";
import BookCard from "./BookCard.js";
import type { Book } from "../types.js";

interface BookListProps {
  books: Book[];
  readBooks: Book[];
  toggleReadStatus: (book: Book) => void;
  planToReadBooks: Book[];
  togglePlanToReadStatus: (book: Book) => void;
}

function BookSearchList({
  books,
  readBooks,
  toggleReadStatus,
  planToReadBooks,
  togglePlanToReadStatus,
}: BookListProps) {
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

export default BookSearchList;
