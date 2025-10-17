import React from "react";
import BookDisplayList from "../components/BookDisplayList.js";
import { useBookStore } from "../stores/bookStore.js";
import { useSearchStore } from "../stores/searchUIStore.js";
import BookSearchList from "../components/BookSearchList.js";

function Books() {
  const completedBooks = useBookStore((state) => state.completedBooks);
  const plannedBooks = useBookStore((state) => state.planToReadBooks);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const booksFromStore = useBookStore((state) => state.bookResults);

  return (
    <>
      {searchTerm === "" ? (
        <div className="flex flex-col gap-2">
          <BookDisplayList
            books={completedBooks}
            title="Completed Books"
            isMarkedRead={true}
            isPlannedToRead={false}
          />
          <BookDisplayList
            books={plannedBooks}
            title="Planned to Read"
            isMarkedRead={false}
            isPlannedToRead={true}
          />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold text-center mb-2">
            Search Results for "{searchTerm}"
          </h2>

          <BookSearchList
            books={booksFromStore}
            readBooks={completedBooks}
            planToReadBooks={plannedBooks}
          />
        </>
      )}
    </>
  );
}

export default Books;
