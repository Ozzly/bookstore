import React, { useEffect } from "react";
import { useSearchStore } from "../stores/searchUIStore.js";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router";
import { useBookStore } from "../stores/bookStore.js";
import { useAnimeStore } from "../stores/animeStore.js";
import { IoSearch } from "react-icons/io5";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder: string;
}

function Search({ searchTerm, setSearchTerm, placeholder }: SearchProps) {
  const [localSearchTerm, setLocalSearchTerm] = React.useState(searchTerm);
  const [searchDebounce] = useDebounce(localSearchTerm, 1000);

  useEffect(() => {
    setSearchTerm(searchDebounce);
  }, [searchDebounce]);

  return (
    <div className="flex items-center border-3 border-ctp-surface0 rounded-xl focus-within:border-ctp-mauve transition-colors mb-3 mt-3">
      <div className="p-2">
        <input
          type="text"
          placeholder={placeholder}
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
        <IoSearch size={20} />
      </div>
    </div>
  );
}

export default Search;
