import { create } from "zustand";
import type { Book, GenericStatus } from "../types.js";

const API_BASE_URL = "https://openlibrary.org";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const transformAPIData = (data: any): Book => {
  return {
    id: data.key,
    title: data.title,
    cover_i: data.cover_i,
    first_publish_year: data.first_publish_year,
    author_name: data.author_name || [],
    edition_count: data.edition_count,
  };
};

type BookStore = {
  isLoading: boolean;
  bookResults: Book[];
  fetchBooksQuery: (searchTerm: string) => Promise<void>;
  completedBooks: Book[];
  planToReadBooks: Book[];
  booksProgress: Book[];
  getBookStatus: (id: string) => GenericStatus | null;
};

export const useBookStore = create<BookStore>((set, get) => ({
  isLoading: true,
  bookResults: [],

  completedBooks: (() => {
    const stored = localStorage.getItem("books_completed");
    return stored ? JSON.parse(stored) : [];
  })(),
  booksProgress: (() => {
    const stored = localStorage.getItem("books_progress");
    return stored ? JSON.parse(stored) : [];
  })(),
  planToReadBooks: (() => {
    const stored = localStorage.getItem("books_planned");
    return stored ? JSON.parse(stored) : [];
  })(),

  getBookStatus: (id: string): GenericStatus | null => {
    const { completedBooks, planToReadBooks, booksProgress } = get();

    if (completedBooks.some((book) => book.id === id)) return "completed";
    if (booksProgress.some((book) => book.id === id)) return "progress";
    if (planToReadBooks.some((book) => book.id === id)) return "planned";

    return null;
  },

  fetchBooksQuery: async (searchTerm) => {
    set({ isLoading: true });

    try {
      const endpoint = `${API_BASE_URL}/search.json?title=${encodeURIComponent(
        searchTerm
      )}`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      const transformedData = data.docs.map(transformAPIData);

      if (data.Response === "False") {
        // setErrorMessage(data.Error || "Failed to fetch movies");
        set({ bookResults: [] });
        return;
      }

      set({ bookResults: transformedData || [] });
    } catch (error) {
      console.log(`Error fetching book: ${error}`);
      //   setErrorMessage("Error fetching books.");
    } finally {
      set({ isLoading: false });
      console.log(`Finished fetching books`);
    }
  },
}));
