import React from "react";
import BookCard from "./BookCard.js";
import type { Book } from "../types.js";

interface BookListProps {
  books: Book[];
  readBooks: Book[];
  planToReadBooks: Book[];
}

function BookSearchList({ books, readBooks, planToReadBooks }: BookListProps) {
  return (
    <ul className="flex flex-wrap justify-center gap-4">
      {books.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          isMarkedRead={readBooks && readBooks.some((b) => b.key === book.key)}
          isPlannedToRead={
            planToReadBooks && planToReadBooks.some((b) => b.key === book.key)
          }
        />
      ))}
    </ul>
  );
}

export default BookSearchList;
