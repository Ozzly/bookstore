import React from "react";
import { useSearchStore } from "../store.js";

function Search() {
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const fetchBooksQuery = useSearchStore((state) => state.fetchBooksQuery);
  return (
    <div className="w-full border-b-1 border-ctp-surface0 sticky top-0 bg-ctp-base z-10 mb-3">
      <div className="flex justify-center w-full">
        <div className="flex items-center border-3 border-ctp-surface0 rounded-xl focus-within:border-ctp-mauve transition-colors mb-3 mt-3">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search for your book"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                fetchBooksQuery();
              }}
              className="focus:outline-none w-md"
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
      </div>
    </div>
  );
}

export default Search;
