import React, { useEffect, useState } from "react";
import Search from "./Search.js";
import BookList from "./BookList.js";
import { useDebounce } from "use-debounce";
import { BarLoader } from "react-spinners";
import type { Book } from "../types.js";

const API_BASE_URL = "https://openlibrary.org";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const [readBooks, setReadBooks] = useState(() => {
    const stored = localStorage.getItem("readBooks");
    return stored ? JSON.parse(stored) : [];
  });
  const [planToReadBooks, setPlanToReadBooks] = useState(() => {
    const stored = localStorage.getItem("planToReadBooks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    debouncedSearchTerm !== "" && fetchBooksQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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

  const fetchBooksQuery = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${API_BASE_URL}/search.json?title=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      console.log(data);

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setBooks([]);
        return;
      }

      setBooks(data.docs || []);
    } catch (error) {
      console.log(`Error fetching book: ${error}`);
      setErrorMessage("Error fetching books.");
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="flex items-center flex-col text-ctp-text">
      <div className="w-full border-b-2 border-ctp-overlay0 sticky top-0 bg-ctp-base z-10 mb-3">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <main className="w-full max-w-6xl">
        {debouncedSearchTerm == "" ? (
          <>
            <h2 className="text-xl font-bold text-center mb-2">
              Finished Books
            </h2>
            <BookList
              books={readBooks}
              readBooks={readBooks}
              toggleReadStatus={toggleReadStatus}
              planToReadBooks={planToReadBooks}
              togglePlanToReadStatus={togglePlanToReadStatus}
            />

            <h2 className="text-xl font-bold text-center mb-2">
              Plan to Read Books
            </h2>
            <BookList
              books={planToReadBooks}
              readBooks={readBooks}
              toggleReadStatus={toggleReadStatus}
              planToReadBooks={planToReadBooks}
              togglePlanToReadStatus={togglePlanToReadStatus}
            />
          </>
        ) : isLoading ? (
          <>
            <h2 className="text-xl font-bold text-center mb-6">
              Fetching Results for "{debouncedSearchTerm}"
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
              Search Results for "{debouncedSearchTerm}"
            </h2>

            <BookList
              books={books}
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
