import React, { useEffect } from "react";
import { useSearchStore } from "../store.js";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router";

function Search() {
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const fetchBooksQuery = useSearchStore((state) => state.fetchBooksQuery);
  const navigate = useNavigate();

  const [searchDebounce] = useDebounce(searchTerm, 1000);
  useEffect(() => {
    fetchBooksQuery();
    navigate("/");
  }, [searchDebounce]);

  return (
    <div className="flex items-center border-3 border-ctp-surface0 rounded-xl focus-within:border-ctp-mauve transition-colors mb-3 mt-3">
      <div className="p-2">
        <input
          type="text"
          placeholder="Search for your book"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          className="focus:outline-none w-3xs sm:w-sm"
        />
        <button
          onClick={() => setSearchTerm("")}
          className={searchTerm || "hidden"}
        >
          ✕
        </button>
      </div>
      <div className="flex items-center justify-center bg-ctp-surface0 h-full w-10 rounded-r-[9px] active:bg-ctp-surface1 transition-colors duration-600">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </div>
    </div>
  );
}

export default Search;
