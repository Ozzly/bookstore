import React from "react";

function BookCard({
  book: {
    title,
    author_name,
    edition_count,
    first_publish_year,
    cover_i,
    language,
  },
  isMarkedRead,
  onToggleReadStatus,
}) {
  return (
    <div className="w-[250px] min-w-[250px] h-full p-4 bg-ctp-surface0 rounded-lg border-3 border-ctp-overlay0 hover:border-ctp-mauve transition shadow-lg">
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
        title={author_name}
        className="text-center text-ctp-subtext1 whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {author_name ? `By ${author_name.join(", ")}` : "Unknown Author"}
      </p>
      <div className="flex justify-around text-ctp-subtext0 text-sm">
        <p>{first_publish_year || "N/A"}</p>
        <p>{language ? `[${language[0]}]` : "N/A"}</p>
      </div>

      <div className="flex justify-center gap-0.5">
        <button
          onClick={onToggleReadStatus}
          className="bg-ctp-mauve text-ctp-base rounded-l-xl font-bold w-4/5 mt-3 p-2 hover:bg-ctp-mauve/80 transition active:scale-95"
        >
          {isMarkedRead ? "Unmark" : "Mark as Read"}
        </button>
        <button
          onClick={() => console.log(title)}
          className="bg-ctp-mauve text-ctp-base rounded-r-xl font-bold w-1/5 mt-3 p-2 hover:bg-ctp-mauve/80 transition active:scale-95 justify-center flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="m6 10l6 6l6-6"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default BookCard;
