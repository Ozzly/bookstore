import { create } from "zustand";
import type { Anime } from "../types.js";

const API_BASE_URL = "https://api.jikan.moe/v4";

type AnimeStore = {
  isLoading: boolean;
  animeResults: Anime[];
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

export const useAnimeStore = create<AnimeStore>((set) => ({
  isLoading: false,
  animeResults: [],

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
