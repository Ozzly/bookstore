import { create } from "zustand";
import type { Book, Category } from "../types.js";

const API_BASE_URL = "https://openlibrary.org";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

type BookStore = {
  isLoading: boolean;
  bookResults: Book[];
  fetchBooksQuery: (searchTerm: string) => Promise<void>;
  completedBooks: Book[];
  planToReadBooks: Book[];
  addCompletedBook: (book: Book) => void;
  removeCompletedBook: (bookKey: string) => void;
  toggleCompletedBook: (book: Book) => void;
  addPlanToRead: (book: Book) => void;
  removePlanToRead: (bookKey: string) => void;
  togglePlanToRead: (book: Book) => void;
};

export const useBookStore = create<BookStore>((set, get) => ({
  isLoading: true,
  bookResults: [],
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
      console.log(data);

      if (data.Response === "False") {
        // setErrorMessage(data.Error || "Failed to fetch movies");
        set({ bookResults: [] });
        return;
      }

      set({ bookResults: data.docs || [] });
    } catch (error) {
      console.log(`Error fetching book: ${error}`);
      //   setErrorMessage("Error fetching books.");
    } finally {
      set({ isLoading: false });
      console.log(`Finished fetching books`);
    }
  },

  completedBooks: (() => {
    const stored = localStorage.getItem("completedBooks");
    return stored ? JSON.parse(stored) : [];
  })(),
  planToReadBooks: (() => {
    const stored = localStorage.getItem("planToReadBooks");
    return stored ? JSON.parse(stored) : [];
  })(),

  addCompletedBook: (book: Book) => {
    const { completedBooks } = get();
    const updatedBooks = [...completedBooks, book];
    set({ completedBooks: updatedBooks });
    localStorage.setItem("completedBooks", JSON.stringify(updatedBooks));
  },

  removeCompletedBook: (bookKey: string) => {
    const { completedBooks } = get();
    const updatedBooks = completedBooks.filter((b) => b.key !== bookKey);
    set({ completedBooks: updatedBooks });
    localStorage.setItem("completedBooks", JSON.stringify(updatedBooks));
  },

  toggleCompletedBook: (book: Book) => {
    const { completedBooks, addCompletedBook, removeCompletedBook } = get();
    const exists = completedBooks.some((b) => b.key === book.key);

    if (exists) {
      removeCompletedBook(book.key);
    } else {
      addCompletedBook(book);
    }
  },

  addPlanToRead: (book: Book) => {
    const { planToReadBooks } = get();
    const updatedBooks = [...planToReadBooks, book];
    set({ planToReadBooks: updatedBooks });
    localStorage.setItem("planToReadBooks", JSON.stringify(updatedBooks));
  },

  removePlanToRead: (bookKey: string) => {
    const { planToReadBooks } = get();
    const updatedBooks = planToReadBooks.filter((b) => b.key !== bookKey);
    set({ planToReadBooks: updatedBooks });
    localStorage.setItem("planToReadBooks", JSON.stringify(updatedBooks));
  },

  togglePlanToRead: (book: Book) => {
    const { planToReadBooks, addPlanToRead, removePlanToRead } = get();
    const exists = planToReadBooks.some((b) => b.key === book.key);

    if (exists) {
      removePlanToRead(book.key);
    } else {
      addPlanToRead(book);
    }
  },
}));
