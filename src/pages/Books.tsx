import React from "react";
import BookDisplayList from "../components/BookDisplayList.js";
import { useBookStore } from "../stores/bookStore.js";

function Books() {
  const completedBooks = useBookStore((state) => state.completedBooks);
  const plannedBooks = useBookStore((state) => state.planToReadBooks);

  return (
    <div className="flex flex-col gap-2">
      <BookDisplayList
        books={completedBooks}
        title="Completed Books"
        isMarkedRead={true}
        isPlannedToRead={false}
      />
      <BookDisplayList
        books={plannedBooks}
        title="Planned to Read"
        isMarkedRead={false}
        isPlannedToRead={true}
      />
    </div>
  );
}

export default Books;
