import React, { useEffect, useState } from "react";
import Search from "./Search.js";
import BookSearchList from "./BookSearchList.js";
import { useDebounce } from "use-debounce";
import { BarLoader } from "react-spinners";
import type { Book } from "../types.js";
import { useSearchStore } from "../store.js";

const API_BASE_URL = "https://openlibrary.org";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [books, setBooks] = useState([]);
  // const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const [readBooks, setReadBooks] = useState(() => {
    const stored = localStorage.getItem("readBooks");
    return stored ? JSON.parse(stored) : [];
  });
  const [planToReadBooks, setPlanToReadBooks] = useState(() => {
    const stored = localStorage.getItem("planToReadBooks");
    return stored ? JSON.parse(stored) : [];
  });

  // useEffect(() => {
  //   debouncedSearchTerm !== "" && fetchBooksQuery(debouncedSearchTerm);
  // }, [debouncedSearchTerm]);

  useEffect(() => {
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
  }, [readBooks]);

  useEffect(() => {
    localStorage.setItem("planToReadBooks", JSON.stringify(planToReadBooks));
  }, [planToReadBooks]);

  // useEffect(() => {
  //   readBooks.length === 0 ? setReadBooksDetails([]) : fetchWorksByKeys(readBooks);
  // }, [readBooks, debouncedSearchTerm]);

  // const fetchWorksByKeys = async (keys) => {
  //   const details = await Promise.all(
  //     keys.map (async (key) => {
  //       const response = await fetch(`${API_BASE_URL}${key}.json`, API_OPTIONS);
  //       if (!response.ok) return null;
  //       return await response.json();
  //     })
  //   );
  //   setReadBooksDetails(details);
  //   console.log(details);
  // }

  const toggleReadStatus = (book: Book) => {
    setReadBooks((prevReadBooks: [Book]) => {
      const exists = prevReadBooks.some((b) => b.key === book.key);

      if (exists) {
        return prevReadBooks.filter((b) => b.key !== book.key);
      } else {
        return [
          ...prevReadBooks,
          {
            key: book.key,
            title: book.title,
            author_name: book.author_name,
            cover_i: book.cover_i,
            edition_count: book.edition_count,
            first_publish_year: book.first_publish_year,
          },
        ];
      }
    });
  };

  const togglePlanToReadStatus = (book: Book) => {
    setPlanToReadBooks((prevPlanToReadBooks: [Book]) => {
      const exists = prevPlanToReadBooks.some((b) => b.key === book.key);

      if (exists) {
        return prevPlanToReadBooks.filter((b) => b.key !== book.key);
      } else {
        return [
          ...prevPlanToReadBooks,
          {
            key: book.key,
            title: book.title,
            author_name: book.author_name,
            cover_i: book.cover_i,
            edition_count: book.edition_count,
            first_publish_year: book.first_publish_year,
          },
        ];
      }
    });
  };

  const booksFromStore = useSearchStore((state) => state.books);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const isLoading = useSearchStore((state) => state.isLoading);

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
        ) : errorMessage ? (
          <p className="text-ctp-red">{errorMessage}</p>
        ) : (
          <>
            <h2 className="text-xl font-bold text-center mb-2">
              Search Results for "{searchTerm}"
            </h2>

            <BookSearchList
              books={booksFromStore}
              readBooks={readBooks}
              toggleReadStatus={toggleReadStatus}
              planToReadBooks={planToReadBooks}
              togglePlanToReadStatus={togglePlanToReadStatus}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
