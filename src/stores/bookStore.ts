import { create } from "zustand";
import type { Book } from "../types.js";

type SearchStore = {
  searchTerm: string;
  isLoading: boolean;
  books: Book[];
  searchCategory: "books" | "manga" | "anime" | "movies" | "shows";
  setSearchTerm: (searchTerm: string) => void;
  setSearchCategory: (
    category: "books" | "manga" | "anime" | "movies" | "shows"
  ) => void;
  fetchBooksQuery: () => Promise<void>;
};

const API_BASE_URL = "https://openlibrary.org";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  searchTerm: "",
  isLoading: true,
  books: [],
  searchCategory: "books",
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  setSearchCategory: (
    category: "books" | "manga" | "anime" | "movies" | "shows"
  ) => set({ searchCategory: category }),
  fetchBooksQuery: async () => {
    set({ isLoading: true });

    try {
      const endpoint = `${API_BASE_URL}/search.json?title=${encodeURIComponent(
        get().searchTerm
      )}`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      console.log(data);

      if (data.Response === "False") {
        // setErrorMessage(data.Error || "Failed to fetch movies");
        set({ books: [] });
        return;
      }

      set({ books: data.docs || [] });
    } catch (error) {
      console.log(`Error fetching book: ${error}`);
      //   setErrorMessage("Error fetching books.");
    } finally {
      set({ isLoading: false });
      console.log(`Finished fetching books`);
    }
  },
}));

type LibraryStore = {
  completedBooks: Book[];
  planToReadBooks: Book[];
  addCompletedBook: (book: Book) => void;
  removeCompletedBook: (bookKey: string) => void;
  toggleCompletedBook: (book: Book) => void;
  addPlanToRead: (book: Book) => void;
  removePlanToRead: (bookKey: string) => void;
  togglePlanToRead: (book: Book) => void;
};

export const useLibraryStore = create<LibraryStore>((set, get) => ({
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
