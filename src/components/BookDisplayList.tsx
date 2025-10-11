import React from "react";
import BookCard from "./BookCard.js";
import { useLibraryStore } from "../store.js";

function BookDisplayList() {
  const completedBooks = useLibraryStore((state) => state.completedBooks);
  const plannedBooks = useLibraryStore((state) => state.planToReadBooks);

  return (
    <div>
      <div className="flex gap-4 border-2 border-ctp-surface1">
        {completedBooks.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            isMarkedRead={true}
            isPlannedToRead={false}
          />
        ))}
      </div>
      <div className="flex gap-4 border-2 border-ctp-surface1">
        {plannedBooks.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            isMarkedRead={false}
            isPlannedToRead={true}
          />
        ))}
      </div>
    </div>
  );
}

export default BookDisplayList;
