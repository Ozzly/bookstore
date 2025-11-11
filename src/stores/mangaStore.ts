import { create } from "zustand";
import type { Manga } from "../types.js";

type MangaStore = {
  mangaResults: Manga[];
};

export const useMangaStore = create<MangaStore>((set, get) => ({
  mangaResults: [],
}));
