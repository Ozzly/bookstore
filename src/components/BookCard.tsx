import React from "react";
import { useState } from "react";
import type { Book } from "../types.js";
import { useLibraryStore } from "../stores/bookStore.js";

interface BookCardProps {
  book: Book;
  isMarkedRead: boolean;
  isPlannedToRead: boolean;
}

function BookCard({ book, isMarkedRead, isPlannedToRead }: BookCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleCompletedBook = useLibraryStore(
    (state) => state.toggleCompletedBook
  );
  const togglePlanToRead = useLibraryStore((state) => state.togglePlanToRead);
  const { title, author_name, edition_count, first_publish_year, cover_i } =
    book;

  return (
    <div className="w-[250px] min-w-[250px] h-full p-4 bg-ctp-surface0 rounded-lg border-ctp-surface1 hover:scale-102 hover:shadow-xl transition shadow-lg">
      <div className="max-h-[330px] h-[330px] relative overflow-hidden bg-[#454545] rounded-lg flex justify-center items-center shadow-lg">
        <img
          src={
            cover_i
              ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
              : "/no-cover-image.png"
          }
          alt={title}
        />
        <p
          onClick={() => console.log(edition_count)}
          className="absolute top-1 right-1 underline bg-ctp-base/85"
        >
          {edition_count} {edition_count > 1 ? "editions" : " edition"}
        </p>
      </div>
      <h3
        title={title}
        className="text-center font-bold text-ctp-text whitespace-nowrap overflow-hidden text-ellipsis mt-1"
      >
        {title}
      </h3>
      <p
        title={author_name ? author_name.join(", ") : "Unknown Author"}
        className="text-center text-ctp-subtext1 whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {author_name ? `${author_name.join(", ")}` : "Unknown Author"}
      </p>
      <div className="flex justify-around text-ctp-subtext0 text-sm">
        <p>{first_publish_year || "N/A"}</p>
        {/* <p>{language ? `[${language[0]}]` : "N/A"}</p> */}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => toggleCompletedBook(book)}
          title={isMarkedRead ? "Remove from Read" : "Mark as Read"}
          disabled={isPlannedToRead}
          className={`border-ctp-mauve border-3 rounded-l-xl border-r-2 font-bold w-2/5 mt-3 p-2 transition duration-400 
          ${
            isPlannedToRead
              ? "cursor-not-allowed border-3 border-ctp-overlay0 text-ctp-overlay0"
              : isMarkedRead
              ? "bg-ctp-mauve text-ctp-base hover:bg-ctp-mauve/80 active:scale-95"
              : "bg-ctp-surface0 text-ctp-mauve hover:text-ctp-base hover:bg-ctp-mauve/80 active:scale-95"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
        </button>
        <button
          onClick={() => togglePlanToRead(book)}
          title="Add to Plan to Read"
          disabled={isMarkedRead}
          className={`border-ctp-mauve border-3 border-x-2 font-bold w-2/5 mt-3 p-2 transition duration-400
            ${
              isMarkedRead
                ? "cursor-not-allowed border-3 border-ctp-overlay0 text-ctp-overlay0"
                : isPlannedToRead
                ? "bg-ctp-mauve hover:bg-ctp-mauve/80 text-ctp-base active:scale-95"
                : "bg-ctp-surface0 hover:bg-ctp-mauve/80 hover:text-ctp-base text-ctp-mauve active:scale-95"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="size-6 mx-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
            />
          </svg>
        </button>

        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="bg-ctp-overlay border-ctp-mauve border-3 border-l-2 rounded-r-xl font-bold w-1/5 mt-3 p-2 hover:bg-ctp-mauve/80 transition active:scale-95 text-ctp-mauve hover:text-ctp-base"
        >
          +
        </button>
      </div>
      {showDropdown && (
        <div className="bg-ctp-surface1 border border-ctp-overlay0 rounded shadow-lg z-20 min-w-[120px]">
          <ul>
            <li className="p-2 hover:bg-ctp-overlay1 cursor-pointer">
              Option 1
            </li>
            <li className="p-2 hover:bg-ctp-overlay1 cursor-pointer">
              Option 2
            </li>
            {/* Add more options as needed */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookCard;
