import React, { useEffect } from "react";
import { useSearchStore } from "../stores/searchUIStore.js";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router";
import { useBookStore } from "../stores/bookStore.js";
import { useAnimeStore } from "../stores/animeStore.js";

function Search() {
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const fetchBooksQuery = useBookStore((state) => state.fetchBooksQuery);
  const navigate = useNavigate();
  const searchCategory = useSearchStore((state) => state.searchCategory);
  const fetchAnimeQuery = useAnimeStore((state) => state.fetchAnimeQuery);
  const [localSearchTerm, setLocalSearchTerm] = React.useState(searchTerm);
  const [searchDebounce] = useDebounce(localSearchTerm, 1000);
  useEffect(() => {
    setSearchTerm(searchDebounce);
    switch (searchCategory) {
      case "books":
        fetchBooksQuery(searchDebounce);
        break;
      case "anime":
        fetchAnimeQuery(searchDebounce);
        break;
    }
    searchDebounce && navigate(`/${searchCategory}`);
  }, [searchDebounce]);

  return (
    <div className="flex items-center border-3 border-ctp-surface0 rounded-xl focus-within:border-ctp-mauve transition-colors mb-3 mt-3">
      <div className="p-2">
        <input
          type="text"
          placeholder={`Searching by ${searchCategory}`}
          value={localSearchTerm}
          onChange={(event) => {
            setLocalSearchTerm(event.target.value);
          }}
          className="focus:outline-none w-3xs sm:w-sm"
        />
        <button
          onClick={() => setLocalSearchTerm("")}
          className={localSearchTerm || "hidden"}
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
