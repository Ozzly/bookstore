import { create } from "zustand";
import type { Book } from "./types.js";

type SearchStore = {
  searchTerm: string;
  isLoading: boolean;
  books: Book[];
  setSearchTerm: (searchTerm: string) => void;
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
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
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
  toggleCompletedBook: (book: Book) => void;
};

export const useLibraryStore = create<LibraryStore>((set, get) => ({
  completedBooks: localStorage.getItem("completedBooks")
    ? JSON.parse(localStorage.getItem("completedBooks"))
    : [],
  planToReadBooks: [],

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
}));
