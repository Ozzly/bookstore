import type { Book } from "../types.js";
import { useBookStore } from "../stores/bookStore.js";
import MediaCard from "./MediaCard.js";
import StatusWithExtraInfo from "./StatusWithExtraInfo.js";

interface BookCardProps {
  item: Book;
}

function BookCard({ item: book }: BookCardProps) {
  const { id, title, author_name, edition_count, first_publish_year, cover_i } =
    book;

  const currentStatus = useBookStore((state) => state.getBookStatus(id));

  function getButtonText(): string {
    switch (currentStatus) {
      case "completed":
        return "Read";
      case "progress":
        return "Reading";
      case "planned":
        return "Planned";
      default:
        return "Mark Watched";
    }
  }

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
      <p className="text-sm mb-1 line-clamp-2">{author_name.join(", ")}</p>

      <div className="absolute bottom-0 w-full">
        <StatusWithExtraInfo
          status={currentStatus}
          dateAdded={"temp"}
          count={0}
          maxCount={10}
          buttonText={getButtonText()}
          onStatusChange={() => console.log("statusChanged")}
          onCountChange={() => console.log("countChanged")}
        />
      </div>
    </MediaCard>
  );
}

export default BookCard;
