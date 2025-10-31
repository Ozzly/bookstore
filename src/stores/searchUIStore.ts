import { create } from "zustand";
import type { Category } from "../types.js";

type SearchStore = {
  searchTerm: string;
  searchCategory: Category;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setSearchTerm: (searchTerm: string) => void;
  setSearchCategory: (category: Category) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  searchTerm: "",
  searchCategory: "books",
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setSearchTerm: (searchTerm: string) => set({ searchTerm: searchTerm }),
  setSearchCategory: (category: Category) => set({ searchCategory: category }),
}));
