import { useState } from "react";
import type { Book } from "../types.js";
import { useBookStore } from "../stores/bookStore.js";
import MediaCard from "./MediaCard.js";

interface BookCardProps {
  item: Book;
}

function BookCard({ item: book }: BookCardProps) {
  const { title, author_name, edition_count, first_publish_year, cover_i } =
    book;

  return (
    <MediaCard
      coverImage={
        cover_i
          ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
          : "/no-cover-image.png"
      }
      alt={title}
    >
      <h2 className="font-bold line-clamp-2 leading-tight" title={title}>
        {title}
      </h2>
    </MediaCard>
  );
}

export default BookCard;
