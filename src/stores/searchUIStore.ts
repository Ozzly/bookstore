import { create } from "zustand";
import type { Category } from "../types.js";

type SearchStore = {
  searchTerm: string;
  searchCategory: Category;
  setSearchTerm: (searchTerm: string) => void;
  setSearchCategory: (category: Category) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  searchTerm: "",
  searchCategory: "books",
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  setSearchCategory: (category: Category) => set({ searchCategory: category }),
}));
