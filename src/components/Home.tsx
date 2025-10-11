import React, { useEffect, useState } from "react";
import BookSearchList from "./BookSearchList.js";
import { BarLoader } from "react-spinners";
import { useSearchStore, useLibraryStore } from "../store.js";

const App = () => {
  const booksFromStore = useSearchStore((state) => state.books);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const isLoading = useSearchStore((state) => state.isLoading);
  const completedBooks = useLibraryStore((state) => state.completedBooks);
  const plannedBooks = useLibraryStore((state) => state.planToReadBooks);

  return (
    <div className="flex items-center flex-col text-ctp-text">
      {/* <Search /> */}
      <main className="w-full max-w-6xl">
        {isLoading ? (
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
