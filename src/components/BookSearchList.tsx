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
          key={book.id}
          book={book}
          isMarkedRead={readBooks && readBooks.some((b) => b.id === book.id)}
          isPlannedToRead={
            planToReadBooks && planToReadBooks.some((b) => b.id === book.id)
          }
        />
      ))}
    </ul>
  );
}

export default BookSearchList;
