import { create } from "zustand";
import type { GenericStatus, Manga } from "../types.js";
import moment from "moment";

type MangaStore = {
  mangaResults: Manga[];
  mangaCompleted: Manga[];
  mangaProgress: Manga[];
  mangaPlanned: Manga[];
  addMangaToList: (item: Manga, status: GenericStatus) => void;
};

export const useMangaStore = create<MangaStore>((set, get) => ({
  mangaResults: [],

  mangaCompleted: (() => {
    const stored = localStorage.getItem("manga_completed");
    return stored ? JSON.parse(stored) : [];
  })(),

  mangaProgress: (() => {
    const stored = localStorage.getItem("manga_progress");
    return stored ? JSON.parse(stored) : [];
  })(),

  mangaPlanned: (() => {
    const stored = localStorage.getItem("manga_planned");
    return stored ? JSON.parse(stored) : [];
  })(),

  addMangaToList: (manga: Manga, status: GenericStatus) => {
    let currentList: Manga[];
    let storageKey: string;

    switch (status) {
      case "completed":
        currentList = get().mangaCompleted;
        storageKey = "manga_completed";
        break;
      case "progress":
        currentList = get().mangaProgress;
        storageKey = "manga_progress";
        break;
      case "planned":
        currentList = get().mangaPlanned;
        storageKey = "manga_planned";
        break;
      default:
        return;
    }

    if (currentList.some((m) => m.id === manga.id)) return;
    manga.dateAdded = moment().format("ll");
    status === "progress" && (manga.currentChapter = 1);
    const updatedList = [...currentList, manga];

    switch (status) {
      case "completed":
        set({ mangaCompleted: updatedList });
        break;
      case "progress":
        set({ mangaProgress: updatedList });
        break;
      case "planned":
        set({ mangaPlanned: updatedList });
        break;
    }
    localStorage.setItem(storageKey, JSON.stringify(updatedList));
  },
}));
