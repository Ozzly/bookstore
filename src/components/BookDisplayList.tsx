import React from "react";
import BookCard from "./BookCard.js";
import { useLibraryStore } from "../stores/bookStore.js";

function BookDisplayList() {
  const completedBooks = useLibraryStore((state) => state.completedBooks);
  const plannedBooks = useLibraryStore((state) => state.planToReadBooks);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl flex flex-col px-16 gap-4">
        <div className="border-2 border-ctp-surface1 rounded-lg p-2 items-center flex flex-col w-full">
          <div className="bold text-xl text-ctp-text">Completed Books</div>
          <div className="flex overflow-y-scroll gap-4 w-full py-2">
            {completedBooks.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                isMarkedRead={true}
                isPlannedToRead={false}
              />
            ))}
          </div>
        </div>
        <div className="border-2 border-ctp-surface1 rounded-lg p-2 items-center flex flex-col w-full">
          <div className="bold text-xl text-ctp-text">Planned to Read</div>
          <div className="flex overflow-y-scroll gap-4 w-full py-2">
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
      </div>
    </div>
  );
}

export default BookDisplayList;
