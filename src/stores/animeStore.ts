import { create } from "zustand";
import type { Anime, AnimeStatus } from "../types.js";
import moment from "moment";

const API_BASE_URL = "https://api.jikan.moe/v4";

type AnimeStore = {
  isLoading: boolean;
  animeResults: Anime[];
  animeWatched: Anime[];
  animeWatching: Anime[];
  animePlanned: Anime[];
  addAnimeToList: (anime: Anime, listName: AnimeStatus) => void;
  getAnimeStatus: (mal_id: number) => AnimeStatus | null;
  removeFromAllLists: (mal_id: number) => void;
  getDateAdded: (mal_id: number) => string | null;
  fetchAnimeQuery: (searchTerm: string) => Promise<void>;
};

const transformAPIData = (data: any): Anime => {
  function getSeason(month: number): string {
    if ([12, 1, 2].includes(month)) return "Winter";
    if ([3, 4, 5].includes(month)) return "Spring";
    if ([6, 7, 8].includes(month)) return "Summer";
    if ([9, 10, 11].includes(month)) return "Fall";
    return "Unknown";
  }

  const releaseSeason = `${getSeason(data.aired.prop.from.month)} ${
    data.aired.prop.from.year
  }`;

  return {
    mal_id: data.mal_id,
    title: data.title,
    score: data.score,
    cover_image: data.images.jpg.image_url,
    episodes: data.episodes,
    year: data.year,
    release_season: releaseSeason,
    studio: data.studios[0]?.name || "Unknown", // Should replace with logic to handle multiple studios
  };
};

export const useAnimeStore = create<AnimeStore>((set, get) => ({
  isLoading: false,
  animeResults: [],

  animeWatched: (() => {
    const stored = localStorage.getItem("animeWatched");
    return stored ? JSON.parse(stored) : [];
  })(),

  animeWatching: (() => {
    const stored = localStorage.getItem("animeWatching");
    return stored ? JSON.parse(stored) : [];
  })(),

  animePlanned: (() => {
    const stored = localStorage.getItem("animePlanned");
    return stored ? JSON.parse(stored) : [];
  })(),

  addAnimeToList: (anime: Anime, listName: AnimeStatus) => {
    const currentList = get()[`anime${listName}`] as Anime[];
    if (currentList.some((a) => a.mal_id === anime.mal_id)) return;
    anime.dateAdded = moment().format("ll");
    const updatedList = [...currentList, anime];
    set({ [`anime${listName}`]: updatedList });
    localStorage.setItem(`anime${listName}`, JSON.stringify(updatedList));
  },

  getAnimeStatus: (mal_id: number): AnimeStatus | null => {
    const { animeWatched, animeWatching, animePlanned } = get();

    if (animeWatched.some((anime) => anime.mal_id === mal_id)) return "Watched";
    if (animeWatching.some((anime) => anime.mal_id === mal_id))
      return "Watching";
    if (animePlanned.some((anime) => anime.mal_id === mal_id)) return "Planned";

    return null;
  },

  removeFromAllLists: (mal_id: number) => {
    // Optimise later by using getAnimeStatus first
    const { animeWatched, animeWatching, animePlanned } = get();

    const updatedWatched = animeWatched.filter(
      (anime) => anime.mal_id !== mal_id
    );
    const updatedWatching = animeWatching.filter(
      (anime) => anime.mal_id !== mal_id
    );
    const updatedPlanned = animePlanned.filter(
      (anime) => anime.mal_id !== mal_id
    );

    set({
      animeWatched: updatedWatched,
      animeWatching: updatedWatching,
      animePlanned: updatedPlanned,
    });

    localStorage.setItem("animeWatched", JSON.stringify(updatedWatched));
    localStorage.setItem("animeWatching", JSON.stringify(updatedWatching));
    localStorage.setItem("animePlanned", JSON.stringify(updatedPlanned));
  },

  getDateAdded: (mal_id: number): string | null => {
    const { animeWatched } = get();
    return (
      animeWatched.find((anime) => anime.mal_id === mal_id)?.dateAdded || null
    );
  },

  fetchAnimeQuery: async (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      set({ animeResults: [] });
      return;
    }

    set({ isLoading: true });

    try {
      const endpoint = `${API_BASE_URL}/anime?q=${encodeURIComponent(
        searchTerm
      )}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      const transformedData = data.data.map(transformAPIData);
      console.log(transformedData);
      set({ animeResults: transformedData || [] });
    } catch (error) {
      console.log(`Error fetching anime: ${error}`);
    } finally {
      set({ isLoading: false });
      console.log(`Finished fetching anime`);
    }
  },
}));
