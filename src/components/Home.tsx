import React, { useEffect, useState } from "react";
import BookSearchList from "./BookSearchList.js";
import { BarLoader } from "react-spinners";
import { useBookStore } from "../stores/bookStore.js";
import { useSearchStore } from "../stores/searchUIStore.js";

const App = () => {
  const booksFromStore = useBookStore((state) => state.bookResults);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const isLoading = useBookStore((state) => state.isLoading);
  const completedBooks = useBookStore((state) => state.completedBooks);
  const plannedBooks = useBookStore((state) => state.planToReadBooks);

  return (
    <div className="flex items-center flex-col text-ctp-text">
      <main className="w-full max-w-6xl">
        {searchTerm == "" ? (
          <div className="text-center">Try searching for a book</div>
        ) : isLoading ? (
          <>
            <h2 className="text-xl font-bold text-center mb-6">
              Fetching Results for "{searchTerm}"
            </h2>
            <div className="justify-center flex">
              <BarLoader loading={true} color="#cba6f7" width="50%" />
            </div>
          </>
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
      </main>
    </div>
  );
};

export default App;
