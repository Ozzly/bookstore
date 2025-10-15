import React from "react";
import BookCard from "./BookCard.js";
import { useBookStore } from "../stores/bookStore.js";
import type { Book } from "../types.js";

interface BookDisplayListProps {
  books: Book[];
  title: string;
  isMarkedRead: boolean; // Should add an array of groups/categories this book belong to later, letting this be removed
  isPlannedToRead: boolean;
}

function BookDisplayList({
  books,
  title,
  isMarkedRead,
  isPlannedToRead,
}: BookDisplayListProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl flex flex-col px-16 gap-4">
        <div className="border-2 border-ctp-surface1 rounded-lg p-2 items-center flex flex-col w-full">
          <div className="bold text-xl text-ctp-text">{title}</div>
          <div className="flex overflow-y-scroll gap-4 w-full py-2">
            {books.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                isMarkedRead={isMarkedRead}
                isPlannedToRead={isPlannedToRead}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDisplayList;
